import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import type {Designer} from '../../data/shopify';

interface SocialLinksProps {
  designer: Designer;
}

export function SocialLinks({
  designer,
}: SocialLinksProps) {
  return (
    <div className="designer-social-links">

      {designer.facebook && (
        <a
          href={designer.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="designer-social-link"
          aria-label="Facebook"
        >
          <Facebook size={18} />
        </a>
      )}

      {designer.instagram && (
        <a
          href={designer.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="designer-social-link"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
      )}

      {designer.twitter && (
        <a
          href={designer.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="designer-social-link"
          aria-label="Twitter"
        >
          <Twitter size={18} />
        </a>
      )}

      {designer.youtube && (
        <a
          href={designer.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="designer-social-link"
          aria-label="YouTube"
        >
          <Youtube size={18} />
        </a>
      )}

    </div>
  );
}