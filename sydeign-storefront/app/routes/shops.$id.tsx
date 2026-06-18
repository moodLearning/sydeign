import { useLoaderData, Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export async function loader({ params }: { params: any }) {
  return {
    shopName: 'Sample Shop Profile',
    products: Array(12).fill({
      id: 1,
      name: 'Artist Canvas Piece',
      price: 1000.00,
      image: 'https://via.placeholder.com/400x400/E3785E/ffffff?text=Tomato+Art'
    })
  };
}

export default function ShopDetail() {
  const { shopName, products } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#FAF9F0] min-h-screen flex flex-col">
      <Header />

      <div className="w-full h-40 bg-gradient-to-r from-[#DCE2D3] to-[#EAECE1] flex items-center justify-center font-serif text-gray-500">
        Artist Branding Space
      </div>

      <main className="max-w-7xl mx-auto w-full p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#4B6B40]">{shopName}</h1>
          <p className="text-sm text-gray-500 mt-1">Creative Works Showcase & Marketplace Inventory</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {products.map((product, i) => (
            <Link to={`/products/${product.id}`} key={i} className="bg-[#FFFCEB] rounded-2xl overflow-hidden border border-[#EBECE1] shadow-sm hover:shadow-md transition">
              <div className="aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                  <span className="text-xs text-gray-400">Artwork / Goods</span>
                </div>
                <span className="text-xs font-bold bg-[#E6ECDC] text-[#4B6B40] px-2 py-1 rounded">Php {product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
