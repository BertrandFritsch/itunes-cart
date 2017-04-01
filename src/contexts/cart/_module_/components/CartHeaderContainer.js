// @flow

import type { State } from '../flowTypes';
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import actions from '../actions';
import CartHeader from './CartHeader';

// use a memoized selector to re-compute the props only when the items in the cart have changed
const getCartItems = createSelector(
  (state: State) => state.cart.get('cartItems'),
  cartItems => ({
    itemCount: cartItems.count(),
    totalPrice: cartItems.reduce((s, item) => s + item.trackPrice, 0)
  })
);

export default connect(
  (state: State) => getCartItems(state),
  (dispatch: Dispatch<*>) => ({
    onCheckout: () => dispatch(actions.checkoutRequested())
  })
)(CartHeader);
