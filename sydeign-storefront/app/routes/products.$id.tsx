import {useState} from 'react';
import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import { PRODUCT_QUERY } from '../graphql/products';
import { normalizeProduct } from '../data/shopify';
import type { Product, ProductImage } from '../data/shopify';
import Sidebar from '../components/Sidebar';

export async function loader({
  params,
  context,
}: LoaderFunctionArgs) {
  const handle = params.id;

  if (!handle) {
    throw new Response('Product not found', {
      status: 404,
    });
  }

  const {product} = await context.storefront.query(
    PRODUCT_QUERY,
    {
      variables: {
        handle,
      },
    },
  );

  if (!product) {
    throw new Response('Product not found', {
      status: 404,
    });
  }

  return {
    product: normalizeProduct(product),
  };
}

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();

  const images = product.images ?? [];

  const thumbnails = images.map((image) => image.url);

  const [selectedImage, setSelectedImage] = useState(
    thumbnails[0] ?? '',
  );

  const [quantity, setQuantity] = useState(1);

  const designerName =
  product.designerName ??
  'Designer Collection';

  const formattedPrice =
  new Intl.NumberFormat(
    'en-PH',
    {
      style:'currency',
      currency: product.currency,
    },
  ).format(product.price);

  return (
    <main className="w-full min-h-screen bg-[#fcfdfa]">
      <div className="mx-auto grid max-w-350 grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[20rem_minmax(0,1fr)] md:px-12 md:items-start">

        <Sidebar
          activeCategory="All Products"
          onFilterChange={() => {}}
          collections={[]}
        />

        <section className="min-w-0 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-100">

            <ProductGallery
              images={product.images}
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

        </section>

      </div>
    </main>
  );
}


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
    <div className="lg:col-span-7 flex gap-4 h-105">

      <div className="flex flex-col items-center justify-between h-full">

        <button
          type="button"
          aria-label="Previous images"
          className="text-gray-400 hover:text-primary"
        >
          <ChevronLeft className="rotate-90 w-4 h-4"/>
        </button>


        <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar max-h-90">

          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() =>
                setSelectedImage(image.url)
              }
              className={`
                w-14 h-14 rounded-xl overflow-hidden border-2
                transition-colors
                ${
                  selectedImage === image.url
                    ? 'border-primary'
                    : 'border-gray-200'
                }
              `}
            >
              <img
                src={image.url}
                alt={image.altText ?? ''}
                className="w-full h-full object-cover"
              />
            </button>
          ))}

        </div>


        <button
          type="button"
          aria-label="Next images"
          className="text-gray-400 hover:text-primary"
        >
          <ChevronRight className="rotate-90 w-4 h-4"/>
        </button>

      </div>


      <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden">

        <img
          src={selectedImage}
          alt="Selected product image"
          className="w-full h-full object-cover"
        />

      </div>

    </div>
  );
}

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
  setQuantity: React.Dispatch<
    React.SetStateAction<number>
  >;
}) {
  return (
    <div className="lg:col-span-5 flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {product.title}
        </h1>


        <span className="text-base font-medium text-primary underline block mb-4">
          {designerName}
        </span>


        <div className="text-2xl font-semibold text-primary mb-3">
          {formattedPrice}
        </div>


        <p className="text-gray-600 text-xs leading-relaxed text-justify mb-6">
          {product.description ||
            'No description specified for this design piece.'}
        </p>

      </div>


      <div className="flex items-center gap-2">

        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden text-xs">

          <button
            type="button"
            onClick={() =>
              setQuantity((q) =>
                Math.max(1, q - 1),
              )
            }
            className="px-3 py-2.5 font-bold"
          >
            -
          </button>


          <span className="px-4 font-semibold">
            {quantity}
          </span>


          <button
            type="button"
            onClick={() =>
              setQuantity((q) => q + 1)
            }
            className="px-3 py-2.5 font-bold"
          >
            +
          </button>

        </div>


        <button
          type="button"
          className="flex-1 bg-primary text-white text-xs font-semibold py-2.5 rounded-xl uppercase tracking-wider"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}