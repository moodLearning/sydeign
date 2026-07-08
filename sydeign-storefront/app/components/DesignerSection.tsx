import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export function DesignerSection() {
  const spotlight = {
    name: 'Ann Ong',
    username: '@ann_ong_',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: '/des1.png', // The designer photo
    artworkImage: '/artwork.png', // The jewelry/butterfly artwork on the right
    slug: 'ann-ong'
  };

  return (
    <div className="w-full h-full bg-[#fcfdfa] border border-[#f0f4ee] rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden isolate">
      
      {/* 4 Decorative Corner Frames using the Top-Right asset */}
      <img src="/corner-frame.png" alt="" className="absolute top-0 left-0 w-36 h-36 pointer-events-none object-contain -rotate-90" />
      <img src="/corner-frame.png" alt="" className="absolute top-0 right-0 w-36 h-36 pointer-events-none object-contain" />
      <img src="/corner-frame.png" alt="" className="absolute bottom-0 left-0 w-36 h-36 pointer-events-none object-contain rotate-180" />
      <img src="/corner-frame.png" alt="" className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none object-contain rotate-90" />

      {/* Left Profile Image Container */}
      <div className="w-full md:w-[300px] shrink-0 aspect-[4/5] rounded-[32px] overflow-hidden shadow-md">
        <img 
          src={spotlight.image}
          alt={spotlight.name}
          className="w-full h-full object-cover"
        />
      </div>   
   
      {/* Middle Content Details */}
      <div className="flex-1 flex flex-col justify-center py-2 z-10">
        
        {/* Designer of the Month Brand Header */}
        <div className="flex items-center gap-1.5 mb-4 max-w-md select-none">
          {/* Stylized 'D' Logo Image Component */}
          <img 
            src="/logo-small.png" 
            alt="D" 
            className="w-14 h-14 object-contain shrink-0" 
          />
          {/* Remainder Typography elements */}
          <div className="flex flex-col uppercase text-[#5B8266] font-serif tracking-[0.18em] leading-none justify-center mt-1">
            <span className="text-3xl font-light tracking-[0.22em]">esigner</span>
            <span className="text-[11px] font-semibold tracking-[0.15em] text-[#7a9d83] mt-1">of the month</span>
          </div>
        </div>

        {/* Name & Handle Row */}
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          {spotlight.name}
        </h1>
        
        <div className="flex items-center gap-3 mt-1 mb-5">
          <span className="text-sm font-medium text-gray-600 font-mono flex items-center gap-1">
            {spotlight.username}
            {/* Green verified checkmark badge */}
            <svg className="w-4 h-4 text-[#2e7d32]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </span>
          <button 
            type="button" 
            className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 border border-gray-300 px-3 py-0.5 rounded-full hover:bg-gray-50 transition cursor-pointer"
          >
            Follow
          </button>
        </div>

        {/* Bio text */}
        <p className="section-body text-justify mb-6 text-gray-600 text-sm leading-relaxed max-w-xl">
          {spotlight.bio}
        </p>
       
        {/* View Collection Button */}
        <Button label="View Collection" to={`/designers/${spotlight.slug}`} className="w-fit" />
      </div>

      {/* Right Side Showcase Artwork */}
      <div className="hidden lg:flex w-[260px] shrink-0 h-[300px] items-center justify-center z-10">
        <img 
          src={spotlight.artworkImage} 
          alt="Featured Artwork" 
          className="max-w-full max-h-full object-contain filter drop-shadow-xl"
        />
      </div>

    </div>
  );
}