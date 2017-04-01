import React from 'react';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import SearchTableContainer from './SearchTableContainer';

describe('SearchTableContainer', () => {
  let store;

  beforeEach(() => {
    const state = {
      cart: Map({
        loadedItems: [
          {
            trackId: '1',
            trackName: 'track1',
            artistName: 'artist1',
            artworkUrl60: 'http://...',
            isInCart: false
          },
          {
            trackId: '2',
            trackName: 'track2',
            artistName: 'artist2',
            artworkUrl60: 'http://...',
            isInCart: true
          }
        ],
        cartItems: Map()
      })
    };
    store = ({
      default: () => {
      },
      subscribe: () => {
      },
      dispatch: jest.fn(),
      getState: () => state
    });
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={ store }>
        <SearchTableContainer />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
