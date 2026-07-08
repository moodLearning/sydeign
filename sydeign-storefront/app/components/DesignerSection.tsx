import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Button } from '../components/Button';

export function DesignerSection() {
  
  const socialLinks = [
    { icon: FaFacebookF, url: '#' },
    { icon: FaInstagram, url: '#' },
    { icon: FaTwitter, url: '#' },
    { icon: FaYoutube, url: '#' },
  ];

  const spotlight = {
      name: 'Jackie De Glae',
      slug: 'jackie-de-glae',
      role: 'Jewelry & Metalsmithing',
      bio: 'Miss Universe 2018 Catriona Gray has been a staunch supporter of local weaves. Among her best ensembles are the looks made with the Pisyabit textile, one of which featured the weaving of Julmina Sawadi Juri. Hailed from the Tausug Livelihood community in Parang, Sulu Jolo, the 24-year-old has been weaving Pisyabit for over 15 years, starting as an apprentice to her mother, a Pisyabit master weaver. Pisyabit is made from cotton and silk with gold threads adding to its charm. It is traditionally worn by Tausug men "Pis" and features geometric patterns "syabit" and colors seen in many Islamic arts.',
      image: '/des1.png',
    };

  return (
    <div className="bg-white rounded-3xl p-16 shadow-xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden isolate">
    
    {/* Framed Photo Container */}

    <div className="relative inline-block p-10">
      <div className="w-65 h-[380px] shrink-0 rounded-2xl pt-5 overflow-hidden bg-white relative flex items-center justify-center">
        <img 
          src={spotlight.image}
          alt={spotlight.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>   
      <img 
        src="/picture-frame.png" 
        alt="Designer of the month" 
        className="absolute top-0 left-0 w-80 h-[450px] mb-15 pointer-events-none" 
      />
    </div>
   
      {/* Content Details */}
      <div className="flex-1 w-full">
        <span className="text-xs uppercase tracking-widest text-[#b66638] font-extrabold bg-orange-50 px-3 py-1 rounded-full inline-block">
          Featured Creator
        </span>
        <h1 className="text-5xl font-sans font-bold text-primary mt-2 mb-1">
          {spotlight.name}
        </h1>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-800">Designer of the Month</h3>
            <svg className="w-5 h-5 text-[#3f5e43] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <button 
            type="button" 
            className="text-l font-semibold text-gray-500 border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition cursor-pointer"
          >
            Follow
          </button>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8 text-m">
          {spotlight.bio}
        </p>
       
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-3 text-gray-500">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.url}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-[#3f5e43] hover:text-white transition"
                >
                  <Icon size={14} />
                </Link>
              );
            })}
          </div>

          <Button label="View Collection" to="/designers/jacke-de-glae" className="mt-12" />
        </div>
      </div>
    </div>
  );
}
