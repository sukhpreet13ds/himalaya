'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faExpand,
  faCamera,
  faMountain
} from '@fortawesome/free-solid-svg-icons';
import { whatsappUrl } from '@/lib/packages';

export type HimaPhoto = {
  id: number;
  src: string;
  title: string;
  tag: string;
};

// All 24 authentic photos from C:\Users\abc\Pictures\hima
const himaPhotos: HimaPhoto[] = [
  { id: 1, src: '/images/hima/hima-1.jpeg', title: 'Alpine Meadow & Himalayan Ridge', tag: 'Chopta & Tungnath' },
  { id: 2, src: '/images/hima/hima-2.jpeg', title: 'Snowline Horizon & Blue Skies', tag: 'Hampta Pass' },
  { id: 3, src: '/images/hima/hima-3.jpeg', title: 'Golden Sunset Across Peaks', tag: 'Dhauladhar Range' },
  { id: 4, src: '/images/hima/hima-4.jpeg', title: 'Pine Forest Walking Trails', tag: 'Kasol & Parvati' },
  { id: 5, src: '/images/hima/hima-5.jpeg', title: 'High Mountain Pass Crossing', tag: 'Manali Heights' },
  { id: 6, src: '/images/hima/hima-6.jpeg', title: 'Traditional Valley Village Life', tag: 'Jibhi & Tirthan' },
  { id: 7, src: '/images/hima/hima-7.jpeg', title: 'Starlit Mountain Camping', tag: 'Wilderness Camps' },
  { id: 8, src: '/images/hima/hima-8.jpeg', title: 'Crystal Mountain Stream', tag: 'Tirthan River' },
  { id: 9, src: '/images/hima/hima-9.jpeg', title: 'Panoramic Ridge Vistas', tag: 'Chandrashila Summit' },
  { id: 10, src: '/images/hima/hima-10.jpeg', title: 'Prayer Flags in the Breeze', tag: 'Mcleodganj & Triund' },
  { id: 11, src: '/images/hima/hima-11.jpeg', title: 'Misty Morning Valley', tag: 'Harshil Valley' },
  { id: 12, src: '/images/hima/hima-12.jpeg', title: 'Deodar Canopy & Trails', tag: 'Chakrata' },
  { id: 13, src: '/images/hima/hima-13.jpeg', title: 'Glacial Streams & Wildflowers', tag: 'Balu Ka Ghera' },
  { id: 14, src: '/images/hima/hima-14.jpeg', title: 'Sunrise Mountain Glow', tag: 'Garhwal Himalayas' },
  { id: 15, src: '/images/hima/hima-15.jpeg', title: 'Riverside Campfire Gathering', tag: 'Evening Vibes' },
  { id: 16, src: '/images/hima/hima-16.jpeg', title: 'Deep Parvati Pine Valley', tag: 'Kheerganga Trek' },
  { id: 17, src: '/images/hima/hima-17.jpeg', title: 'Hidden Waterfall Oasis', tag: 'Tiger Falls' },
  { id: 18, src: '/images/hima/hima-18.jpeg', title: 'Summit Flags & Panoramic Sky', tag: 'High Peaks' },
  { id: 19, src: '/images/hima/hima-19.jpeg', title: 'Peaceful Village Homestay', tag: 'Himachali Warmth' },
  { id: 20, src: '/images/hima/hima-20.jpeg', title: 'Canyon River Crossings', tag: 'Adventure Route' },
  { id: 21, src: '/images/hima/hima-21.jpeg', title: 'Clear Starlit Night Sky', tag: 'Astro Camping' },
  { id: 22, src: '/images/hima/hima-22.jpeg', title: 'Old Manali Apple Orchards', tag: 'Manali Trails' },
  { id: 23, src: '/images/hima/hima-23.jpeg', title: 'Triund Ridge Overlook', tag: 'Dharamshala' },
  { id: 24, src: '/images/hima/hima-24.jpeg', title: 'Trailhead to Adventure', tag: 'HimalayaHikes' }
];

export function HimaGallerySlider() {
  const [startIndex, setStartIndex] = useState(0);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = himaPhotos.length;
  // Items visible in viewport: desktop displays 4, tablet 2, mobile 1
  const visibleCount = 4;
  const maxStart = total - 1;

  const nextSlide = useCallback(() => {
    setStartIndex((prev) => (prev + 1 > maxStart ? 0 : prev + 1));
  }, [maxStart]);

  const prevSlide = useCallback(() => {
    setStartIndex((prev) => (prev - 1 < 0 ? maxStart : prev - 1));
  }, [maxStart]);

  // Autoplay by default (pauses only when full-screen preview is open)
  useEffect(() => {
    if (popupIndex !== null) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [popupIndex, nextSlide]);

  const openPopup = (index: number) => {
    setPopupIndex(index);
  };

  const closePopup = () => {
    setPopupIndex(null);
  };

  const nextPopup = useCallback(() => {
    if (popupIndex === null) return;
    setPopupIndex((popupIndex + 1) % total);
  }, [popupIndex, total]);

  const prevPopup = useCallback(() => {
    if (popupIndex === null) return;
    setPopupIndex((popupIndex - 1 + total) % total);
  }, [popupIndex, total]);

  // Modal keyboard shortcuts
  useEffect(() => {
    if (popupIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
      if (e.key === 'ArrowRight') nextPopup();
      if (e.key === 'ArrowLeft') prevPopup();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [popupIndex, nextPopup, prevPopup]);

  return (
    <section className="section hima-slider-section">
      <div className="wrap">
        <div className="section-heading heading-row">
          <div>
            <span className="eyebrow">
              <FontAwesomeIcon icon={faCamera} /> TRAIL MOMENTS GALLERY & SLIDER
            </span>
            <h2>
              Himalayan Photo Stories<span className="orange-dot">.</span>
            </h2>
            <p>
              Captured directly on our mountain expeditions. Click any image to open full-screen pop preview.
            </p>
          </div>

          <div className="hima-controls-group">
            <div className="hima-slider-arrows">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous photos"
                className="hima-nav-btn"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next photos"
                className="hima-nav-btn"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="hima-carousel-viewport">
          <div
            className="hima-carousel-track"
            style={{
              transform: `translateX(-${startIndex * 300}px)`
            }}
          >
            {himaPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className="hima-card"
                onClick={() => openPopup(idx)}
              >
                <div className="hima-card-inner">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 270px, 320px"
                    className="hima-card-img"
                  />
                  <div className="hima-card-overlay">
                    <span className="hima-zoom-badge">
                      <FontAwesomeIcon icon={faExpand} /> Preview
                    </span>
                    <div className="hima-card-details">
                      <span className="hima-tag">{photo.tag}</span>
                      <h4>{photo.title}</h4>
                      <small>Photo {idx + 1} of {total}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pop Preview (Lightbox Modal) */}
      <AnimatePresence>
        {popupIndex !== null && (
          <motion.div
            className="hima-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closePopup}
          >
            <motion.div
              className="hima-popup-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="hima-popup-close"
                onClick={closePopup}
                aria-label="Close preview"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              {/* Prev / Next Modal Arrows */}
              <button
                type="button"
                className="hima-popup-arrow hima-popup-prev"
                onClick={prevPopup}
                aria-label="Previous photo"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <button
                type="button"
                className="hima-popup-arrow hima-popup-next"
                onClick={nextPopup}
                aria-label="Next photo"
              >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>

              {/* Modal Image Display */}
              <div className="hima-popup-img-wrap">
                <Image
                  src={himaPhotos[popupIndex].src}
                  alt={himaPhotos[popupIndex].title}
                  fill
                  sizes="(max-width: 1024px) 95vw, 1200px"
                  className="hima-popup-image"
                  priority
                />
              </div>

              {/* Modal Details & Action Bar */}
              <div className="hima-popup-footer">
                <div className="hima-popup-info">
                  <span className="hima-popup-badge">
                    <FontAwesomeIcon icon={faMountain} /> {himaPhotos[popupIndex].tag} &bull; Photo {popupIndex + 1} of {total}
                  </span>
                  <h3>{himaPhotos[popupIndex].title}</h3>
                </div>

                <a
                  href={whatsappUrl(
                    himaPhotos[popupIndex].tag,
                    `Hello HimalayaHikes, I saw trail photo #${popupIndex + 1} (${himaPhotos[popupIndex].title} - ${himaPhotos[popupIndex].tag}) on your website. Please tell me which upcoming package covers this location!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-orange hima-popup-btn"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="fa-lg" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

              {/* Modal Thumbnail Strip */}
              <div className="hima-thumb-strip">
                {himaPhotos.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`hima-thumb-btn ${idx === popupIndex ? 'active' : ''}`}
                    onClick={() => setPopupIndex(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={p.src}
                      alt={p.title}
                      width={64}
                      height={48}
                      className="hima-thumb-img"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
