'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

const heroSlides = [
  { id: 1, src: '/images/slide11.jpeg', alt: 'Himalayan Expedition Trail - HimalayaHikes' },
  { id: 2, src: '/images/slide22.jpeg', alt: 'High Altitude Mountain Panorama - HimalayaHikes' },
  { id: 3, src: '/images/slide33.jpeg', alt: 'Alpine Valley & Rivers - HimalayaHikes' },
  { id: 4, src: '/images/slide44.jpeg', alt: 'Golden Sunset across Himalayan Ranges - HimalayaHikes' }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider-wrapper" aria-hidden="true">
      {/* Preload all slides in background for seamless transitions */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {heroSlides.map((slide) => (
          <Image
            key={slide.id}
            src={slide.src}
            alt="preload"
            width={10}
            height={10}
            priority
          />
        ))}
      </div>

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={heroSlides[current].id}
          initial={{ x: '100%', opacity: 0.92 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '-100%', opacity: 0.92 }}
          transition={{
            x: { type: 'spring', stiffness: 200, damping: 28, mass: 0.8 },
            opacity: { duration: 0.5 }
          }}
          className="hero-slide-item"
        >
          <Image
            src={heroSlides[current].src}
            alt={heroSlides[current].alt}
            fill
            priority
            sizes="100vw"
            className="hero-slide-img"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
