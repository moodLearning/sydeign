import React from 'react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from 'react-router';
import {normalizeProduct} from '../data/shopify';
import {HOMEPAGE_QUERY} from '../graphql/home';
import {HeroSection} from '../components/home/HeroSection';
import {ProductCarousel} from '../components/home/ProductCarousel';
import {HomeSection} from '../components/home/HomeSection';
import {DesignerSection} from '../components/designer/DesignerSection';
import {ProductCategoriesSection} from '../components/product/ProductCategories';
import {FaqSection} from '../components/FAQ';
import {getDesignersPage} from '../lib/designers.server';


export async function loader({
    context,
  }:LoaderFunctionArgs){

    const {
      designerOfTheMonth,
    } = await getDesignersPage(
      context.storefront,
    );

    const data =
      await context.storefront.query(
        HOMEPAGE_QUERY,
        {
          variables:{
            count:12,
          },
        },
      );

    const products =
    data.products.nodes.map(normalizeProduct);

    return {
    products:
      (data.products?.nodes ?? [])
        .map(normalizeProduct),

    collections:
      data.collections?.nodes ?? [],

    featuredDesigner:
      designerOfTheMonth ?? null,
  };

}

export default function HomePage(){

  const { products, collections, featuredDesigner } = useLoaderData<typeof loader>();

  return (

    <main>
      <HeroSection />
      <ProductCarousel products={products} />
      <HomeSection>
        <DesignerSection  data={featuredDesigner} />
      </HomeSection>
      <HomeSection alternate className="py-20 shadow-md z-40">
        <ProductCategoriesSection collections={collections} />
      </HomeSection>
      <HomeSection className="shadow-xl py-20 z-40">
        <FaqSection/>
      </HomeSection>
    </main>

  );
}