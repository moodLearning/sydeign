import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 font-sans">
      <h1 className="text-4xl font-serif font-light text-center mb-16">Contact us</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Phone */}
        <div className="border rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-center h-48 bg-white">
          <div className="text-3xl mb-3 text-emerald-700">📞</div>
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Phone</h2>
          <p className="text-gray-700 text-sm font-medium">(+63 2) - 652 - 5922</p>
          <p className="text-gray-700 text-sm font-medium">286526922</p>
        </div>

        {/* Email */}
        <div className="border rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-center h-48 bg-white">
          <div className="text-3xl mb-3 text-emerald-700">✉️</div>
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Email</h2>
          <p className="text-gray-700 text-sm font-medium break-all">sydeignshop.com</p>
        </div>

        {/* Address */}
        <div className="border rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-center h-48 bg-white">
          <div className="text-3xl mb-3 text-emerald-700">📍</div>
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Address</h2>
          <p className="text-gray-700 text-xs leading-relaxed max-w-xs">
            National Engineering Center, University of the Philippines, Diliman, Quezon City, Philippines
          </p>
        </div>
      </div>
    </div>
  );
}
