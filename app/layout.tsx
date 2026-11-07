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
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-K947672W" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());`
          }}
        />
      </head>
      <body>
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
