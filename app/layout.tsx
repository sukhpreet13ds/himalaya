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
    default: 'HimalayaHikes - Go Beyond the Ordinary',
    template: '%s | HimalayaHikes'
  },
  description:
    'Discover Himalayan escapes, unforgettable treks, and the magic of Rajasthan. Explore detailed tour itineraries and plan your next adventure with HimalayaHikes.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
