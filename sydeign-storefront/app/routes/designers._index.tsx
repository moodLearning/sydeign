import React from 'react';
import { DesignerSection } from '../components/DesignerSection';
import { TopDesignerSection } from '../components/TopDesignerSection';
import { DiscoverDesignerSection } from '../components/DiscoverDesignerSection';
import { MessageSquare } from 'lucide-react';

export default function DesignersIndex() {
  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen relative">
      
      {/* Designer of the Month Section */}
      <section className="w-full pt-12 pb-16 z-30 relative shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] shadow-md bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <DesignerSection />
        </div>
      </section>

      {/* Top Rated Carousel Section (Beige Background matching mockup) */}
      <section className="w-full bg-[#f9f5e8] py-16 z-20 relative shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] shadow-xl">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <TopDesignerSection />
        </div>
      </section>

      {/* Discover Designers Grid Section */}
      <section className="w-full bg-[#fcfdfa] py-16 z-10 relative pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <DiscoverDesignerSection />
        </div>
      </section>

      {/* Floating Chat Accent Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button type="button" className="bg-[#c36a3e] hover:bg-[#b05c32] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer">
          <MessageSquare size={22} />
        </button>
      </div>
    </div>
  );
}