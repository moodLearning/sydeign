import { Form, Link, useSubmit } from 'react-router';

export default function Header({ q }: { q?: string }) {
  const submit = useSubmit();

  return (
    <header className="bg-[#FFFCEB] px-8 py-4 flex items-center justify-between border-b border-[#D4D9C1]">
      <div className="flex items-center gap-12 flex-1">
        <Link to="/home" className="hover:opacity-80 transition flex items-center">
          <img 
            src="/logo-small.png" 
            alt="SÝDEIGN" 
            className="h-10 w-auto object-contain" 
          />
        </Link>
        
        <Form action="/home" method="get" className="relative w-full max-w-xl">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search products, shops..."
            onChange={(e) => submit(e.currentTarget.form)}
            className="w-full bg-[#FAFAF2] border border-[#BAC3A1] rounded-full px-6 py-2 text-[#4B6B40] focus:outline-none focus:ring-1 focus:ring-[#4B6B40] placeholder-[#A3AF8A]"
          />
          <span className="absolute right-4 top-2.5 text-[#4B6B40]">🔍</span>
        </Form>
      </div>

      <nav className="flex items-center gap-8 text-[#4B6B40] font-medium ml-8">
        <Link to="/products" className="hover:text-[#2C4124]">Products</Link>
        <Link to="/shops" className="hover:text-[#2C4124]">Shops</Link>
        <a href="#contact" className="hover:text-[#2C4124]">Contact</a>
        
        <div className="flex items-center gap-4 ml-4 text-xl select-none">
          <span title="Cart feature coming soon" className="cursor-not-allowed opacity-60">🛒</span>
          <span title="Wishlist feature coming soon" className="cursor-not-allowed opacity-60">❤️</span>
          <span title="Settings feature coming soon" className="cursor-not-allowed opacity-60">⚙️</span>
        </div>
      </nav>
    </header>
  );
}