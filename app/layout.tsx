import type { Metadata } from 'next';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Header, FloatingWhatsApp } from '@/components/ui';
import { Footer } from '@/components/sections';
import { CartProvider } from '@/components/cart-context';
import { CartDrawer } from '@/components/cart-drawer';
import { EnquiryModal } from '@/components/enquiry-modal';
import { FloatingCartButton } from '@/components/cart-float';

// Prevent Font Awesome from dynamically adding its CSS since it's imported above
config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: 'HimalayaHikes | Himalayan Trekking & Holiday Packages',
    template: '%s'
  },
  description:
    'Explore Himalayan trekking adventures and holiday packages with HimalayaHikes. Discover Manali, Kasol, Chopta, Hampta Pass, Jibhi and more. Plan your trip today!',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  },
  verification: {
    google: 'kk6wJIEwsaamfl7sBvgyPJvgcQBPaIORSsfwpfWDeA8'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K947672W');`
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K947672W"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingCartButton />
          <FloatingWhatsApp />
          <CartDrawer />
          <EnquiryModal />
        </CartProvider>
      </body>
    </html>
  );
}
