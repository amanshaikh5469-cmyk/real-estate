import React from 'react';
import { Instagram, Play, Sparkles, ExternalLink, Heart, MessageCircle } from 'lucide-react';

export const InstagramSocialProof: React.FC = () => {
  const posts = [
    {
      id: 'ig-1',
      title: 'Carter Road Sea-Facing Penthouse Walkthrough 🌊',
      views: '48.2K views',
      likes: '3,410',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      tag: '#BandraWest #LuxuryLiving',
    },
    {
      id: 'ig-2',
      title: 'Pali Hill Private Villa Drone Tour 🍃',
      views: '62.1K views',
      likes: '4,890',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      tag: '#PaliHill #HeritageVilla',
    },
    {
      id: 'ig-3',
      title: 'Worli Sea Link Golden Hour Sunset Terrace 🌇',
      views: '39.8K views',
      likes: '2,920',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      tag: '#WorliSeaFace #MumbaiSkyline',
    },
    {
      id: 'ig-4',
      title: 'Juhu Horizon 4 BHK Single-Floor Penthouse 👑',
      views: '54.5K views',
      likes: '3,840',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      tag: '#Juhu #PrivatePenthouse',
    },
  ];

  return (
    <section id="instagram-social-section" className="py-14 lg:py-18 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#ebe3d5]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#8a6b2d] mb-1.5">
              <Instagram className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Follow Our Property Stories</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1c20]">
              @rafiqueestates on Instagram
            </h2>
            <p className="text-[#717680] text-sm mt-1">
              Private estate walkthroughs, off-market previews, and Mumbai micro-market analysis.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <span className="px-3 py-1 bg-white border border-[#ebe3d5] rounded-full text-xs font-semibold text-[#1a1c20] shadow-xs">
              42K+ Community
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-xl flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity"
            >
              <span>Follow Us</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Reels Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <div
              key={post.id}
              id={post.id}
              className="group relative rounded-2xl overflow-hidden aspect-[9/14] bg-[#1a1c20] border border-[#ebe3d5] shadow-xs cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Play Badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold text-[#dfbe7e] tracking-wide block mb-1">
                  {post.tag}
                </span>
                <h4 className="font-display text-sm font-bold leading-snug line-clamp-2 mb-2.5">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/15">
                  <span className="font-medium">{post.views}</span>
                  <div className="flex items-center gap-1 text-white/90">
                    <Heart className="w-3 h-3 text-rose-400 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
