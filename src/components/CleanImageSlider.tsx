import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    image: '/src/assets/images/hero_explore_lifestyle_1793622430279.jpg',
    alt: 'Explore Flagship Lifestyle & Gear',
  },
  {
    id: 2,
    image: '/src/assets/images/slider_digital_ai_cloud_1793623790164.jpg',
    alt: 'Digital AI Subscriptions Workspace',
  },
  {
    id: 3,
    image: '/src/assets/images/slider_fashion_lifestyle_1793623790592.jpg',
    alt: 'Premium Fashion & Techwear Showcase',
  },
  {
    id: 4,
    image: '/src/assets/images/slider_smm_growth_analytics_1793623791432.jpg',
    alt: 'Social Media Growth Analytics Terminal',
  },
  {
    id: 5,
    image: '/src/assets/images/slider_telecom_digital_pay_1793623790972.jpg',
    alt: 'Instant Telecom Recharge & Drive Packs',
  },
];

export const CleanImageSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 16:9 Container - No buttons, no text, no captions on top of the image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      {/* Subtle indicator dots below the slider */}
      <div className="flex items-center justify-center gap-2 pt-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIdx
                ? 'w-6 bg-indigo-500'
                : 'w-1.5 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
