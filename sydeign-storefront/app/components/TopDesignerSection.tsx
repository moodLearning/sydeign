import { DesignerCard } from './DesignerCard'
import { Designer } from './DesignerCard'

export function TopDesignerSection() {
  const topRated = [
    { id: '1', name: 'Nida Bacaling', rating: '5.0', image: '/des1.png', reviewCount: '5' },
    { id: '2', name: 'Nelia Adinale', rating: '4.0', image: '/des2.png', reviewCount: '5' },
  ];

  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 py-20 bg-background overflow-hidden z-10 flex flex-col items-center"
    >
      <h2 className="text-4xl font-sans text-center font-bold text-primary mb-12">Top Rated</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-40 items-center pt-16">
        {topRated.map((designer) => (
          <DesignerCard key={designer.id} designer={designer} />
        ))}
      </div>
    </section>
  );
}
