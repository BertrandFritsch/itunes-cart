// @flow

import sagas from './_module_/sagas';
import reducers from './_module_/reducers';
import CartHeader from './_module_/components/CartHeaderContainer';
import SearchTable from './_module_/components/SearchTableContainer';

export default {

  // public interface of the cart context
  components: {
    CartHeader,
    SearchTable
  },

  // technical exports
  sagas,
  reducers
};
