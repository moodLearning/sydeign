export default function Footer() {
  return (
    <footer className="bg-[#59704F] text-[#F4F6EE] px-12 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <img 
            src="/logo-footer.png" 
            alt="SÝDEIGN" 
            className="h-14 w-auto object-contain invert brightness-200" 
          />
          <p className="text-sm text-[#D3DCCE] leading-relaxed max-w-md">
            Sydeign is a Philippine e-commerce website that features creative Filipino designers and an online marketplace whose primary products are Pinoy arts and crafts including paintings, weavings, artworks, and many more.
          </p>
        </div>
        
        {/* ... Rest of your footer stays exactly the same */}
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
          <h4 className="font-bold mb-4 text-[#DDF2D1]">Contact</h4>
          <p className="text-sm text-[#D3DCCE]">moodlearning.com</p>
          <p className="text-sm text-[#D3DCCE]">(+63 2) 652 5822</p>
          <p className="text-sm text-[#D3DCCE] break-all">contact@moodlearning.com</p>
          <div className="flex gap-2 mt-4 text-2xl">
            <span>💳</span> <span>📱</span> <span>🌏</span>
          </div>
        </div>
      </div>
    </footer>
  );
}