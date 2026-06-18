export default function Footer() {
  return (
    <footer className="bg-[#59704F] text-[#F4F6EE] px-12 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <img 
            src="/logo-footer.png" 
            alt="SÝDEIGN" 
            className="h-14 w-auto object-contain invert brightness-0" 
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
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-gray-200 mb-2">moodlearning.com</p>
          <p className="text-sm text-gray-200 mb-2">(+63 2) 652 5822</p>
          <p className="text-sm text-gray-200 mb-6">contact@moodlearning.com</p>

          {/* Combined Image Sprite Container */}
          <div className="flex flex-wrap items-center gap-3 bg-white/10 p-3 rounded-lg w-fit">
            
            {/* Mastercard Badge */}
            <div className="w-12 h-8 overflow-hidden relative rounded bg-[#5C7051]">
              <img 
                src="/payment-methods.png" 
                alt="Mastercard" 
                className="absolute max-w-none"
                style={{ 
                  width: '240px', // Adjust width relative to your entire sprite sheet
                  height: 'auto',
                  top: '0px', 
                  left: '0px'     // Adjust pixel offsets based on where Mastercard starts
                }} 
              />
            </div>

            {/* UnionPay Badge */}
            <div className="w-12 h-8 overflow-hidden relative rounded bg-[#5C7051]">
              <img 
                src="/payment-methods.png" 
                alt="UnionPay" 
                className="absolute max-w-none"
                style={{ 
                  width: '240px', 
                  height: 'auto',
                  top: '0px', 
                  left: '-60px' // Shift left to crop to the UnionPay section
                }} 
              />
            </div>

            {/* PayPal Badge */}
            <div className="w-12 h-8 overflow-hidden relative rounded bg-[#5C7051]">
              <img 
                src="/payment-methods.png" 
                alt="PayPal" 
                className="absolute max-w-none"
                style={{ 
                  width: '240px', 
                  height: 'auto',
                  top: '0px', 
                  left: '-120px' // Shift left to crop to the PayPal section
                }} 
              />
            </div>

            {/* Visa / Visa Electron Badge */}
            <div className="w-12 h-8 overflow-hidden relative rounded bg-[#5C7051]">
              <img 
                src="/payment-methods.png" 
                alt="Visa" 
                className="absolute max-w-none"
                style={{ 
                  width: '240px', 
                  height: 'auto',
                  top: '0px', 
                  left: '-180px' // Shift left to crop to the Visa section
                }} 
              />
            </div>

          </div>
        </div>
        
      </div>
    </footer>
  );
}