import {ButtonAlt, ButtonCard} from '../Button';

export function HeroSection() {
  return (
    <section
      className="
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        shadow-md
      "
    >
    <img 
      className="w-screen select-none" 
      src="/home-banner.png" 
      alt="Sydeign Banner" 
    />

      <h2
        className="
          hero-title
          absolute
          bottom-20
          left-1/2
          z-10
          -translate-x-1/2
          text-center
          text-primary
          lg:bottom-25
        "
      >
        Your story, your style
      </h2>

      <div
        className="
          absolute
          bottom-10
          z-20
          lg:bottom-14
        "
      >
        <ButtonCard
          label="EXPLORE NOW"
          to="/products"
        />
      </div>
    </section>
  );
}