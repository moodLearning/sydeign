export interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
}

interface ShopifyField {
  value?: string | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description?: string;
  handle: string;
  tags?: string[];
  variants?: {
    nodes: {
      id: string;
    }[];
  };
  images: {
    nodes: ProductImage[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  collections: {
    nodes: {
      title: string;
      handle: string;
    }[];
  };
  designerMetafield?: {
    reference?: {
      id: string;
      designerNameField?: {
        value: string;
      };
    };
  };
}

export interface ShopifyDesigner {
  id: string;
  handle: string;
  name?: ShopifyField;
  bio?: ShopifyField;
  profilePicture?: {
    reference?: {
      image?: {
        url: string;
        altText?: string | null;
      };
    };
  };
  cardPicture?: {
    reference?: {
      image?: {
        url: string;
        altText?: string | null;
      };
    };
  };
  bannerImage?: {
    reference?: {
      image?: {
        url: string;
        altText?: string | null;
      };
    };
  };
  averageRating?: ShopifyField;
  reviewCount?: ShopifyField;
  isFeatured?: ShopifyField;
  followers?: ShopifyField;
  products?: ShopifyField;
  socialLinks?: ShopifyField;
}

// ==========================================
// 2. FRONTEND FLAT TYPES (CLEAN INTERFACES)
// ==========================================

export interface Product {
  id: string;
  variantId: string; // Used securely by Cart API
  handle: string;
  title: string;
  description: string;
  image: string;
  images: ProductImage[];
  price: number;
  currency: string;
  designerId?: string;
  designerName?: string;
  collections: {
    title: string;
    handle: string;
  }[];
}

export interface Designer {
  id: string;
  handle: string;
  name: string;
  bio: string;
  profileImage: string;
  cardImage: string;
  bannerImage: string;
  averageRating: number;
  reviewCount: number;
  isFeatured: boolean;
  socialLinks: string[];
  styles: string[];
  featuredProductHandle?: string;
  followers?: number;
  products?: number;
}

export function normalizeProduct(product: ShopifyProduct): Product {
  const variantId = product.variants?.nodes?.[0]?.id || product.id;

  if (variantId === product.id) {
    console.warn(
      `[normalizeProduct] Warning: No variant found for "${product.title}". ` +
      `Ensure your GraphQL query fetches "variants(first: 1) { nodes { id } }"`
    );
  }

  return {
    id: product.id,
    variantId,
    handle: product.handle,
    title: product.title,
    description: product.description ?? '',
    image: product.images?.nodes?.[0]?.url ?? '',
    images: product.images?.nodes ?? [],
    price: Number(product.priceRange?.minVariantPrice?.amount ?? 0),
    currency: product.priceRange?.minVariantPrice?.currencyCode ?? 'PHP',
    designerId: product.designerMetafield?.reference?.id,
    designerName: product.designerMetafield?.reference?.designerNameField?.value ?? 'Designer Collection',
    collections: product.collections?.nodes ?? [],
  };
}

export function normalizeDesigner(node: ShopifyDesigner): Designer {
  return {
    id: node.id,
    handle: node.handle,
    name: node.name?.value ?? '',
    bio: node.bio?.value ?? '',
    profileImage: node.profilePicture?.reference?.image?.url ?? '/placeholder-designer.png',
    cardImage: node.cardPicture?.reference?.image?.url ?? '/placeholder-designer.png',
    bannerImage: node.bannerImage?.reference?.image?.url ?? '/placeholder-banner.png',
    averageRating: Number(node.averageRating?.value ?? 0),
    reviewCount: Number(node.reviewCount?.value ?? 0),
    isFeatured: node.isFeatured?.value === 'true',
    socialLinks: [],
    styles: [],
    followers: Number(node.followers?.value ?? 0),
    products: Number(node.products?.value ?? 0),
  };
}