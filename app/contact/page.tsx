import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faArrowUpRightFromSquare,
  faClock,
  faLocationDot,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { EnquiryForm } from '@/components/enquiry-form';
import { ScenicImage } from '@/components/sections';
import { whatsappUrl } from '@/lib/packages';

export const metadata: Metadata = {
  title: 'Contact HimalayaHikes | Plan Your Himalayan Adventure',
  description:
    'Get in touch with HimalayaHikes to plan your next Himalayan trek, mountain getaway or customized holiday package. Contact our team for travel assistance and bookings.'
};

export default function Contact() {
  return (
    <>
      {/* ── HERO BANNER ── */}
      <section className="page-banner contact-banner">
        <ScenicImage imageKey="harshil" priority />
        <div className="banner-shade" />
        <div className="wrap">
          <span className="eyebrow light">EVERY ADVENTURE STARTS WITH HELLO</span>
          <h1>
            Where do you
            <br />
            want to go?
          </h1>
          <p>Big plans or a little spark of an idea — we're listening.</p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="section contact-page-section">
        <div className="wrap contact-grid">

          {/* LEFT — info panel */}
          <div className="contact-info-panel">
            <span className="eyebrow">LET'S TALK TRAVEL</span>
            <h2>
              A message away
              <br />
              from your next escape.
            </h2>
            <p className="contact-lead">
              Have a question about a destination, itinerary, or custom dates?
              Start an immediate conversation with HimalayaHikes on WhatsApp.
            </p>

            {/* Primary WhatsApp CTA */}
            <a
              className="contact-method"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-method-icon">
                <FontAwesomeIcon icon={faWhatsapp} size="xl" />
              </span>
              <span className="contact-method-body">
                <small>WHATSAPP US DIRECTLY</small>
                <strong>+91 93540 97831</strong>
              </span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="contact-method-arrow" />
            </a>

            {/* Info cards */}
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <span className="contact-info-icon">
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <div>
                  <strong>Response Time</strong>
                  <p>Usually within 30 minutes on WhatsApp</p>
                </div>
              </div>
              <div className="contact-info-card">
                <span className="contact-info-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <div>
                  <strong>We Operate From</strong>
                  <p>Himachal Pradesh &amp; Uttarakhand, India</p>
                </div>
              </div>
              <div className="contact-info-card">
                <span className="contact-info-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div>
                  <strong>Call / WhatsApp</strong>
                  <p>+91 93540 97831</p>
                </div>
              </div>
            </div>

            {/* Tip box */}
            <div className="contact-tip">
              <FontAwesomeIcon icon={faCompass} size="lg" />
              <p>
                Share your preferred destination, approximate dates, and group
                size. We'll send complete itineraries and transparent cost
                breakdowns — instantly.
              </p>
            </div>
          </div>

          {/* RIGHT — enquiry form */}
          <div className="contact-form-panel">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
