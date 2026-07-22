import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <img
            src="/logo-footer.png"
            alt="SÝDEIGN"
            className="site-footer-logo"
          />
          <p className="site-footer-tagline">
            Sydeign is a Philippine e-commerce website that features creative Filipino designers and an online marketplace whose primary products are Pinoy arts and crafts including paintings, weavings, artworks, and many more.
          </p>
        </div>

        <div>
          <h4 className="site-footer-heading">Information</h4>
          <ul className="site-footer-list">
            <li><a href="#" className="site-footer-link">About Us</a></li>
            <li><a href="#" className="site-footer-link">Delivery Information</a></li>
            <li><a href="#" className="site-footer-link">Privacy Policy</a></li>
            <li><a href="#" className="site-footer-link">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h4 className="site-footer-heading-contact">Contact</h4>
          <p className="site-footer-contact-text">moodlearning.com</p>
          <p className="site-footer-contact-text">(+63 2) 652 5822</p>
          <p className="site-footer-contact-text-last">contact@moodlearning.com</p>

          {/* Stable Payment Badges Container */}
          <div className="site-footer-payment-badges">
            {/* Replace fragile sprite cropping with individual, properly scaled SVGs/PNGs */}
            <div className="site-footer-payment-badge">
              <span className="site-footer-payment-label">Mastercard</span>
            </div>
            <div className="site-footer-payment-badge">
              <span className="site-footer-payment-label">UnionPay</span>
            </div>
            <div className="site-footer-payment-badge">
              <span className="site-footer-payment-label-paypal">PayPal</span>
            </div>
            <div className="site-footer-payment-badge">
              <span className="site-footer-payment-label-visa">VISA</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
