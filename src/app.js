// @flow

import React from 'react';
import { Provider } from 'react-redux';

import store from './createStore';

import cart from './contexts/cart';

// The UI structure
export default () =>
  <Provider store={ store }>
    <div className="main-container">
      <nav>
        <span className="itunes-cart-logo">iTunes Cart App</span>
        <cart.components.CartHeader />
      </nav>
      <section className="search-section">
        <cart.components.SearchTable />
      </section>
    </div>
  </Provider>;
