import React, { useState } from 'react';

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Does Sydeign offer international shipping?',
      answer: 'Yes, Sydeign supports independent artisans globally with fully integrated shipping and tracking metrics directly connected to our partner couriers.',
    },
    {
      question: 'How to track my order?',
      answer: 'Once your order has shipped, you will receive an email containing a tracking link and a reference number to monitor your shipment in real time.',
    },
    {
      question: 'Is there a physical Sydeign store I can visit?',
      answer: 'Sydeign currently operates primarily as an online collective, showcasing independent creators and pop-up events. Subscribe to our newsletter for announcements regarding physical retail locations.',
    },
    {
      question: 'How to start selling products in Sydeign?',
      answer: 'If you are an independent artisan or creator, you can apply to become a partner merchant by navigating to our creator portal and submitting your portfolio.',
    },
  ];

  return (
    <div className="isolation-isolate relative">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 bg-transparent overflow-hidden relative">
            <button 
              type="button"
              onClick={() => {
                setOpenFaq(openFaq === index ? null : index);
                console.log("clicked FAQ item:", index);
              }}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-emerald-950 bg-white hover:bg-gray-50 transition cursor-pointer relative z-50"
            >
              <span className="text-sm font-medium">{faq.question}</span>
              <span className={`text-gray-400 text-xs transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {/* Height-based reliable reveal transition */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                openFaq === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-5 pt-1 text-gray-600">
                {faq.answer}
              </div>
            </div>          
          </div>
        ))}
      </div>
    </div>
  );
}  
