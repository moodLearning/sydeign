import {ButtonAlt, ButtonCard} from '../Button';

export function HeroSection() {
  return (
    <section className="hero-section">
    <img
      className="hero-banner-img"
      src="/home-banner.png"
      alt="Sydeign Banner"
    />

      <h2 className="hero-title hero-caption">
        Your story, your style
      </h2>

      <div className="hero-cta-wrap">
        <ButtonCard
          label="EXPLORE NOW"
          to="/products"
        />
      </div>
    </section>
  );
}