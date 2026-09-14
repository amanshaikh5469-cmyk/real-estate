import React from 'react';
import { useEstate } from '../context/EstateContext';
import { X, Check, Scale, Calendar, Eye, Trash2 } from 'lucide-react';

interface PropertyComparisonModalProps {
  onClose: () => void;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({ onClose }) => {
  const {
    comparisonPropertyIds,
    toggleComparison,
    clearComparison,
    properties,
    setSelectedProperty,
    openVisitModal,
  } = useEstate();

  const comparedProperties = properties.filter((p) =>
    comparisonPropertyIds.includes(p.id)
  );

  if (comparedProperties.length === 0) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-[#ebe3d5]"
        >
          <Scale className="w-12 h-12 text-[#8a6b2d] mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold text-[#1a1c20]">
            No Properties in Comparison
          </h3>
          <p className="text-xs text-[#717680] mt-1 mb-6">
            Click the comparison icon on any property card or detail view to compare up to 4 residences side-by-side.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1a1c20] text-white text-xs font-semibold rounded-xl"
          >
            Explore Properties
          </button>
        </div>
      </div>
    );
  }

  const comparisonRows = [
    { label: 'Price', key: 'priceDisplay', highlight: true },
    {
      label: 'Price per sq.ft',
      render: (p: any) =>
        p.pricePerSqFt ||
        (p.carpetArea
          ? `₹${Math.round((p.priceValue * (p.purpose === 'buy' ? 10000000 : 100000)) / p.carpetArea).toLocaleString('en-IN')}/sq.ft`
          : 'Price on Request'),
      highlight: true,
    },
    { label: 'Location', render: (p: any) => p.subLocation || p.location },
    { label: 'Enclave', key: 'location' },
    { label: 'Configuration', render: (p: any) => `${p.bhk} BHK Luxury` },
    { label: 'Carpet Area', render: (p: any) => `${p.carpetArea} sq.ft` },
    { label: 'Super Built-Up', render: (p: any) => `${p.builtUpArea || Math.round(p.carpetArea * 1.25)} sq.ft` },
    { label: 'Floor Level', render: (p: any) => `${p.floor} of ${p.totalFloors}` },
    { label: 'Facing / Vastu', render: (p: any) => p.facing || 'East-West Breeze' },
    { label: 'Covered Parking', render: (p: any) => `${p.parking || 1} Covered Pods` },
    { label: 'Possession Date', key: 'possessionDate', highlight: true },
    { label: 'Monthly Maintenance', render: (p: any) => p.maintenancePerMonth || '₹12,000' },
    { label: 'Furnishing Status', render: (p: any) => p.furnishing || p.furnishingStatus || 'Semi-Furnished' },
    { label: 'RERA Registration', render: (p: any) => p.reraId || 'MahaRERA Verified' },
  ];

  return (
    <div
      id="comparison-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="comparison-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-6xl w-full my-6 border border-[#ebe3d5] shadow-2xl overflow-hidden relative"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ebe3d5] flex items-center justify-between bg-[#faf9f5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#c5a059]/20 text-[#8a6b2d] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1a1c20]">
                Side-by-Side Property Comparison ({comparedProperties.length} of 4)
              </h3>
              <p className="text-xs text-[#717680]">
                Differences are highlighted to assist investment decision-making.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearComparison}
              className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1a1c20] text-white hover:bg-[#2c3038] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#ebe3d5]">
                <th className="p-3 font-bold text-[#717680] uppercase tracking-wider w-44">
                  Feature / Metric
                </th>
                {comparedProperties.map((p) => (
                  <th key={p.id} className="p-3 w-64 align-top">
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-2 bg-[#ebe3d5]">
                      <img src={p.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'} alt={p.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleComparison(p.id)}
                        className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black text-white rounded-full"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-display text-sm font-bold text-[#1a1c20] line-clamp-1">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-[#717680]">{p.location}</p>
                    <div className="mt-2 flex gap-1.5">
                      <button
                        onClick={() => {
                          onClose();
                          setSelectedProperty(p);
                        }}
                        className="flex-1 py-1.5 text-[11px] font-semibold bg-[#f5efe6] hover:bg-[#ebe3d5] rounded-lg flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Details
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          openVisitModal(p);
                        }}
                        className="flex-1 py-1.5 text-[11px] font-semibold bg-[#1a1c20] text-white rounded-lg flex items-center justify-center gap-1"
                      >
                        <Calendar className="w-3 h-3 text-[#c5a059]" />
                        Visit
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => {
                // Check if all values are identical or differ
                const values = comparedProperties.map((p) =>
                  row.render ? row.render(p) : (p as any)[row.key || '']
                );
                const isDifferent = new Set(values).size > 1;

                return (
                  <tr
                    key={row.label}
                    className={`border-b border-[#f5efe6] ${
                      idx % 2 === 0 ? 'bg-[#faf9f5]' : 'bg-white'
                    } ${isDifferent && row.highlight ? 'bg-amber-50/50' : ''}`}
                  >
                    <td className="p-3 font-semibold text-[#50545e] flex items-center gap-1.5">
                      <span>{row.label}</span>
                      {isDifferent && row.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Values differ" />
                      )}
                    </td>
                    {comparedProperties.map((p) => {
                      const val = row.render ? row.render(p) : (p as any)[row.key || ''];
                      return (
                        <td key={p.id} className="p-3 font-medium text-[#1a1c20]">
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
