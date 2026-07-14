import React, {useMemo, useState} from 'react';
import {Search} from 'lucide-react';

import {DiscoverDesignerCard} from './DiscoverDesignerCard';

import type {
  Designer,
  Product,
} from '../../data/shopify';

const ITEMS_PER_PAGE = 3;

interface DiscoverDesignerSectionProps {
  masterList: Designer[];
  products: Product[];
}

export function DiscoverDesignerSection({ masterList, products }: DiscoverDesignerSectionProps) {

  const [ searchQuery, setSearchQuery ] = useState('');
  const [ currentPage, setCurrentPage ] = useState(0);

  const filteredList = useMemo(() => {

    const query = searchQuery.toLowerCase();

    return masterList.filter(
      (designer)=>
        designer.name
          .toLowerCase()
          .includes(query),
    );

    }, [ masterList, searchQuery ]
  );
  
  const totalPages = Math.ceil( filteredList.length / ITEMS_PER_PAGE );
  const currentPagedList = filteredList.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) *
      ITEMS_PER_PAGE,
    );
  
  function handleSearchChange( event: React.ChangeEvent<HTMLInputElement> ) {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  }

  function getDesignerProduct(designerId:string) {

    const designerProducts =
      products.filter((product)=>
          product.designerId === designerId,
      );

    if (!designerProducts.length) {
      return undefined;
    }

    /*
      Prefer best sellers collection.
      Fallback to first product.
    */

    return (
      designerProducts.find(
        (product)=>
          product.collections.some(
            (collection)=>
              collection.handle ===
              'best-sellers',
          ),
      )
      ??
      designerProducts[0]
    );
  }

  return (
    <div className="w-full">

      <div className="w-full mb-12">

        <h2 className="section-subheader text-center">
          Meet The{' '} <span className="text-[#556b57]">Designers</span>
        </h2>

      </div>

      <div className="max-w-xl mx-auto mb-16 px-4">

        <div
          className="
            flex
            items-center
            bg-white
            border
            border-stone-300
            rounded-lg
            px-4
            py-2
            shadow-sm
            focus-within:ring-2
            focus-within:ring-[#556b57]/20
          "
        >

          <Search
            size={18}
            className="text-stone-400 mr-2"
          />


          <input

            type="text"

            value={searchQuery}

            onChange={
              handleSearchChange
            }

            placeholder="Search designers..."

            className="
              w-full
              bg-transparent
              text-sm
              focus:outline-none
              text-stone-800
            "

          />

        </div>

      </div>




      <div
        className="
          max-w-4xl
          mx-auto
          px-4
          flex
          flex-col
          gap-10
          min-h-[600px]
        "
      >


        {
          currentPagedList.length > 0

          ?

          currentPagedList.map(
            (designer,index)=> {


              const featuredProduct =
                getDesignerProduct(
                  designer.id,
                );


              return (

                <DiscoverDesignerCard

                  key={
                    designer.id
                  }

                  designer={
                    designer
                  }

                  productImage={
                    featuredProduct?.image ??
                    '/placeholder-product.png'
                  }

                  isAlternate={
                    index % 2 !== 0
                  }

                />

              );

            },
          )


          :

          (

            <div
              className="
                text-center
                py-16
                text-stone-400
                text-sm
                border-2
                border-dashed
                border-stone-200
                rounded-3xl
              "
            >

              No matching designers found.

            </div>

          )

        }


      </div>





      {
        totalPages > 1 && (

          <div
            className="
              absolute
              left-0
              right-0
              bottom-8
              z-[100]
              flex
              justify-center
              items-center
              gap-4
            "
          >

            {
              Array.from({
                length: totalPages,
              }).map(
                (_,pageIndex)=>(

                  <button

                    key={pageIndex}

                    type="button"

                    onClick={()=>
                      setCurrentPage(
                        pageIndex,
                      )
                    }

                    className={`
                      text-2xl
                      transition-all
                      hover:scale-125
                      ${
                        pageIndex === currentPage
                        ? 'text-[#556b57]'
                        : 'text-stone-400'
                      }
                    `}

                  >

                    ✦

                  </button>

                ),
              )
            }

          </div>

        )
      }


    </div>

  );
}