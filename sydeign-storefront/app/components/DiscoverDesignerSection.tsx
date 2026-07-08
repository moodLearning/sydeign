import { DesignerCard } from './DesignerCard'
import { Designer } from './DesignerCard'

export function DiscoverDesignerSection() {
  const discoverList = [
    { id: '1',
      name: 'Ariosto Dale Ballero',
      rating: '4.0',
      image: '/des1.png',
      reviewCount: '5'
    }, {
      id: '2',
      name: 'Lymuel Baustista',
      rating: '4.0',
      image: '/des2.png',
      reviewCount: '5'
    }, {
      id: '3',
      name: 'Kathleen Dagus',
      rating: '4.0',
      image: '/des3.png',
      reviewCount: '5'
    }, {
      id: '4',
      name: 'Murdhir Laza',
      rating: '4.0',
      image: '/des4.png',
      reviewCount: '5'
    }
  ];

  return(
    /*<section 
        className="relative h-auto py-20 bg-white overflow-hidden z-10"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }}className="pt-11 pb-8 mb-16 bg-white">*/
    <section className="relative w-screen left-1/2 -translate-x-1/2 py-20 bg-white overflow-hidden z-10 flex flex-col items-center">
      <h2 className="text-4xl font-sans text-center font-bold text-primary mb-8">Discover Designers</h2>
      <input type="text" placeholder="Search..." className="border rounded-lg px-4 py-2 w-full max-w-md mb-8 focus:outline-none focus:ring-2 focus:ring-amber-500 align-center" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-40 items-center pt-16">
        {discoverList.map((designer) => (
            <DesignerCard key={designer.id} designer={designer} />
        ))}
      </div>
    </section>
  )
}


