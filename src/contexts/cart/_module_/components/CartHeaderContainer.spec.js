import React from 'react';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import renderer from 'react-test-renderer';
import CartHeaderContainer from './CartHeaderContainer';

describe('CartHeaderContainer', () => {
  let store;

  beforeEach(() => {
    const state = {
      cart: Map({
        cartItems: Map({
          trackId: '1',
          trackName: 'track1',
          trackArtist: 'trackArtist',
          artworkUrl60: 'http://...',
          trackPrice: 0.99
        })
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
    const wrapper = renderer.create(
      <Provider store={ store }>
        <CartHeaderContainer />
      </Provider>
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
