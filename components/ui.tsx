'use client';

import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faXmark,
  faCartShopping,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { whatsappUrl } from '@/lib/packages';
import { useCart } from './cart-context';

export function WhatsAppIcon({ className = '' }: { className?: string }) {
  return <FontAwesomeIcon icon={faWhatsapp} className={className} />;
}

export function Reveal({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { opacity: [0.65, 1], y: [20, 0] }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
}

export function Brand({ isFooter = false }: { isFooter?: boolean }) {
  return (
    <span className={`brand-wrapper ${isFooter ? 'brand-footer' : ''}`}>
      <span className="brand-logo-container">
        <Image
          src="/logo.png"
          alt="HimalayaHikes Logo"
          width={52}
          height={52}
          className="brand-logo-img"
          priority
        />
      </span>
      <span className="brand-text">
        <span className="brand-title">
          Himalaya<span className="brand-accent">Hikes</span>
        </span>
        <small className="brand-sub">GO BEYOND THE ORDINARY</small>
      </span>
    </span>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLButtonElement>(null);
  const { cartCount, openCart, openEnquiry } = useCart();

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape key closes menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link href="/" aria-label="HimalayaHikes Home">
          <Brand />
        </Link>

        {/* Desktop Navigation - All Package option removed from menu as requested */}
        <nav aria-label="Main navigation" className="desktop-nav">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link href="/about/" className={pathname.startsWith('/about') ? 'active' : ''}>
            About Us
          </Link>
          <Link
            href="/contact/"
            className={pathname.startsWith('/contact') ? 'active' : ''}
          >
            Contact Us
          </Link>

          {/* Cart Trigger in Navbar */}
          <button
            type="button"
            className="nav-cart-trigger"
            onClick={openCart}
            aria-label={`Open Trip Cart with ${cartCount} items`}
          >
            <FontAwesomeIcon icon={faCartShopping} className="cart-nav-icon" />
            <span>Trip Cart</span>
            {cartCount > 0 && <span className="cart-badge-nav">{cartCount}</span>}
          </button>
        </nav>

        {/* Header Action Button (Plan a Trip - Opens Enquiry Modal) */}
        <button
          type="button"
          className="button button-orange header-cta"
          onClick={() => openEnquiry()}
          aria-label="Plan a Trip"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="fa-lg" />
          <span>Plan a Trip</span>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="header-cta-icon" />
        </button>

        {/* Mobile Toggle Button */}
        <button
          ref={menuRef}
          type="button"
          className="menu-button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} size="xl" />
        </button>
      </div>

      {/* Mobile Menu - All Package option removed from menu as requested */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/about/" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
            <Link href="/contact/" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>

            {/* Mobile Cart Trigger */}
            <button
              type="button"
              className="mobile-cart-btn"
              onClick={() => {
                setMobileOpen(false);
                openCart();
              }}
            >
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCartShopping} />
                <span>Trip Cart</span>
              </span>
              <span className="cart-badge-mobile">{cartCount}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openEnquiry();
              }}
              className="button button-orange mobile-cta"
              aria-label="Plan a Trip"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="fa-lg" />
              <span>Plan a Trip</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function WhatsAppButton({
  destination,
  customText,
  children = 'Chat on WhatsApp',
  className = ''
}: {
  destination?: string;
  customText?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(destination, customText)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button button-orange ${className}`}
      aria-label={typeof children === 'string' ? children : 'Chat on WhatsApp'}
    >
      <FontAwesomeIcon icon={faWhatsapp} className="fa-lg" />
      <span>{children}</span>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with HimalayaHikes on WhatsApp (+91 93540 97831)"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>
  );
}
