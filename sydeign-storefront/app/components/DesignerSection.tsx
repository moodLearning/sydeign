import React from 'react';
import { Link } from 'react-router-dom';

export function DesignerSection() {
  return (
    <div className="border-[6px] border-[#3f5e43] bg-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden isolate">
      
      {/* Framed Photo Container */}
      <div className="w-64 h-[380px] shrink-0 border-4 border-[#b66638] rounded-2xl overflow-hidden p-2 bg-[#FCF7ED] relative flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600" 
          alt="Designer of the Month" 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Content Details */}
      <div className="flex-1 w-full">
        <span className="text-xs uppercase tracking-widest text-[#b66638] font-extrabold bg-orange-50 px-3 py-1 rounded-full inline-block">
          Featured Creator
        </span>
        <h2 className="text-4xl font-serif text-[#3f5e43] font-light mt-2 mb-1">
          Designer of the Month
        </h2>
        
        {/* Fixed: Moved Follow button outside of the <h3> heading tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-800">Jackie De Glae</h3>
            {/* Verified Checkmark Icon */}
            <svg className="w-5 h-5 text-[#3f5e43] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <button 
            type="button" 
            className="text-xs font-semibold text-gray-500 border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition cursor-pointer"
          >
            Follow
          </button>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8 text-sm">
          Miss Universe 2018 Catriona Gray has been a staunch supporter of local weaves. Among her best ensembles are the looks made with the Pisyabit textile, one of which featured the weaving of Julmina Sawadi Juri. Hailed from the Tausug Livelihood community in Parang, Sulu Jolo, the 24-year-old has been weaving Pisyabit for over 15 years, starting as an apprentice to her mother, a Pisyabit master weaver. Pisyabit is made from cotton and silk with gold threads adding to its charm. It is traditionally worn by Tausug men "Pis" and features geometric patterns "syabit" and colors seen in many Islamic arts.
        </p>
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-3 text-gray-500">
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-[#3f5e43] hover:text-white transition">
              f
            </Link>
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-[#3f5e43] hover:text-white transition">
              ig
            </Link>
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-[#3f5e43] hover:text-white transition">
              x
            </Link>
            <Link to="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-[#3f5e43] hover:text-white transition">
              yt
            </Link>
          </div>

          {/* CTA Button */}
          <Link 
            to="/designers/jackie-de-glae" 
            className="bg-[#b66638] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow hover:bg-[#964e26] transition inline-block text-center"
          >
            View Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
