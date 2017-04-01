import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import sagas, { loadItems } from './sagas';
import callAPI from '../../../server/callAPI';
import actionTypes from './actionTypes';

describe('cart sagas', () => {
  it('should start up the sagas', () => {
    const gen = sagas();

    expect(gen.next().value).toEqual([
      takeLatest(actionTypes.SEARCHTEXT_CHANGED, loadItems)
    ]);

    // expect the end of the generator
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });

  describe('loadItems', () => {
    it('should load items', () => {

      const action = {
        type: actionTypes.SEARCHTEXT_CHANGED,
        payload: 'searched pattern'
      };
      const gen = loadItems(action);

      const URI = 'https://itunes.apple.com/search';

      // debounce the call
      expect(gen.next().value).toEqual(call(delay, 200));

      // call the API
      expect(gen.next().value).toEqual(call(callAPI, `${URI}?term=${encodeURIComponent(action.payload)}`));

      const results = [
        {
          trackId: '1',
          trackName: 'track1',
          trackArtist: 'trackArtist',
          artworkUrl60: 'http://...',
          trackPrice: 0.99,
          otherField: 'trackRank'
        }
      ];

      const loadedItems = [
        {
          trackId: results[ 0 ].trackId,
          trackName: results[ 0 ].trackName,
          artistName: results[ 0 ].artistName,
          artworkUrl60: results[ 0 ].artworkUrl60,
          trackPrice: results[ 0 ].trackPrice
        }
      ];

      // dispatch the loaded items
      expect(gen.next({ status: 200, body: { results } }).value).toEqual(put({
        type: actionTypes.ITEMS_LOADED,
        payload: loadedItems
      }));

      // expect the end of the generator
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });

    it('should dispatch errors', () => {

      const action = {
        type: actionTypes.SEARCHTEXT_CHANGED,
        payload: 'searched pattern'
      };
      const gen = loadItems(action);

      const URI = 'https://itunes.apple.com/search';

      // debounce the call
      expect(gen.next().value).toEqual(call(delay, 200));

      // call the API
      expect(gen.next().value).toEqual(call(callAPI, `${URI}?term=${encodeURIComponent(action.payload)}`));

      const error = new Error();

      // dispatch the error
      expect(gen.next({ status: 0, error }).value).toEqual(put({
        type: actionTypes.ITEMS_LOADING_FAILED,
        payload: error
      }));

      // expect the end of the generator
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });
  });

});
