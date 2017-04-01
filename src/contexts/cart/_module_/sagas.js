// @flow

import type { CallAPIResult } from '../../../server/callAPI';
import type { Effect } from 'redux-saga/effects';

import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import callAPI from '../../../server/callAPI';
import actionTypes from './actionTypes';

const URI = 'https://itunes.apple.com/search';

type LoadItemAction = {
  payload: string
}

export function* loadItems({ payload: searchText }: LoadItemAction): Generator<Array<Effect>, void, CallAPIResult> {
  // debounce by 200ms
  yield call(delay, 200);

  // do the API call
  const callAPIResult = yield call(callAPI, `${URI}?term=${encodeURIComponent(searchText)}`);

  if (callAPIResult.status === 200) {
    const tracks = callAPIResult.body && callAPIResult.body.results
      ? callAPIResult.body.results.map(track => ({
        trackId: track.trackId,
        trackName: track.trackName,
        artistName: track.artistName,
        artworkUrl60: track.artworkUrl60,
        trackPrice: track.trackPrice || 0
      }))
    : [];

    yield put({ type: actionTypes.ITEMS_LOADED, payload: tracks });
  }
  else {
    // the API call failed
    yield put({ type: actionTypes.ITEMS_LOADING_FAILED, payload: callAPIResult.error });
  }
}

/**
 * cart sagas
 */
export default function*(): Generator<Array<Effect>, void, void> {
  yield [
    takeLatest(actionTypes.SEARCHTEXT_CHANGED, loadItems)
  ];
}
