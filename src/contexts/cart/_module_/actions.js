// @flow

import actionTypes from './actionTypes';
import type { Item } from './flowTypes';

// redux action builders
export default {
  checkoutRequested: () => ({ type: actionTypes.CART_CHECKOUT_REQUESTED }),
  cartItemToggled: (item: Item) => ({ type: actionTypes.CART_ITEM_TOGGLED, payload: item }),
  searchTextSubmitted: (searchText: string) => ({ type: actionTypes.SEARCHTEXT_CHANGED, payload: searchText })
};
