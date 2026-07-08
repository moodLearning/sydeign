export const sections = [
    { title: "On Sale", key: "onSale" },
    { title: "Popular Products", key: "popular" },
    { title: "New Arrivals", key: "new" },
    { title: "Daily Discoveries", key: "discovery" },
];

export const productCategories = [
  { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300' },
  { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611082260246-302a80b263b6?w=300' },
  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' },
  { name: 'Hair Jewelry', image: 'https://images.unsplash.com/photo-1630799649561-c8112c295c52?w=300' },
  { name: 'Anklets', image: 'https://images.unsplash.com/photo-1617038260896-2b4742a17400?w=300' },
  { name: 'Brooches', image: 'https://images.unsplash.com/photo-1574236592233-0f508a2f4c9c?w=300' },
  { name: 'Toe Rings', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300' },
  { name: 'Cufflinks', image: 'https://images.unsplash.com/photo-1619551734325-8e9389e49186?w=300' },
  { name: 'Body Jewelry', image: 'https://images.unsplash.com/photo-1515372039744-b8f02336a769?w=300' },
  { name: 'Armlets', image: 'https://images.unsplash.com/photo-1599643478598-a85190c7cb75?w=300' },
] as const;

export type Category = typeof productCategories[number]['name'];

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  designer: string;
  sections: ('onSale' | 'popular' | 'new' | 'discovery')[];
  category: Category; 
}

export const products: Product[] = [
  { id: '1', name: 'Emerald Pendant', price: 2500, image: '/p (1).png', designer: 'Nida Bacaling', sections: ['onSale', 'popular'], category: 'Necklaces' },
  { id: '2', name: 'Butterfly Studs', price: 1200, image: '/p (2).png', designer: 'Nida Bacaling', sections: ['new', 'discovery'], category: 'Earrings' },
  { id: '3', name: 'Gold Solitaire Ring', price: 4500, image: '/p (3).png', designer: 'Aris G.', sections: ['popular'], category: 'Rings' },
  { id: '4', name: 'Minimalist Cuff', price: 850, image: '/p (4).png', designer: 'Luxe Wear', sections: ['new'], category: 'Bracelets' },
  { id: '5', name: 'Crystal Hair Pins', price: 400, image: '/p (5).png', designer: 'Nida Bacaling', sections: ['discovery'], category: 'Hair Jewelry' },
  { id: '6', name: 'Silver Anklet Chain', price: 650, image: '/p (6).png', designer: 'Silver Lining', sections: ['onSale', 'discovery'], category: 'Anklets' },
  { id: '7', name: 'Vintage Pearl Brooch', price: 1800, image: '/p (7).png', designer: 'Classic Gems', sections: ['popular'], category: 'Brooches' },
  { id: '8', name: 'Diamond Toe Ring', price: 900, image: '/p (8).png', designer: 'Aris G.', sections: ['new'], category: 'Toe Rings' },
  { id: '9', name: 'Engraved Silver Cufflinks', price: 1100, image: '/p (9).png', designer: 'Modern Man', sections: ['popular'], category: 'Cufflinks' },
  { id: '10', name: 'Gold Body Chain', price: 3200, image: '/p (10).png', designer: 'Luxe Wear', sections: ['new', 'discovery'], category: 'Body Jewelry' },
  { id: '11', name: 'Tribal Armlet', price: 1500, image: '/p (11).png', designer: 'Aris G.', sections: ['onSale'], category: 'Armlets' },
  { id: '12', name: 'Ruby Cluster Necklace', price: 5200, image: '/p (12).png', designer: 'Nida Bacaling', sections: ['popular', 'new'], category: 'Necklaces' },
  { id: '13', name: 'Stacking Rings Set', price: 2100, image: '/p (13).png', designer: 'Luxe Wear', sections: ['onSale', 'popular'], category: 'Rings' },
  { id: '14', name: 'Boho Arm Band', price: 750, image: '/p (14).png', designer: 'Classic Gems', sections: ['discovery'], category: 'Armlets' }
];
