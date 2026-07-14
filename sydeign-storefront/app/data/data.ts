export const sections = [
  { title: "On Sale", key: "onSale" },
  { title: "Popular Products", key: "popular" },
  { title: "New Arrivals", key: "new" },
  { title: "Daily Discoveries", key: "discovery" },
  { title: "Top Selling", key: "topSelling" },
];

export const productCategories = [
  { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300' },
  { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=300' },
  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' },
  { name: 'Brooches', image: 'https://images.unsplash.com/photo-1574236592233-0f508a2f4c9c?w=300' },
  { name: 'Toe Rings', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300' },
  { name: 'Cufflinks', image: 'https://images.unsplash.com/photo-1619551734325-8e9389e49186?w=300' },
  { name: 'Anklets', image: 'https://images.unsplash.com/photo-1617038260896-2b4742a17400?w=300' },
  { name: 'Body Jewelry', image: 'https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=300' },
  { name: 'Hair Jewelry', image: 'https://images.unsplash.com/photo-1630799649561-c8112c295c52?w=300' },
  { name: 'Armlets', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
] as const;

export type Category = typeof productCategories[number]['name'];

// NEW: Designer Model Configuration
export interface Designer {
  id: string;
  name: string;
  handle: string;
  image: string;
  bio: string;
  isFeatured?: boolean;
  isTopRated?: boolean;
  rating: string;
  reviewsCount: string;
}

export const designers: Designer[] = [
  {
    id: 'd-jackie',
    name: 'Jackie De Glae',
    handle: '@jackiedeglae',
    image: '/des1.png',
    bio: 'Miss Universe 2018 Catriona Gray has been a staunch supporter of local weaves. Among her best ensembles are the looks made with the Pisayabit textile, one of which featured the weaving of Julmina Sawadi Juri. Hailed from the Tausug Livelihood community in Parang, Sulu Jolo, the 24-year-old has been weaving Pisayabit for over 15 years, starting as an apprentice to her mother, a Pisayabit master weaver.',
    isFeatured: true,
    rating: '5.0',
    reviewsCount: '22k'
  },
  {
    id: 'd-nida',
    name: 'Nida Bacaling',
    handle: '@nida_bacaling',
    image: '/des2.png',
    bio: 'Specializing in organic and wire-wrapped statement pieces reflecting traditional Visayan lore.',
    isTopRated: true,
    rating: '5.0',
    reviewsCount: '15k'
  },
  {
    id: 'd-nelia',
    name: 'Nelia Adinale',
    handle: '@nelia_adi',
    image: '/des3.png',
    bio: 'Pioneering minimalist fine metalsmithing using responsibly sourced Mindanao gold.',
    isTopRated: true,
    rating: '4.0',
    reviewsCount: '13k'
  },
  {
    id: 'd-evelinda',
    name: 'Evelinda Otong',
    handle: '/des4.png',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Integrating native Yakan tapestry designs directly into modern lifestyle accessories.',
    isTopRated: true,
    rating: '4.5',
    reviewsCount: '10k'
  },
  {
    id: 'd-rachel',
    name: 'Rachel Elisier',
    handle: '@rachel_elisier',
    image: '/des1.png',
    bio: 'Contemporary silver collections capturing raw textures found across coastal ecosystems.',
    isTopRated: true,
    rating: '4.0',
    reviewsCount: '12.3k'
  },
  {
    id: 'd-ariosto',
    name: 'Ariosto Dale Ballero',
    handle: '/des2.png',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    bio: 'Avant-garde structure design specializing in bold filigree armlets and structural pins.',
    rating: '4.8',
    reviewsCount: '9k'
  },
  {
    id: 'd-lymuel',
    name: 'Lymuel Baustista',
    handle: '@lymuel_b',
    image: 'des3.png',
    bio: 'Eco-conscious designer utilizing recycled copper and wood accents.',
    rating: '4.7',
    reviewsCount: '6k'
  },
  {
    id: 'd-kathleen',
    name: 'Kathleen Dagus',
    handle: '@kath_dagus',
    image: 'des4.png',
    bio: 'Delicate fashion loops, anklets, and intricate crystal hair fixtures.',
    rating: '4.9',
    reviewsCount: '11k'
  },
  {
    id: 'd-murdhir',
    name: 'Murdhir Laza',
    handle: '@murdhir_laza',
    image: 'des1.png',
    bio: 'Traditional metal casting focused on preserving cultural heirloom configurations.',
    rating: '4.6',
    reviewsCount: '7k'
  }
];

// Add or update this in your types / data file
export interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  images: {
    nodes: Array<{
      url: string;
      altText?: string | null;
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  designerMetafield?: {
    reference?: {
      designerNameField?: {
        value: string;
      };
    } | null;
  } | null;
}

/*export const products: ShopifyProduct[] = [
  // Your mock items go here...
];*/

export const products: Product[] = [
  { id: '1', name: 'Emerald Pendant', price: 2500, image: '/p (1).png', designer: 'Nida Bacaling', sections: ['onSale', 'popular', 'topSelling'], category: 'Necklaces' },
  { id: '11', name: 'Gold Chain', price: 1800, image: '/p (2).png', designer: 'Nida Bacaling', sections: ['popular', 'topSelling'], category: 'Necklaces' },
  { id: '12', name: 'Silver Layered Necklace', price: 2100, image: '/p (3).png', designer: 'Aris G.', sections: ['new', 'topSelling'], category: 'Necklaces' },

  { id: '2', name: 'Butterfly Studs', price: 1200, image: '/p (2).png', designer: 'Nida Bacaling', sections: ['new', 'discovery', 'topSelling'], category: 'Earrings' },
  { id: '13', name: 'Pearl Drop Earrings', price: 950, image: '/p (4).png', designer: 'Nida Bacaling', sections: ['popular', 'topSelling'], category: 'Earrings' },
  { id: '14', name: 'Hoop Gold Earrings', price: 1100, image: '/p (5).png', designer: 'Luxe Wear', sections: ['discovery'], category: 'Earrings' },

  { id: '3', name: 'Gold Solitaire Ring', price: 4500, image: '/p (3).png', designer: 'Aris G.', sections: ['popular', 'topSelling'], category: 'Rings' },
  { id: '15', name: 'Silver Band Ring', price: 800, image: '/p (6).png', designer: 'Aris G.', sections: ['new'], category: 'Rings' },
  { id: '16', name: 'Diamond Eternity Ring', price: 5500, image: '/p (7).png', designer: 'Luxe Wear', sections: ['topSelling'], category: 'Rings' },

  { id: '4', name: 'Minimalist Cuff', price: 850, image: '/p (4).png', designer: 'Luxe Wear', sections: ['new'], category: 'Bracelets' },
  { id: '17', name: 'Leather Wrap Bracelet', price: 600, image: '/p (8).png', designer: 'Luxe Wear', sections: ['discovery'], category: 'Bracelets' },
  { id: '18', name: 'Bangle Set', price: 1200, image: '/p (9).png', designer: 'Silver Lining', sections: ['popular'], category: 'Bracelets' },
];
