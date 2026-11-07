import type { Metadata } from 'next';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowDown,
  faMountain,
  faCompass,
  faLocationDot,
  faArrowUpRightFromSquare,
  faSliders
} from '@fortawesome/free-solid-svg-icons';
import { packages } from '@/lib/packages';
import { photo } from '@/lib/photos';
import { ScenicImage, PackageCard, WhyUs, Adventure } from '@/components/sections';
import { Reveal, WhatsAppButton } from '@/components/ui';
import { MotionSlider } from '@/components/motion-slider';
import { HimaGallerySlider } from '@/components/hima-gallery-slider';
import { PromoBanner } from '@/components/promo-banner';
import { HeroSlider } from '@/components/hero-slider';

export const metadata: Metadata = {
  title: 'HimalayaHikes | Himalayan Trekking & Holiday Packages',
  description:
    'Explore Himalayan trekking adventures and holiday packages with HimalayaHikes. Discover Manali, Kasol, Chopta, Hampta Pass, Jibhi and more. Plan your trip today!'
};

export default function Home() {
  const gallery = [
    { key: 'hampta', label: 'Take the scenic route', sub: 'HAMPTA PASS' },
    { key: 'udaipur', label: 'Chase the golden hour', sub: 'UDAIPUR' },
    { key: 'jibhi', label: 'Find a little stillness', sub: 'JIBHI & TIRTHAN' },
    { key: 'jaisalmer', label: 'Beyond the mountains', sub: 'JAISALMER' },
    { key: 'chopta', label: 'A higher perspective', sub: 'CHOPTA & TUNGNATH' }
  ];

  return (
    <>
      {/* Hero Section with Auto Sliding Showcase */}
      <section className="hero">
        <HeroSlider />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <Reveal>
            <span className="hero-kicker">
              <span /> THE MOUNTAINS ARE CALLING
            </span>
            <h1>
              Discover the Beauty
              <br />
              of the <em>Himalayas</em>
            </h1>
            <p>
              Explore breathtaking destinations, unforgettable treks, and
              <br className="desktop-only" /> extraordinary adventures with HimalayaHikes.
            </p>
            <div className="hero-buttons">
              <a className="button button-orange" href="#destinations">
                <span>Explore Destinations</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <WhatsAppButton className="button-glass">Chat on WhatsApp</WhatsAppButton>
            </div>
          </Reveal>

          <div className="hero-bottom">
            <span>
              <FontAwesomeIcon icon={faLocationDot} /> Somewhere you'd rather be.
            </span>
            <a href="#featured-slider">
              SCROLL TO EXPLORE <FontAwesomeIcon icon={faArrowDown} />
            </a>
            <span className="hero-coordinate">A LITTLE WILDER. A LITTLE FREER.</span>
          </div>
        </div>
        <div className="hero-side">FIND YOUR NEXT CHAPTER</div>
      </section>

      {/* Journey Highlights Strip */}
      <div className="journey-strip">
        <div className="wrap">
          <span>
            <FontAwesomeIcon icon={faMountain} className="fa-lg" /> Mountains & beyond
          </span>
          <i />
          <span>
            <FontAwesomeIcon icon={faCompass} className="fa-lg" /> Handcrafted experiences
          </span>
          <i />
          <span>
            <FontAwesomeIcon icon={faLocationDot} className="fa-lg" /> 10 extraordinary destinations
          </span>
        </div>
      </div>

      {/* Featured Motion Image Slider Section */}
      <section id="featured-slider" className="section-slider">
        <div className="wrap">
          <Reveal className="section-heading heading-row">
            <div>
              <span className="eyebrow">
                <FontAwesomeIcon icon={faSliders} /> FEATURED JOURNEYS SLIDER
              </span>
              <h2>
                Explore in Motion<span className="orange-dot">.</span>
              </h2>
              <p>
                Swipe through our handpicked expeditions with full itineraries and instant WhatsApp booking.
              </p>
            </div>
            <a className="text-link" href="#destinations">
              View All Destinations <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </Reveal>
        </div>

        {/* Interactive Motion Slider */}
        <MotionSlider />
      </section>

      {/* Featured Departure & Expedition Banner */}
      <PromoBanner />

      {/* All Destinations Grid */}
      <section id="destinations" className="section destinations-section">
        <div className="wrap">
          <Reveal className="section-heading heading-row">
            <div>
              <span className="eyebrow">PICK A PLACE. MAKE A MEMORY.</span>
              <h2>
                Explore Our Destinations<span className="orange-dot">.</span>
              </h2>
              <p>
                From misty mountain trails to golden desert skies,
                <br />
                your next adventure is waiting.
              </p>
            </div>
            <a className="text-link" href="#destinations">
              Browse Destinations <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </Reveal>
          <div className="package-grid">
            {packages.map((p) => (
              <PackageCard key={p.slug} item={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyUs />

      {/* Real Himalayan Moments Slider & Pop Preview */}
      <HimaGallerySlider />

      {/* Photo Highlights Gallery */}
      <section className="section gallery-section">
        <div className="wrap">
          <Reveal className="section-heading heading-row">
            <div>
              <span className="eyebrow">MOMENTS THAT MAKE THE JOURNEY</span>
              <h2>
                A world worth stepping into<span className="orange-dot">.</span>
              </h2>
            </div>
            <p>
              Inspiration for
              <br />
              your next journey.
            </p>
          </Reveal>
          <div className="masonry">
            {gallery.map((g, i) => {
              const p = photo(g.key, 1);
              const destination = packages.find((pkg) => pkg.imageKey === g.key);
              const pdfFile =
                destination?.brochures && destination.brochures.length > 0
                  ? destination.brochures[0].file
                  : '/brochures/chopta-tungnath.pdf';

              return (
                <a
                  className={`gallery-tile gallery-${i}`}
                  key={g.key}
                  href={pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`View ${destination?.name || g.sub} PDF Itinerary`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="scenic-image"
                  />
                  <span>
                    <small>{g.sub}</small>
                    <strong>{g.label}</strong>
                  </span>
                  <FontAwesomeIcon icon={faArrowRight} className="gallery-arrow-icon" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Adventure CTA */}
      <Adventure />
    </>
  );
}
