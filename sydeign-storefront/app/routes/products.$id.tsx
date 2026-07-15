import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { ChevronLeft, ChevronRight, Star, Heart, Share2, Upload } from 'lucide-react';
import { PRODUCT_QUERY } from '../graphql/products';
import { getProductsCatalog } from '../lib/products.server'; 
import { normalizeProduct } from '../data/shopify';
import type { Product, ProductImage } from '../data/shopify';
import Sidebar from '../components/Sidebar';
import { useCart } from '../data/CartContext'; 
import ProductSection from '../components/product/ProductsSection'; 

export async function loader({ params, context }: LoaderFunctionArgs) {
  const handle = params.id;

  if (!handle) {
    throw new Response('Product not found', { status: 404 });
  }

  const [productData, catalogData] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, { variables: { handle } }),
    getProductsCatalog(context.storefront).catch(() => ({ products: [], collections: [] }))
  ]);

  if (!productData.product) {
    throw new Response('Product not found', { status: 404 });
  }

  return {
    product: normalizeProduct(productData.product),
    collections: catalogData.collections || [],
    allProducts: catalogData.products || [],
  };
}

export default function ProductPage() {
  const { product, collections, allProducts } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const images = product.images ?? [];
  const [selectedImage, setSelectedImage] = useState(images[0]?.url ?? '');
  const [quantity, setQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const designerName = product.designerName ?? 'Jeanne Jeanner';

  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: product.currency ?? 'PHP',
  }).format(product.price);

  useEffect(() => {
    if (!product) return;
    
    const localKey = 'recently_viewed_products';
    const stored = localStorage.getItem(localKey);
    let list: Product[] = stored ? JSON.parse(stored) : [];
    
    list = list.filter((item) => item.id !== product.id);
    list.unshift(product);
    
    const trimmedList = list.slice(0, 4);
    localStorage.setItem(localKey, JSON.stringify(trimmedList));
    setRecentlyViewed(trimmedList);
  }, [product]);

  useEffect(() => {
    if (images[0]?.url) {
      setSelectedImage(images[0].url);
    }
    setQuantity(1);
  }, [product, images]);

  const handleFilterChange = (category: string) => {
    const cleanCategory = category === 'All Products' ? '' : `?category=${encodeURIComponent(category)}`;
    navigate(`/products${cleanCategory}`);
  };

const otherProducts = allProducts.filter((p) => p.id !== product.id);

const baseSimilar = otherProducts
  .filter((p) => 
    p.collections?.some((col) => product.collections?.includes(col)) || 
    (p.designerName && p.designerName === product.designerName)
  )
  .concat(otherProducts)
  .filter((value, index, self) => self.findIndex((p) => p.id === value.id) === index)
  .slice(0, 4);

const computedSimilar: Product[] = baseSimilar.map(prod => ({
  ...prod,
  collections: [
    ...(prod.collections || []),
    { title: 'similar', handle: 'similar' } 
  ]
}));

const baseRecentlyViewed = recentlyViewed.slice(0, 4);

const computedRecentlyViewed: Product[] = baseRecentlyViewed.map(prod => ({
  ...prod,
  collections: [
    ...(prod.collections || []),
    { title: 'recently-viewed', handle: 'recently-viewed' } 
  ]
}));

  // Mock data for reviews
  const mockReviews = [
    {
      id: '1',
      author: 'iamme',
      rating: 5,
      date: '01/08/2023',
      body: 'These pearl earrings are stunning! They add a sophisticated touch to any outfit, whether it\'s for a formal event or a casual day out. I highly recommend it!',
      images: [images[0]?.url, images[1]?.url, images[2]?.url].filter(Boolean)
    },
    {
      id: '2',
      author: 'Bell4t',
      rating: 5,
      date: '01/08/2023',
      body: 'Absolutely gorgeous! These pearl earrings are a timeless classic. The quality of the pearls are excellent.',
      images: [images[0]?.url, images[1]?.url, images[2]?.url].filter(Boolean)
    },
    {
      id: '3',
      author: 'Ariel Liebert',
      rating: 5,
      date: '12/10/2023',
      body: 'Absolutely gorgeous! These pearl earrings are a timeless classic. The quality of the pearls are excellent.',
      images: [images[0]?.url, images[1]?.url, images[2]?.url].filter(Boolean)
    }
  ];

  return (
    <main className="w-full min-h-screen bg-[#fcfdfa]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[20rem_minmax(0,1fr)] md:px-12 md:items-start">
        
        <Sidebar
          activeCategory="All Products"
          onFilterChange={handleFilterChange}
          collections={collections}
        />

        <div className="flex flex-col gap-12 min-w-0">
          {/* Main Product Section */}
          <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
              <ProductGallery
                images={images}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />

              <ProductInformation
                product={product}
                designerName={designerName}
                formattedPrice={formattedPrice}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>

            {/* Customer Reviews */}
            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-3xl font-bold text-center text-primary mb-8 font-cinzel">Customer Reviews</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                <div className="lg:col-span-4 flex flex-col items-center justify-center border-r border-gray-100 pr-8">
                  <div className="text-center">
                    <span className="text-6xl font-bold text-primary">5.0</span>
                    <div className="flex gap-1 my-2 justify-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />)}
                    </div>
                    <span className="text-sm text-gray-500">(22 reviews)</span>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="relative border border-gray-200 rounded-2xl p-4 bg-gray-50">
                    <textarea 
                      placeholder="Write your review here..." 
                      className="w-full bg-transparent border-none outline-none text-sm resize-none h-24"
                    />
                    <div className="flex items-center justify-between border-t border-gray-200 pt-2 mt-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gray-300 cursor-pointer hover:text-amber-500" />)}
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-primary"><Upload className="w-4 h-4" /></button>
                        <button className="bg-primary text-white p-2 rounded-lg text-xs uppercase font-semibold">Post</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-2xl p-5 shadow-sm bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-primary flex items-center justify-center font-bold text-xs">
                            {review.author[0].toUpperCase()}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-800 block">{review.author}</span>
                            <span className="text-[10px] text-gray-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed mb-4">{review.body}</p>
                    </div>
                    {review.images.length > 0 && (
                      <div className="flex gap-2">
                        {review.images.map((img, index) => (
                          <div key={index} className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                            <img src={img} alt="review attachment" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-sm font-semibold text-primary underline hover:text-opacity-80">See All</button>
              </div>
            </div>
          </section>

          {/* Similar Products Section */}
          {/* Similar Products Section */}
{computedSimilar.length > 0 && (
  <ProductSection
    title="Similar Products"
    sectionKey="similar" // <-- Matches the 'similar' title we injected
    allProducts={computedSimilar} // <-- Bypasses filter because of spoofing!
    activeCategory="All Products" // <-- Bypasses category filter
    className="bg-[#f5f5ee] rounded-3xl"
  />
)}

{/* Recently Viewed Section */}
{computedRecentlyViewed.length > 0 && (
  <ProductSection
    title="Recently Viewed"
    sectionKey="recently-viewed" // <-- Matches the 'recently-viewed' title we injected
    allProducts={computedRecentlyViewed}
    activeCategory="All Products"
    className="bg-[#f5f5ee] rounded-3xl"
  />
)}
        </div>

      </div>
    </main>
  );
}

// Subcomponent: Gallery
function ProductGallery({
  images,
  selectedImage,
  setSelectedImage,
}: {
  images: ProductImage[];
  selectedImage: string;
  setSelectedImage: (url: string) => void;
}) {
  return (
    <div className="lg:col-span-7 flex gap-4 h-[500px]">
      <div className="flex flex-col items-center justify-between h-full py-1">
        <button type="button" className="text-gray-400 hover:text-primary">
          <ChevronLeft className="rotate-90 w-4 h-4" />
        </button>

        <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar max-h-[420px]">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(image.url)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === image.url ? 'border-primary scale-105' : 'border-gray-200'
              }`}
            >
              <img src={image.url} alt={image.altText ?? ''} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <button type="button" className="text-gray-400 hover:text-primary">
          <ChevronRight className="rotate-90 w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
        <img src={selectedImage} alt="Selected product view" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

// Subcomponent: Details Info Panel
function ProductInformation({
  product,
  designerName,
  formattedPrice,
  quantity,
  setQuantity,
}: {
  product: Product;
  designerName: string;
  formattedPrice: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();

  const isWishlisted = wishlistItems.some((item) => item.product.handle === product.handle);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.handle);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="lg:col-span-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
          </div>
          <span>5.0</span>
          <span className="text-gray-400 font-normal">| 12k sold</span>
          <span className="ml-auto text-gray-500">Item Available: 10</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 font-cinzel leading-tight mb-2">
          {product.title}
        </h1>

        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
          <span className="text-md font-semibold text-primary underline">
            {designerName}
          </span>
          <div className="flex gap-3">
            <button 
              onClick={handleWishlistToggle}
              className={`transition-colors p-1 rounded-md ${
                isWishlisted ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-amber-500'
              }`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors p-1" title="Share product">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-3xl font-bold text-primary mb-6">
          {formattedPrice}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed text-justify mb-8">
          {product.description || 'Organic pearls are exquisite pieces of jewelry that showcase natural beauty...'}
        </p>
      </div>

      <div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden text-sm w-32 justify-between">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-4 font-semibold text-gray-800">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-2 font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Add to Cart
            </button>
            <button 
              type="button" 
              className="flex-1 bg-[#d87c53] text-white text-xs font-semibold py-3.5 rounded-xl uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}