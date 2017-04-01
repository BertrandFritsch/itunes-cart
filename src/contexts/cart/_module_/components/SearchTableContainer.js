// @flow

import type { State } from '../flowTypes';
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import actions from '../actions';
import SearchTable from './SearchTable';

// use a memoized selector to re-compute the props only when the items in the store have changed
const items = createSelector(
  (state: State) => state.cart.get('cartItems'),
  (state: State) => state.cart.get('loadedItems'),
  (cartItems, loadedItems) => ({
    items: loadedItems.map(item => ({ ...item, isInCart: cartItems.get(item.trackId) !== undefined }))
  })
);

export default connect(
  (state: State) => items(state),
  (dispatch: Dispatch<*>) => ({
    onToggleInCart: item => dispatch(actions.cartItemToggled(item)),
    onSubmitSearchText: searchText => dispatch(actions.searchTextSubmitted(searchText))
  }))(SearchTable);
