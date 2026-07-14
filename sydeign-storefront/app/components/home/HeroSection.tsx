import {ButtonAlt} from '../Button';

export function HeroSection() {
  return (
    <section
      className="
        relative
        flex
        h-[60vh]
        lg:h-screen
        items-center
        justify-center
        overflow-hidden
        shadow-md
      "
    >
      <img
        src="/home-banner.png"
        alt="Sydeign Banner"
        className="
          absolute
          inset-0
          -z-10
          h-full
          w-full
          object-cover
          select-none
        "
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
          lg:bottom-35
        "
      >
        Your story, your style
      </h2>

      <div
        className="
          absolute
          bottom-10
          z-20
          lg:bottom-25
        "
      >
        <ButtonAlt
          label="Explore Now"
          to="/products"
        />
      </div>
    </section>
  );
}