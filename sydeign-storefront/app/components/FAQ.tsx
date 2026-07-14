import {useState} from 'react';
import {ChevronDown} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Does Sydeign offer international shipping?',
    answer:
      'Yes, Sydeign supports independent artisans globally with fully integrated shipping and tracking metrics directly connected to our partner couriers.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order has shipped, you will receive an email containing a tracking link and a reference number to monitor your shipment in real time.',
  },
  {
    question: 'Is there a physical Sydeign store I can visit?',
    answer:
      'Sydeign currently operates primarily as an online collective showcasing independent creators and pop-up events.',
  },
  {
    question: 'How do I start selling on Sydeign?',
    answer:
      'Independent artisans and creators can apply through our creator portal by submitting their portfolio for review.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    console.log('FAQ clicked:', index);

    setOpenIndex((current) =>
      current === index ? null : index,
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6">
      <h2 className="section-header">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition hover:bg-stone-50"
              >
                <span className="font-semibold text-primary">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`
                    transition-transform
                    duration-300
                    ${isOpen ? 'rotate-180' : ''}
                  `}
                />
              </button>

              <div
                className={`
                  grid
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? 'grid-rows-[1fr]'
                      : 'grid-rows-[0fr]'
                  }
                `}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-stone-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}