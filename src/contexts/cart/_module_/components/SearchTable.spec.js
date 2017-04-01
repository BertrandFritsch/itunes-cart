import React from 'react';
import SearchTable from './SearchTable';

describe('SearchTable', () => {
  it('should render correctly', () => {
    const props = {
      items: [
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
      onToggleInCart: () => {}
    };

    const wrapper = mount(
      <SearchTable { ...props } />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should add an item to the cart', () => {
    const props = {
      items: [
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
      onToggleInCart: jest.fn()
    };

    const component = mount(
      <SearchTable { ...props } />
    );

    component.find('input').at(1).simulate('change', { target: { checked: true } });
    expect(props.onToggleInCart).toBeCalledWith(props.items[0]);
  });
});
