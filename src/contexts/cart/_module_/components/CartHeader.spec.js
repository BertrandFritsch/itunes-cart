import React from 'react';
import renderer from 'react-test-renderer';
import CartHeader from './CartHeader';

describe('CartHeader', () => {
  it('should render correctly', () => {
    const props = {
      itemCount: 0,
      totalPrice: 0,
      onCheckout: () => {}
    };

    const component = renderer.create(
      <CartHeader { ...props } />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render correctly also with a non-empty cart', () => {
    const props = {
      itemCount: 2,
      totalPrice: 1.98,
      onCheckout: () => {}
    };

    const component = renderer.create(
      <CartHeader { ...props } />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should dispatch the checkout event', () => {
    const props = {
      itemCount: 2,
      totalPrice: 1.98,
      onCheckout: jest.fn()
    };

    const component = mount(
      <CartHeader { ...props } />
    );

    component.find('button').simulate('click', { target: { } });
    expect(props.onCheckout).toBeCalledWith();

  });
});
