import React from 'react';
import { Link } from 'react-router-dom';
import { DesignerSection } from '../components/DesignerSection'
import { TopDesignerSection } from '../components/TopDesignerSection'
import { DiscoverDesignerSection } from '../components/DiscoverDesignerSection'

export default function DesignersIndex() {
  

  return (
    <div className="bg-white text-gray-900 font-sans">
      <section 
        className="shadow-md relative flex items-center justify-center bg-white z-30"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
      >
        <section className="w-full py-20">
          <div className="max-w-7xl mx-auto px-8">          
            <DesignerSection />
          </div>
        </section>
      </section>

      <section 
        className="shadow-md relative flex items-center justify-center bg-white z-20"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
      >
        <TopDesignerSection />
      </section>

      <section 
        className="shadow-xl relative flex items-center justify-center bg-white z-10 pb-20"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
      >
        <DiscoverDesignerSection />
      </section>
    </div>  );
}
