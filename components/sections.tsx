'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faLocationDot,
  faMountain,
  faCompass,
  faRoute,
  faComments,
  faEye,
  faArrowUpRightFromSquare,
  faClock,
  faCartShopping,
  faCheck,
  faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import { packages, type Package, whatsappUrl } from '@/lib/packages';
import { photo } from '@/lib/photos';
import { Brand, Reveal, WhatsAppButton } from './ui';
import { useCart } from './cart-context';

export function ScenicImage({
  imageKey,
  index = 0,
  priority = false,
  className = ''
}: {
  imageKey: string;
  index?: number;
  priority?: boolean;
  className?: string;
}) {
  const p = photo(imageKey, index);
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={p.small} />
      <Image
        src={p.src}
        alt={p.alt}
        fill
        priority={priority}
        sizes="100vw"
        className={`scenic-image ${className}`}
      />
    </picture>
  );
}

export function PackageCard({ item }: { item: Package }) {
  const p = photo(item.imageKey);
  const { isInCart, toggleCart, openEnquiry } = useCart();
  const inCart = isInCart(item.slug);

  const pdfFile =
    item.brochures && item.brochures.length > 0
      ? item.brochures[0].file
      : '/brochures/chopta-tungnath.pdf';

  return (
    <Reveal className="package-card">
      {/* Card Photo (Click opens itinerary details) */}
      <a
        href={pdfFile}
        target="_blank"
        rel="noopener noreferrer"
        className="card-photo"
        aria-label={`View ${item.name} details`}
      >
        <Image
          src={p.small}
          alt={p.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
          className="scenic-image"
        />
        <div className="card-top-badges">
          <span className="card-badge">{item.category}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCart(item.slug);
            }}
            className={`card-quick-cart-btn ${inCart ? 'in-cart' : ''}`}
            title={inCart ? 'Remove from Cart' : 'Add to Trip Cart'}
            aria-label={inCart ? `Remove ${item.name} from Cart` : `Add ${item.name} to Cart`}
          >
            <FontAwesomeIcon icon={inCart ? faCheck : faCartShopping} />
            <span>{inCart ? 'In Cart' : '+ Cart'}</span>
          </button>
        </div>
        <span className="photo-pdf-indicator" title="Click to view details">
          <FontAwesomeIcon icon={faEye} />
        </span>
      </a>

      <div className="card-content">
        <div className="card-meta-row">
          <span className="location">
            <FontAwesomeIcon icon={faLocationDot} /> {item.region}
          </span>
          {item.duration && (
            <span className="card-duration">
              <FontAwesomeIcon icon={faClock} /> {item.duration}
            </span>
          )}
        </div>

        <h3 className="card-title">{item.name}</h3>
        <p className="card-tagline">{item.tagline}</p>

        {/* TWO PRIMARY OPTIONS: View Details & WhatsApp + Cart Toggle */}
        <div className="card-actions-wrapper">
          <div className="card-two-options">
            {/* OPTION 1: View Details */}
            <a
              href={pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="card-btn-view-pdf"
              title={`View ${item.name} Details`}
            >
              <FontAwesomeIcon icon={faEye} />
              <span>View Details</span>
            </a>

            {/* OPTION 2: WhatsApp (Direct to WhatsApp with prefilled city name) */}
            <a
              href={whatsappUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="card-btn-whatsapp-direct"
              aria-label={`WhatsApp Enquiry for ${item.name}`}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Add to Trip Cart Toggle Button */}
          <button
            type="button"
            onClick={() => toggleCart(item.slug)}
            className={`card-cart-toggle-bar ${inCart ? 'added' : ''}`}
          >
            <FontAwesomeIcon icon={inCart ? faCheck : faCartShopping} />
            <span>{inCart ? 'Added to Cart (Click to remove)' : '+ Add to Trip Cart'}</span>
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export function WhyUs() {
  const items = [
    {
      Icon: faMountain,
      title: 'Beautiful Destinations',
      text: 'From iconic Himalayan peaks to royal Rajasthani heritage, find a place that truly speaks to you.'
    },
    {
      Icon: faCompass,
      title: 'Memorable Adventures',
      text: 'Make room for pristine trails, authentic local discoveries, and mountain moments that stay with you forever.'
    },
    {
      Icon: faRoute,
      title: 'Personalized Trip Planning',
      text: "Share your travel vision, group size, and dates. We'll craft a complete, customized itinerary around you."
    },
    {
      Icon: faComments,
      title: 'Instant WhatsApp Enquiries',
      text: 'A quick WhatsApp message is all it takes to receive full itineraries, transparent pricing, and booking help.'
    }
  ];

  return (
    <section className="why-section section">
      <div className="wrap">
        <Reveal className="section-heading centered">
          <span className="eyebrow">THE HIMALAYAHIKES WAY</span>
          <h2>A Little More Than a Holiday.</h2>
          <p>Carefully planned trails. Unforgettable stays. Journeys crafted with care.</p>
        </Reveal>
        <div className="why-grid">
          {items.map(({ Icon, title, text }, i) => (
            <Reveal className="why-card" key={title}>
              <span className="why-number">0{i + 1}</span>
              <span className="icon-tile">
                <FontAwesomeIcon icon={Icon} className="fa-lg" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Adventure() {
  const { openEnquiry } = useCart();

  return (
    <section className="adventure">
      <ScenicImage imageKey="hero" />
      <div className="adventure-shade" />
      <Reveal className="adventure-content">
        <span className="eyebrow light">LESS SCROLLING. MORE EXPLORING.</span>
        <h2>
          Your Next Adventure
          <br />
          Starts Here
        </h2>
        <p>
          Tell us where you dream of going.
          <br className="mobile-only" /> Let us plan your perfect Himalayan or desert escape.
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-orange"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="fa-lg mr-2" />
          <span>Chat on WhatsApp</span>
        </a>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const { openEnquiry } = useCart();

  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href="/">
            <Brand isFooter />
          </Link>
          <p>
            For the love of towering mountains,
            <br />
            golden desert dunes, and every trail beyond.
          </p>
          <span className="footer-note">Your next story begins with a single step.</span>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about/">About Us</Link>
          <Link href="/contact/">Contact Us</Link>
          <button
            type="button"
            onClick={() => openEnquiry()}
            className="footer-plan-link"
          >
            Custom Trip Planner
          </button>
        </div>

        <div className="footer-destinations">
          <h3>Popular Destinations</h3>
          {packages.map((p) => {
            const pdfFile =
              p.brochures && p.brochures.length > 0
                ? p.brochures[0].file
                : '/brochures/chopta-tungnath.pdf';
            return (
              <a
                key={p.slug}
                href={pdfFile}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-pkg-link"
              >
                <span>{p.name}</span>
                <span className="footer-pdf-tag">
                  <FontAwesomeIcon icon={faEye} /> View Details
                </span>
              </a>
            );
          })}
        </div>

        <div>
          <h3>Let's Talk Travel</h3>
          <p>
            Have a destination or custom dates in mind?
            <br />
            We are just a WhatsApp message away.
          </p>
          <a
            className="footer-contact"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="fa-lg text-green-400" />
            <span>+91 93540 97831</span>
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-wa-cta"
          >
            <span>Chat with us on WhatsApp</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>&copy; {new Date().getFullYear()} HimalayaHikes. All rights reserved.</span>
        <Link href="/photo-credits/">Photography credits</Link>
        <span>Crafted for the wandering soul.</span>
      </div>
    </footer>
  );
}
