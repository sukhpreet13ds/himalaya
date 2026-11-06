'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faCompass,
  faEye,
  faCalendarDays,
  faLocationDot,
  faUsers,
  faCheck,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from './cart-context';
import { whatsappUrl } from '@/lib/packages';
import { Reveal } from './ui';

export function PromoBanner() {
  const { openEnquiry } = useCart();

  return (
    <section className="section promo-banner-section">
      <div className="wrap">
        <Reveal className="section-heading heading-row">
          <div>
            <span className="eyebrow">
              <FontAwesomeIcon icon={faCompass} /> SPECIAL EXPEDITION ANNOUNCEMENT
            </span>
            <h2>
              Featured Tour Departure<span className="orange-dot">.</span>
            </h2>
            <p>
              Exclusive upcoming journey curated by HimalayaHikes. Check out the departure details and secure your slot directly on WhatsApp.
            </p>
          </div>
          <a
            href={whatsappUrl('Special Expedition Tour')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <span>Ask Group Availability</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </Reveal>

        <Reveal className="promo-banner-card">
          <div className="promo-banner-image-wrap">
            <a
              href="/images/promo-banner.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="promo-banner-link"
              title="Click to view full size poster"
            >
              <Image
                src="/images/promo-banner.webp"
                alt="HimalayaHikes Featured Tour Departure Banner"
                width={550}
                height={715}
                priority
                className="promo-banner-img"
              />
            </a>
          </div>

          <div className="promo-banner-content">
            <span className="promo-pill">
              <FontAwesomeIcon icon={faCalendarDays} /> UPCOMING FIXED DEPARTURE
            </span>
            <h3>Handcrafted Mountain & Desert Journeys</h3>
            <p className="large-copy">
              Join fellow travelers on our carefully planned group adventures. Every expedition includes verified comfortable stays, experienced trek guides, local sightseeing, and personalized support.
            </p>

            <ul className="promo-highlights-list">
              <li>
                <FontAwesomeIcon icon={faCheck} className="text-orange-500" />
                <span>Verified boutique stays and scenic riverside / alpine camps</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
                <span>Offbeat trails, sunrise ridge viewpoints, and cultural heritage</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} className="text-orange-500" />
                <span>Small friendly groups with dedicated HimalayaHikes trip coordinators</span>
              </li>
            </ul>

            <div className="promo-actions">
              <a
                href={whatsappUrl('Special Expedition Tour')}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-orange promo-cta-btn"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="fa-lg text-green-400" />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href="/images/promo-banner.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-view"
              >
                <FontAwesomeIcon icon={faEye} />
                <span>View Details</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

