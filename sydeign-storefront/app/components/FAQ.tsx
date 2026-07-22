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
    <section className="faq-section">
      <h2 className="section-header">
        Frequently Asked Questions
      </h2>

      <div className="faq-list">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article
              key={faq.question}
              className="faq-item"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="faq-trigger"
              >
                <span className="faq-question">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`}
                />
              </button>

              <div
                className={`faq-panel ${
                  isOpen
                    ? 'faq-panel-open'
                    : 'faq-panel-closed'
                }`}
              >
                <div className="faq-panel-inner">
                  <p className="faq-answer">
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