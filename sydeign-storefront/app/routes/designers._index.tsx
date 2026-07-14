import { type LoaderFunctionArgs, useLoaderData } from 'react-router';
import { MessageSquare } from 'lucide-react';
import { DesignerSection } from '../components/designer/DesignerSection';
import { TopDesignerSection } from '../components/designer/TopDesignerSection';
import { DiscoverDesignerSection } from '../components/designer/DiscoverDesignerSection';
import { getDesignersPage } from '../lib/designers.server';
import { HomeSection } from '../components/home/HomeSection';

export async function loader({ context }: LoaderFunctionArgs) {

  try {
    return await getDesignersPage(
      context.storefront,
    );

  } catch(error) {

    console.error(
      'Designers page error:',
      error,
    );

    return {
      designers: [],
      products: [],
      designerOfTheMonth: null,
      topRatedDesigners: [],
      featuredProduct: null,
    };

  }
}


export default function DesignersIndex() {

  const {
    designers,
    products,
    designerOfTheMonth,
    topRatedDesigners,
    featuredProduct,

  } = useLoaderData<typeof loader>();

  return (

    <main className="min-h-screen relative text-gray-900 font-sans">

      {
        designerOfTheMonth && (
          <HomeSection className="bg-white shadow-xl z-40">
            <DesignerSection
              data={designerOfTheMonth}
              featuredProduct={featuredProduct}
            />
          </HomeSection>
        )
      }

      <HomeSection alternate className="shadow-xl">
        <TopDesignerSection list={topRatedDesigners}/>
      </HomeSection>

      <HomeSection className="relative z-50 pb-24">
        <DiscoverDesignerSection masterList={designers} products={products}/>
      </HomeSection>
      
      <ChatButton />

    </main>

  );
}

function ChatButton(){

  return (

    <div className="fixed bottom-6 right-6 z-50">
      <button type="button" aria-label="Open chat"
        className="
          bg-[#c36a3e]
          hover:bg-[#b05c32]
          text-white
          p-3.5
          rounded-full
          shadow-lg
          transition-transform
          hover:scale-105
        "
      >
        <MessageSquare size={22}/>
      </button>
    </div>

  );

}