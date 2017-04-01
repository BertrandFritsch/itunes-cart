// @flow

import { Map } from 'immutable';
import actionTypes from './actionTypes';
import type { Item } from './flowTypes';

export type State = Map<string, {
  cartItems: Map<string, Item>,
  loadedItems: Array<Item>
}>;

export type Action = {
  type: string,
  payload: any
}

// initialisation of the state of the cart part of the redux store
// use a immutable map to enable the comparison of its reference to detect a changed state of the map
const initialState = Map({
  cartItems: Map(),   // holds the items in the cart
                      // use an immuable map as the list is updated one item at a time
  loadedItems: []    // holds the items matching the search
                      // use a standard JS array as the list is replaced each time a new set is loaded
});

export default (state: State = initialState, action: Action) => {
  switch (action.type) {

    case actionTypes.ITEMS_LOADED:
      return state.set('loadedItems', action.payload);

    case actionTypes.CART_ITEM_TOGGLED:
      return state.getIn([ 'cartItems', action.payload.trackId ])
        ? state.removeIn([ 'cartItems', action.payload.trackId ])
        : state.setIn([ 'cartItems', action.payload.trackId ], action.payload);

    default:
      return state;
  }
};
