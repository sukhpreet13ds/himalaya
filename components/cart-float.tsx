'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from './cart-context';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingCartButton() {
  const { cartCount, openCart } = useCart();

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.button
          type="button"
          className="floating-cart-btn"
          onClick={openCart}
          aria-label={`Open trip cart with ${cartCount} items`}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="floating-cart-text">Trip Cart</span>
          <span className="floating-cart-badge">{cartCount}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

