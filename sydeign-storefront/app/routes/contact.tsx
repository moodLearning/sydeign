import React from 'react';

export default function ContactPage() {
  const contactBlocks = [
    { 
      icon: '📞',
      label: 'Phone',
      description: ['(+63 2) - 652 - 5922', '286526922']
    }, 
    {
      icon: '✉️',
      label: 'Email',
      description: ['sydeignshop.com']
    }, 
    {
      icon: '📍',
      label: 'Address',
      description: ['National Engineering Center, University of the Philippines, Diliman, Quezon City, Philippines']
    }
  ];

  return (
    <div 
      style={{ 
        backgroundImage: "url('./contact-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="w-screen min-h-[calc(100vh-370.336px)] font-sans pt-16"
    >     
      <h2 className="text-4xl font-sans text-center font-bold text-primary mt-16 mb-18">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pb-40">
        {contactBlocks.map((block, index) => (
          <div key={index} className="border rounded-2xl p-8 text-center shadow-sm flex flex-col items-center justify-center h-78 bg-white">
            <div className="text-4xl mb-3 text-primary">{block.icon}</div>
            <h2 className="text-2xl uppercase tracking-wider font-bold text-primary mb-2">{block.label}</h2>
            
            {block.description.map((line, i) => (
              <p key={i} className="text-gray-700 text-l font-sans break-keep">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
