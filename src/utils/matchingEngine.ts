import { Property, MatchingWeights } from '../types';

export interface RequirementPayload {
  purpose: 'buy' | 'rent';
  locations: string[];
  budgetMin?: number;
  budgetMax: number; // in Crores or Lakhs
  propertyType?: string;
  bhk?: number[];
  preferredAreaMin?: number;
  timeline?: string;
  preferences?: string[];
}

export interface MatchResult {
  property: Property;
  score: number; // 0 to 100
  criteriaBreakdown: {
    label: string;
    matched: boolean;
    weightPoints: number;
    earnedPoints: number;
  }[];
}

export const DEFAULT_WEIGHTS: MatchingWeights = {
  location: 30,
  budget: 25,
  propertyType: 15,
  bedrooms: 10,
  area: 10,
  amenities: 5,
  otherPreferences: 5,
};

export function calculatePropertyMatch(
  property: Property,
  req: RequirementPayload,
  weights: MatchingWeights = DEFAULT_WEIGHTS
): MatchResult {
  // Purpose must match first
  if (req.purpose && property.purpose !== req.purpose) {
    return {
      property,
      score: 0,
      criteriaBreakdown: [
        { label: 'Purpose (Buy/Rent)', matched: false, weightPoints: 30, earnedPoints: 0 },
      ],
    };
  }

  const breakdown: MatchResult['criteriaBreakdown'] = [];
  let totalScore = 0;

  // 1. Location Match (30%)
  const locWeight = weights.location;
  let locMatched = false;
  if (!req.locations || req.locations.length === 0) {
    locMatched = true;
    totalScore += locWeight;
    breakdown.push({ label: 'Location Match', matched: true, weightPoints: locWeight, earnedPoints: locWeight });
  } else {
    const propertyLocString = `${property.location} ${property.subLocation}`.toLowerCase();
    const hasMatch = req.locations.some(l => propertyLocString.includes(l.toLowerCase()));
    if (hasMatch) {
      locMatched = true;
      totalScore += locWeight;
      breakdown.push({ label: 'Location Match', matched: true, weightPoints: locWeight, earnedPoints: locWeight });
    } else {
      breakdown.push({ label: 'Location Match', matched: false, weightPoints: locWeight, earnedPoints: 0 });
    }
  }

  // 2. Budget Match (25%)
  const budWeight = weights.budget;
  let budgetScore = 0;
  if (!req.budgetMax || req.budgetMax <= 0) {
    budgetScore = budWeight;
    breakdown.push({ label: 'Budget Match', matched: true, weightPoints: budWeight, earnedPoints: budWeight });
  } else {
    // If property price <= budgetMax
    if (property.priceValue <= req.budgetMax) {
      budgetScore = budWeight;
      breakdown.push({ label: 'Budget Match', matched: true, weightPoints: budWeight, earnedPoints: budWeight });
    } else if (property.priceValue <= req.budgetMax * 1.15) {
      // within 15% tolerance
      budgetScore = Math.round(budWeight * 0.6);
      breakdown.push({ label: 'Budget (Within 15%)', matched: true, weightPoints: budWeight, earnedPoints: budgetScore });
    } else {
      breakdown.push({ label: 'Budget Match', matched: false, weightPoints: budWeight, earnedPoints: 0 });
    }
  }
  totalScore += budgetScore;

  // 3. Property Type (15%)
  const typeWeight = weights.propertyType;
  if (!req.propertyType || req.propertyType === 'All' || property.propertyType.toLowerCase() === req.propertyType.toLowerCase()) {
    totalScore += typeWeight;
    breakdown.push({ label: 'Property Type', matched: true, weightPoints: typeWeight, earnedPoints: typeWeight });
  } else {
    breakdown.push({ label: 'Property Type', matched: false, weightPoints: typeWeight, earnedPoints: 0 });
  }

  // 4. Bedrooms / BHK (10%)
  const bhkWeight = weights.bedrooms;
  if (!req.bhk || req.bhk.length === 0 || req.bhk.includes(property.bhk)) {
    totalScore += bhkWeight;
    breakdown.push({ label: 'BHK Match', matched: true, weightPoints: bhkWeight, earnedPoints: bhkWeight });
  } else if (req.bhk.some(b => Math.abs(b - property.bhk) === 1)) {
    const partial = Math.round(bhkWeight * 0.5);
    totalScore += partial;
    breakdown.push({ label: 'BHK (+/- 1 Room)', matched: true, weightPoints: bhkWeight, earnedPoints: partial });
  } else {
    breakdown.push({ label: 'BHK Match', matched: false, weightPoints: bhkWeight, earnedPoints: 0 });
  }

  // 5. Carpet Area (10%)
  const areaWeight = weights.area;
  if (!req.preferredAreaMin || property.carpetArea >= req.preferredAreaMin * 0.85) {
    totalScore += areaWeight;
    breakdown.push({ label: 'Area Match', matched: true, weightPoints: areaWeight, earnedPoints: areaWeight });
  } else {
    breakdown.push({ label: 'Area Match', matched: false, weightPoints: areaWeight, earnedPoints: 0 });
  }

  // 6. Amenities (5%)
  const amenWeight = weights.amenities;
  let matchedAmenCount = 0;
  const userPrefs = req.preferences || [];
  if (userPrefs.length === 0) {
    totalScore += amenWeight;
    breakdown.push({ label: 'Amenities Match', matched: true, weightPoints: amenWeight, earnedPoints: amenWeight });
  } else {
    userPrefs.forEach(pref => {
      if (property.amenities.some(a => a.toLowerCase().includes(pref.toLowerCase()))) {
        matchedAmenCount++;
      }
    });
    const amenRatio = Math.min(1, matchedAmenCount / Math.max(1, userPrefs.length));
    const earnedAmen = Math.round(amenWeight * amenRatio);
    totalScore += earnedAmen;
    breakdown.push({
      label: 'Amenities Match',
      matched: amenRatio > 0.4,
      weightPoints: amenWeight,
      earnedPoints: earnedAmen,
    });
  }

  // 7. Other Preferences / Possession timeline (5%)
  const otherWeight = weights.otherPreferences;
  let timelineMatch = true;
  if (req.timeline === 'Immediately' && property.status !== 'Ready to Move') {
    timelineMatch = false;
  }
  const earnedOther = timelineMatch ? otherWeight : 0;
  totalScore += earnedOther;
  breakdown.push({
    label: 'Possession / Timeline',
    matched: timelineMatch,
    weightPoints: otherWeight,
    earnedPoints: earnedOther,
  });

  const finalScore = Math.min(99, Math.max(40, totalScore));

  return {
    property,
    score: finalScore,
    criteriaBreakdown: breakdown,
  };
}

export function rankPropertiesByMatch(
  properties: Property[],
  req: RequirementPayload,
  weights: MatchingWeights = DEFAULT_WEIGHTS
): MatchResult[] {
  return properties
    .filter(p => !p.recentlySold && (p.purpose === req.purpose))
    .map(p => calculatePropertyMatch(p, req, weights))
    .sort((a, b) => b.score - a.score);
}
