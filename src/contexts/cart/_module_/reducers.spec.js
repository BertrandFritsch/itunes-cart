import { Map } from 'immutable';
import reducers from './reducers';
import actionTypes from './actionTypes';

describe('cart reducers', () => {
  it('should throw an exception for malformed actions', () => {
    expect(reducers).toThrow(TypeError);
  });

  it('should return the provided state for unknown actions', () => {
    const state = Map({});

    expect(reducers(state, { type: 'XXX' }).toJSON()).toEqual({});
  });

  it('should get the default state', () => {
    const initialState = Map({
      cartItems: Map(),
      loadedItems: []
    });

    expect(reducers(undefined, { type: 'XXX' }).toJSON()).toEqual(initialState.toJSON());
  });

  it(`should replace the loaded items on ${actionTypes.ITEMS_LOADED}`, () => {
    const initialState = Map({
      cartItems: Map(),
      loadedItems: [
        {
          trackId: '1',
          trackName: 'track1'
        }
      ]
    });

    const loadedItems = [
      {
        trackId: '2',
        trackName: 'track2'
      },
      {
        trackId: '2',
        trackName: 'track2'
      }
    ];

    const expectedState = initialState.set('loadedItems', loadedItems);

    expect(reducers(initialState, { type: actionTypes.ITEMS_LOADED, payload: loadedItems }).toJSON()).toEqual(expectedState.toJSON());
  });

  it(`should add a new item to the cart on ${actionTypes.CART_ITEM_TOGGLED}`, () => {
    const initialState = Map({
      cartItems: Map(),
      loadedItems: [
        {
          trackId: '1',
          trackName: 'track1'
        }
      ]
    });

    const item = [
      {
        trackId: '2',
        trackName: 'track2'
      }
    ];

    const expectedState = initialState.setIn([ 'cartItems', item.trackId ], item);

    expect(reducers(initialState, { type: actionTypes.CART_ITEM_TOGGLED, payload: item }).toJSON()).toEqual(expectedState.toJSON());
  });

  it(`should remove an existing item from the cart on ${actionTypes.CART_ITEM_TOGGLED}`, () => {
    const initialState = Map({
      cartItems: Map(),
      loadedItems: [
        {
          trackId: '1',
          trackName: 'track1'
        }
      ]
    });

    const item = [
      {
        trackId: '1',
        trackName: 'track1'
      }
    ];

    const state = initialState.setIn([ 'cartItems', item.trackId ], item);
    const expectedState = state.removeIn([ 'cartItems', item.trackId ]);

    expect(reducers(state, { type: actionTypes.CART_ITEM_TOGGLED, payload: item }).toJSON()).toEqual(expectedState.toJSON());
  });
});
