import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMountain,
  faHeart,
  faUsers,
  faStar,
  faLeaf,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ScenicImage, WhyUs, Adventure } from '@/components/sections';
import { Reveal } from '@/components/ui';
import { whatsappUrl } from '@/lib/packages';

export const metadata: Metadata = {
  title: 'About HimalayaHikes | Our Story, Travel & Trekking Adventures',
  description:
    'Discover HimalayaHikes, your travel partner for Himalayan trekking, mountain adventures and Rajasthan escapes. Explore our values, passion and personalized trip planning.'
};

const stats = [
  { value: '500+', label: 'Happy Travelers' },
  { value: '10+', label: 'Destinations' },
  { value: '5★', label: 'Avg. Rating' },
  { value: '24/7', label: 'WhatsApp Support' },
];

const values = [
  {
    icon: faHeart,
    title: 'Passion for Mountains',
    text: 'Every trail we recommend, we have walked ourselves. Our love for the Himalayas drives every itinerary we craft.',
  },
  {
    icon: faUsers,
    title: 'Group-First Thinking',
    text: 'Whether solo, couple, family, or college gang — we design experiences that work perfectly for your group.',
  },
  {
    icon: faLeaf,
    title: 'Responsible Travel',
    text: 'We care about the communities and ecosystems we visit. Sustainable, low-impact adventure is our standard.',
  },
  {
    icon: faShieldHalved,
    title: 'Transparent & Safe',
    text: 'No hidden costs. Clear itineraries. Safety-first planning with experienced local guides at every step.',
  },
];

export default function About() {
  return (
    <>
      {/* ── HERO BANNER ── */}
      <section className="page-banner">
        <ScenicImage imageKey="hero" priority />
        <div className="banner-shade" />
        <div className="wrap">
          <span className="eyebrow light">MEET HIMALAYAHIKES</span>
          <h1>
            For the journey.
            <br />
            And everything it brings.
          </h1>
          <p>Mountains at heart. Adventure in our soul.</p>
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="section">
        <div className="wrap about-story">
          <Reveal className="about-photo-wrap">
            <div className="about-photo">
              <ScenicImage imageKey="jibhi" />
            </div>
            <div className="about-photo-badge">
              <FontAwesomeIcon icon={faMountain} />
              <span>Himalayan Adventures</span>
            </div>
          </Reveal>

          <Reveal className="about-text">
            <span className="eyebrow">BEYOND THE EVERYDAY</span>
            <h2>
              Some places change
              <br />
              the way you feel.
            </h2>
            <p className="large-copy">
              A quiet valley. A trail that opens to a mountain view. A sunset
              that makes you put your phone away.
            </p>
            <p>
              That's the spirit behind HimalayaHikes. We help you explore
              Himalayan destinations, trekking trails, and Rajasthan escapes,
              with trip planning that starts by listening to you.
            </p>
            <p>
              Whether you're drawn to the riverside pace of Kasol, the
              landscapes of Hampta Pass, or the golden light of Jaisalmer, we're
              here to help you take the next step.
            </p>
            <span className="story-signature">Go beyond the ordinary.</span>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-orange about-wa-btn"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>Chat with Us on WhatsApp</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="about-stats-section">
        <div className="wrap about-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="about-stat-card">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-heading centered">
            <span className="eyebrow">WHAT WE STAND FOR</span>
            <h2>Our Core Values</h2>
            <p>The principles that guide every trip we plan.</p>
          </Reveal>
          <div className="about-values-grid">
            {values.map(({ icon, title, text }) => (
              <Reveal key={title} className="about-value-card">
                <span className="icon-tile">
                  <FontAwesomeIcon icon={icon} className="fa-lg" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <WhyUs />

      {/* ── CTA ── */}
      <Adventure />
    </>
  );
}
