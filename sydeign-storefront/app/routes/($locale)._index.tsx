import { Form } from 'react-router';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#59704F] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 text-[#728C66] text-9xl opacity-20 font-serif pointer-events-none">S</div>
      <div className="absolute bottom-6 right-6 text-[#728C66] text-9xl opacity-20 font-serif pointer-events-none">S</div>

      <div className="w-full max-w-xl text-center px-6 z-10 space-y-8 flex flex-col items-center">
        <img 
          src="/logo-footer.png" 
          alt="SÝDEIGN" 
          className="w-72 max-w-full h-auto object-contain mb-2 invert-0 brightness-100" 
        />

        <Form action="/home" method="get" className="relative w-full">
          <input
            type="text"
            name="q"
            placeholder="What are you looking to buy?"
            className="w-full bg-[#FFFCEB]/10 border-2 border-[#FFFCEB]/40 text-[#FFFCEB] placeholder-[#FFFCEB]/60 rounded-full px-6 py-3 pr-12 focus:outline-none focus:border-[#FFFCEB] transition"
          />
          <button type="submit" className="absolute right-4 top-3.5 text-[#FFFCEB] hover:scale-110 transition">
            🔍
          </button>
        </Form>
      </div>
    </div>
  );
}