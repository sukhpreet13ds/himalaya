'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faEye,
  faLocationDot,
  faClock,
  faCartShopping,
  faCheck,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { packages, whatsappUrl } from '@/lib/packages';
import { photo } from '@/lib/photos';
import { useCart } from './cart-context';

export function MotionSlider() {
  // Select top featured destinations for the slider
  const sliderItems = packages.filter((p) =>
    ['chopta-tungnath', 'manali-kasol', 'udaipur-mount-abu-kumbhalgarh', 'hampta-pass', 'jibhi-tirthan-valley'].includes(
      p.slug
    )
  );

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { isInCart, toggleCart, openEnquiry } = useCart();

  const total = sliderItems.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  // Autoplay functionality: faster interval (3200ms) with no pause/play button as requested
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 3200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const currentPkg = sliderItems[current];
  const pPhoto = photo(currentPkg.imageKey, 0);
  const pdfFile =
    currentPkg.brochures && currentPkg.brochures.length > 0
      ? currentPkg.brochures[0].file
      : '/brochures/chopta-tungnath.pdf';

  const inCart = isInCart(currentPkg.slug);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 1.04
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.45 },
        scale: { duration: 0.65 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: {
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section className="motion-slider-section">
      <div className="slider-container">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentPkg.slug}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="slider-slide"
          >
            <div className="slider-image-wrapper">
              <picture>
                <source media="(max-width: 640px)" srcSet={pPhoto.small} />
                <Image
                  src={pPhoto.src}
                  alt={pPhoto.alt}
                  fill
                  priority
                  className="slider-image"
                  sizes="100vw"
                />
              </picture>
              <div className="slider-overlay" />
            </div>

            <div className="slider-content-wrap wrap">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="slider-meta"
              >
                <span className="slider-badge">{currentPkg.category}</span>
                <span className="slider-location">
                  <FontAwesomeIcon icon={faLocationDot} /> {currentPkg.region}
                </span>
                {currentPkg.duration && (
                  <span className="slider-duration">
                    <FontAwesomeIcon icon={faClock} /> {currentPkg.duration}
                  </span>
                )}
              </motion.div>

              {/* Slider Title - Extra bold & highly visible */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.45 }}
                className="slider-title font-bold-visible"
              >
                {currentPkg.name}
              </motion.h2>

              {/* Slider Tagline - Bold & clear visibility */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="slider-tagline font-bold-visible"
              >
                {currentPkg.tagline}
              </motion.p>

              {/* Two Options: View Details & WhatsApp Enquiry + Add to Cart */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                className="slider-actions"
              >
                {/* Option 1: View Details */}
                <a
                  href={pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-view"
                  title={`View ${currentPkg.name} Details`}
                >
                  <FontAwesomeIcon icon={faEye} />
                  <span>View Details</span>
                </a>

                {/* Option 2: WhatsApp (Direct link to WhatsApp with city pre message) */}
                <a
                  href={whatsappUrl(currentPkg.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-orange whatsapp-slider-btn"
                  aria-label={`WhatsApp Enquiry for ${currentPkg.name}`}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="fa-lg" />
                  <span>WhatsApp Enquiry</span>
                </a>

                {/* Cart Option: Add to Cart */}
                <button
                  type="button"
                  onClick={() => toggleCart(currentPkg.slug)}
                  className={`button ${inCart ? 'button-in-cart' : 'button-glass'}`}
                  aria-label={inCart ? 'Remove from Cart' : 'Add to Cart'}
                >
                  <FontAwesomeIcon icon={inCart ? faCheck : faCartShopping} />
                  <span>{inCart ? 'In Trip Cart' : 'Add to Cart'}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous destination"
          className="slider-arrow slider-arrow-prev"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next destination"
          className="slider-arrow slider-arrow-next"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Slider Controls Bar (Without Pause/Play Button) */}
        <div className="slider-bottom-bar wrap">
          <div className="slider-dots">
            {sliderItems.map((item, idx) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`slider-dot ${idx === current ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}: ${item.name}`}
              >
                <span className="dot-fill" />
                <span className="dot-label">{item.name.split('-')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
