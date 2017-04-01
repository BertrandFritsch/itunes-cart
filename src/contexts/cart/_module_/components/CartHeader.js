// @flow

import React from 'react';

type Props = {
  /**
   * The number of items in the cart
   */
    itemCount: number,

  /**
   * The total price
   */
    totalPrice: number,

  /**
   * Notify the user wants checkout
   */
    onCheckout: () => void
};

/**
 * CartHeader Component
 *
 * Use a pure function
 */
export default function CartHeader(props: Props) {
  return props.itemCount > 0
      ? <div className="cart-item">
          <span className="cart-header-item-count">{`${props.itemCount} item${props.itemCount > 1 ? 's' : ''} - `}</span>
          <span className="cart-header-total-price">{`${Math.round(props.totalPrice * 100) / 100} $`}</span>
          <button className="cart-header-checkout" onClick={ () => props.onCheckout() }>Checkout</button>
        </div>
      : <div className="cart-header">
          <span className="cart-header-empty-place-holder">The cart is empty</span>
        </div>;
}
