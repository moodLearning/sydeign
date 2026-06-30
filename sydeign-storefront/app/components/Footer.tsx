import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#59704F] text-[#F4F6EE] px-12 py-12 mt-auto w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <img 
            src="/logo-footer.png" 
            alt="SÝDEIGN" 
            className="h-14 w-auto object-contain brightness-0 invert" 
          />
          <p className="text-sm text-[#D3DCCE] leading-relaxed max-w-md">
            Sydeign is a Philippine e-commerce website that features creative Filipino designers and an online marketplace whose primary products are Pinoy arts and crafts including paintings, weavings, artworks, and many more.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-[#DDF2D1]">Information</h4>
          <ul className="space-y-2 text-sm text-[#D3DCCE]">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Delivery Information</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#DDF2D1]">Contact</h4>
          <p className="text-sm text-gray-200 mb-2">moodlearning.com</p>
          <p className="text-sm text-gray-200 mb-2">(+63 2) 652 5822</p>
          <p className="text-sm text-gray-200 mb-6">contact@moodlearning.com</p>

          {/* Stable Payment Badges Container */}
          <div className="flex flex-wrap items-center gap-3 bg-white/10 p-3 rounded-lg w-fit">
            {/* Replace fragile sprite cropping with individual, properly scaled SVGs/PNGs */}
            <div className="w-12 h-8 flex items-center justify-center rounded bg-white px-1">
              <span className="text-[9px] font-bold text-gray-800">Mastercard</span>
            </div>
            <div className="w-12 h-8 flex items-center justify-center rounded bg-white px-1">
              <span className="text-[9px] font-bold text-gray-800">UnionPay</span>
            </div>
            <div className="w-12 h-8 flex items-center justify-center rounded bg-white px-1">
              <span className="text-[9px] font-bold text-blue-600">PayPal</span>
            </div>
            <div className="w-12 h-8 flex items-center justify-center rounded bg-white px-1">
              <span className="text-[10px] font-extrabold tracking-wider text-blue-900">VISA</span>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
