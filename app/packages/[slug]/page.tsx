import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft,
  faCheck,
  faLocationDot,
  faArrowRight,
  faCompass,
  faEye,
  faClock,
  faArrowUpRightFromSquare,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';
import { packages } from '@/lib/packages';
import { photos } from '@/lib/photos';
import { ScenicImage, PackageCard, Adventure } from '@/components/sections';
import { Reveal, WhatsAppButton } from '@/components/ui';

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

const packageMetadataMap: Record<string, { title: string; description: string }> = {
  'chopta-tungnath': {
    title: 'Chopta Tungnath Trek Package | 3N/4D Himalayan Tour – HimalayaHikes',
    description:
      'Explore the Chopta Tungnath trek with HimalayaHikes. Discover Tungnath Temple, Chandrashila Peak and Deoria Tal with an exciting Himalayan trekking package.'
  },
  'manali-kasol': {
    title: 'Manali Kasol Tour Package 3N/4D | HimalayaHikes',
    description:
      'Explore Manali, Solang Valley, Sissu and Kasol with our 3N/4D Himachal tour package. Enjoy mountain views, sightseeing, bonfires and memorable experiences.'
  },
  'udaipur-mount-abu-kumbhalgarh': {
    title: 'Udaipur Mount Abu Tour Package | 2N/3D – HimalayaHikes',
    description:
      'Explore Udaipur and Mount Abu with HimalayaHikes. Enjoy a memorable Rajasthan tour covering City Palace, Lake Pichola, Nakki Lake and Dilwara Jain Temples.'
  },
  'hampta-pass': {
    title: 'Hampta Pass Trek with Chandratal 4N/5D | HimalayaHikes',
    description:
      'Experience the Hampta Pass Trek with Chandratal Lake in 4N/5D. Explore stunning Himalayan valleys, high-altitude camps and mountain landscapes with HimalayaHikes.'
  },
  'jibhi-tirthan-valley': {
    title: 'Jibhi Tirthan Valley Tour Package 2N/3D | HimalayaHikes',
    description:
      'Explore Jibhi and Tirthan Valley with HimalayaHikes. Enjoy a 2N/3D Himachal trip covering Jibhi Waterfall, Jalori Pass, Serolsar Lake and scenic mountain trails.'
  },
  'jaisalmer': {
    title: 'Jaisalmer Tour Package | Rajasthan Desert Trip – HimalayaHikes',
    description:
      'Jaisalmer tour package, Jaisalmer desert safari, Rajasthan tour packages, Jaisalmer desert camp, Sam Sand Dunes, Jaisalmer sightseeing, camel safari Jaisalmer, Jaisalmer fort, Rajasthan desert tour, HimalayaHikes.'
  },
  'chakrata': {
    title: 'Chakrata Tour Package | Uttarakhand Holiday Packages – HimalayaHikes',
    description:
      'Explore Chakrata with HimalayaHikes. Discover beautiful waterfalls, mountain views, scenic landscapes and peaceful hill stations with an exciting Uttarakhand tour package.'
  },
  'mcleodganj': {
    title: 'McLeodganj Tour Package | Dharamshala Trip – HimalayaHikes',
    description:
      'Explore McLeodganj and Dharamshala with HimalayaHikes. Discover Bhagsu Waterfall, Triund, Dalai Lama Temple and scenic Himalayan landscapes with an exciting Himachal tour package.'
  },
  'harshil-valley': {
    title: 'Harshil Valley Tour Package | Uttarakhand Trip – HimalayaHikes',
    description:
      'Explore the beautiful Harshil Valley with HimalayaHikes. Discover scenic Himalayan landscapes, riverside villages, mountain views and peaceful nature escapes in Uttarakhand.'
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = packages.find((p) => p.slug === slug);
  const custom = packageMetadataMap[slug];

  return {
    title: custom?.title || (p?.name ? `${p.name} | HimalayaHikes` : 'Package'),
    description: custom?.description || p?.tagline || ''
  };
}

export default async function PackageDetails({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = packages.find((p) => p.slug === slug);
  if (!p) notFound();

  const hasBrochures = p.brochures && p.brochures.length > 0;

  return (
    <>
      <section className="detail-banner">
        <ScenicImage imageKey={p.imageKey} priority />
        <div className="banner-shade" />
        <div className="wrap">
          <Link href="/packages/" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> All Packages
          </Link>
          <span className="eyebrow light">{p.category}</span>
          <h1>{p.name}</h1>
          <div className="banner-meta-bar">
            <span>
              <FontAwesomeIcon icon={faLocationDot} /> {p.region}
            </span>
            {p.duration && (
              <span>
                <FontAwesomeIcon icon={faClock} /> {p.duration}
              </span>
            )}
            {hasBrochures && (
              <span className="banner-pdf-badge">
                <FontAwesomeIcon icon={faEye} /> Detailed Itinerary Available
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="wrap detail-layout">
        <article>
          {/* Intro Section */}
          <Reveal className="detail-intro">
            <span className="eyebrow">YOUR NEXT CHAPTER</span>
            <h2>{p.tagline}</h2>
            <p className="large-copy">{p.overview}</p>
          </Reveal>

          {/* Tour Itinerary Card (if available) */}
          {hasBrochures && (
            <section className="pdf-brochure-card">
              <div className="pdf-icon-box">
                <FontAwesomeIcon icon={faEye} size="2xl" />
              </div>
              <div className="pdf-info">
                <span className="pdf-kicker">OFFICIAL TOUR ITINERARY</span>
                <h3>View Complete Tour Itinerary</h3>
                <p>
                  Review the day-by-day plan, hotel details, inclusions, exclusions, route map, and travel tips.
                </p>
                <div className="pdf-button-group">
                  {p.brochures?.map((b) => (
                    <a
                      key={b.file}
                      href={b.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-orange pdf-download-btn"
                    >
                      <FontAwesomeIcon icon={faEye} />
                      <span>View {b.title}</span>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Highlights */}
          <section className="detail-section">
            <span className="eyebrow">THE THINGS YOU'LL REMEMBER</span>
            <h2>Trip Highlights</h2>
            <p className="muted">
              A preview of what awaits. Every journey is customized to your preferred pace, dates, and group size.
            </p>
            <ul className="highlights">
              {p.highlights.map((h) => (
                <li key={h}>
                  <span>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Photo Gallery */}
          <section className="detail-section">
            <span className="eyebrow">A CLOSER LOOK</span>
            <h2>Picture Yourself Here.</h2>
            <div className="detail-gallery">
              {photos[p.imageKey].map((img, i) => (
                <a
                  key={img.src}
                  href={img.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${img.alt}`}
                  className={i === 0 ? 'gallery-wide' : ''}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 60vw"
                    className="scenic-image"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Planning Note */}
          <section className="planning-note">
            <FontAwesomeIcon icon={faCompass} size="2xl" />
            <div>
              <h3>A Journey Planned Around You.</h3>
              <p>
                Connect with our mountain travel experts on WhatsApp for the exact dates, custom pick-ups, current pricing, and group discounts for {p.name}.
              </p>
              <WhatsAppButton
                destination={p.name}
                customText={`Hello HimalayaHikes, I would like to request detailed pricing and dates for ${p.name}.`}
              >
                Request Trip Details
              </WhatsAppButton>
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="booking-sidebar">
          <span className="eyebrow">READY TO TRAVEL?</span>
          <h3>
            The mountains can wait.
            <br />
            Your plans don't have to.
          </h3>
          <p>
            Share your preferred dates, group size, and travel style. We will share the full itinerary and booking confirmation immediately.
          </p>

          <div className="sidebar-buttons">
            {/* Primary WhatsApp Action */}
            <WhatsAppButton
              destination={p.name}
              customText={`Hello HimalayaHikes, I want to book/enquire about ${p.name}. Please guide me with availability.`}
              className="w-full justify-center"
            >
              Book on WhatsApp
            </WhatsAppButton>

            {/* Direct Itinerary View if available */}
            {hasBrochures && p.brochures && (
              <div className="sidebar-pdf-links">
                {p.brochures.map((b) => (
                  <a
                    key={b.file}
                    href={b.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-pdf-btn"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-orange-500" />
                    <span>View {b.title.split(' ')[0]} Itinerary</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs ml-auto" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="sidebar-line" />

          <div className="sidebar-features">
            <div className="sidebar-feat-item">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Region: {p.region}</span>
            </div>
            {p.duration && (
              <div className="sidebar-feat-item">
                <FontAwesomeIcon icon={faClock} />
                <span>Duration: {p.duration}</span>
              </div>
            )}
            <div className="sidebar-feat-item">
              <FontAwesomeIcon icon={faShieldHalved} />
              <span>Verified Local Guides & Safe Stays</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Packages */}
      <section className="section related">
        <div className="wrap">
          <div className="section-heading heading-row">
            <div>
              <span className="eyebrow">KEEP EXPLORING</span>
              <h2>More Places to Fall in Love With.</h2>
            </div>
            <Link className="text-link" href="/packages/">
              All Packages <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          <div className="package-grid">
            {packages
              .filter((x) => x.slug !== p.slug)
              .sort(
                (a, b) =>
                  Number(b.category === p.category) - Number(a.category === p.category)
              )
              .slice(0, 3)
              .map((x) => (
                <PackageCard item={x} key={x.slug} />
              ))}
          </div>
        </div>
      </section>

      <Adventure />
    </>
  );
}
