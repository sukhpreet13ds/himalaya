'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faXmark,
  faCartShopping,
  faEye,
  faTrash,
  faLocationDot,
  faClock,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from './cart-context';
import { photo } from '@/lib/photos';
import { whatsappUrl } from '@/lib/packages';

export function CartDrawer() {
  const {
    cartPackages,
    cartCount,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart,
    openEnquiry
  } = useCart();

  const handleEnquireAll = () => {
    closeCart();
    const names = cartPackages.map((p) => p.name).join(', ');
    const msg = `Hello HimalayaHikes, I would like to inquire about the following packages from my Trip Cart: ${names}. Please share the detailed itineraries, pricing, and availability!`;
    window.open(whatsappUrl(undefined, msg), '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="cart-backdrop" onClick={closeCart}>
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Trip Cart Drawer"
          >
            {/* Drawer Header */}
            <div className="cart-header">
              <div className="cart-header-title">
                <FontAwesomeIcon icon={faCartShopping} className="cart-title-icon" />
                <h3>Your Trip Cart</h3>
                <span className="cart-count-pill">{cartCount}</span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="cart-close-btn"
                aria-label="Close cart"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="cart-body">
              {cartPackages.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="cart-empty-icon">
                    <FontAwesomeIcon icon={faCartShopping} size="2xl" />
                  </div>
                  <h4>Your Cart is Empty</h4>
                  <p>
                    Add destinations using the <strong>+ Add to Cart</strong> button on any package.
                    You can then inquire about multiple trips together on WhatsApp with your travel group!
                  </p>
                  <button
                    type="button"
                    className="button button-orange"
                    onClick={closeCart}
                  >
                    <span>Browse Packages</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  <p className="cart-hint">
                    Ready to explore these places? You can review their detailed itineraries below or enquire on WhatsApp with your group members.
                  </p>
                  {cartPackages.map((pkg) => {
                    const p = photo(pkg.imageKey);
                    const pdfFile =
                      pkg.brochures && pkg.brochures.length > 0
                        ? pkg.brochures[0].file
                        : '/brochures/chopta-tungnath.pdf';

                    return (
                      <div key={pkg.slug} className="cart-item-card">
                        <div className="cart-item-thumb">
                          <Image
                            src={p.small}
                            alt={p.alt}
                            fill
                            sizes="90px"
                            className="cart-item-img"
                          />
                        </div>

                        <div className="cart-item-details">
                          <div className="cart-item-top">
                            <h4>{pkg.name}</h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(pkg.slug)}
                              className="cart-remove-btn"
                              title={`Remove ${pkg.name} from cart`}
                              aria-label={`Remove ${pkg.name}`}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>

                          <div className="cart-item-meta">
                            <span>
                              <FontAwesomeIcon icon={faLocationDot} /> {pkg.region}
                            </span>
                            {pkg.duration && (
                              <span>
                                <FontAwesomeIcon icon={faClock} /> {pkg.duration}
                              </span>
                            )}
                          </div>

                          <div className="cart-item-actions">
                            {/* Two Options: WhatsApp single enquiry & View Details */}
                            <a
                              href={pdfFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cart-btn-pdf-view"
                              title="View Details"
                            >
                              <FontAwesomeIcon icon={faEye} />
                              <span>View Details</span>
                            </a>

                            <a
                              href={whatsappUrl(pkg.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cart-btn-wa-single"
                            >
                              <FontAwesomeIcon icon={faWhatsapp} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cartPackages.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-line">
                  <span>Selected Destinations</span>
                  <strong>{cartCount} Package{cartCount > 1 ? 's' : ''}</strong>
                </div>

                <button
                  type="button"
                  onClick={handleEnquireAll}
                  className="button button-orange cart-checkout-btn"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="fa-lg" />
                  <span>Enquire All on WhatsApp ({cartCount})</span>
                </button>

                <div className="cart-footer-actions">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="cart-clear-btn"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="cart-continue-btn"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

