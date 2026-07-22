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
    <div className="discover-section">

      <div className="discover-section-heading-wrap">

        <h2 className="section-subheader text-center">
          Meet The{' '} <span className="text-[#556b57]">Designers</span>
        </h2>

      </div>

      <div className="discover-section-search-wrap">

        <div className="discover-section-search-box">

          <Search
            size={18}
            className="discover-section-search-icon"
          />


          <input

            type="text"

            value={searchQuery}

            onChange={
              handleSearchChange
            }

            placeholder="Search designers..."

            className="discover-section-search-input"

          />

        </div>

      </div>




      <div className="discover-section-list">


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

            <div className="discover-section-empty">

              No matching designers found.

            </div>

          )

        }


      </div>





      {
        totalPages > 1 && (

          <div className="discover-section-pagination">

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

                    className={`discover-section-page-dot ${
                      pageIndex === currentPage
                        ? 'discover-section-page-dot-active'
                        : 'discover-section-page-dot-inactive'
                    }`}

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