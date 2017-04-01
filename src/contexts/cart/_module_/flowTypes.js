// @flow

import type { State as CartState } from './reducers';

export type Item = {
  trackId: string,
  trackName: string,
  artistName: string,
  artworkUrl60: string,
  isInCart: ?boolean
};

export type State = {
  cart: CartState
}
