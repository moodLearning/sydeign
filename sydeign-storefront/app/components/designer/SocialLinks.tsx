import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import type {Designer} from '../../data/shopify';

interface SocialLinksProps {
  designer: Designer;
}

export function SocialLinks({
  designer,
}: SocialLinksProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-4 text-stone-500">

      {designer.facebook && (
        <a
          href={designer.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#c36a3e]"
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
          className="transition-colors hover:text-[#c36a3e]"
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
          className="transition-colors hover:text-[#c36a3e]"
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
          className="transition-colors hover:text-[#c36a3e]"
          aria-label="YouTube"
        >
          <Youtube size={18} />
        </a>
      )}

    </div>
  );
}