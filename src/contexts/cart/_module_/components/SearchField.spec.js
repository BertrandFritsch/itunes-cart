import React from 'react';
import SearchField from './SearchField';

describe('SearchField', () => {
  it('should render correctly', () => {
    const props = {
      onSubmitSearchText: () => {}
    };

    const wrapper = mount(
      <SearchField { ...props } />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch the search text', () => {
    const props = {
      onSubmitSearchText: jest.fn()
    };

    const component = mount(
      <SearchField { ...props } />
    );

    component.find('input').simulate('change', { target: { value: 'pattern' } });
    expect(props.onSubmitSearchText).toBeCalledWith('pattern');
  });
});
