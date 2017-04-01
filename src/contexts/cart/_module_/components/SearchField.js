// @flow

import React from 'react';

type Props = {

  /**
   * Notify the user wants to submit the search string
   */
  onSubmitSearchText: (searchText: string) => void
};

/**
 * CartHeader Component
 *
 * Use a pure component -- it doesn't re-render if neither its props or state have changed
 *
 * The search text is hold by the underlying input element
 */
export default class SearchField extends React.PureComponent<void, Props, void> {
  props: Props;

  /**
   * most recently entered search text, to avoid dispatching unchanged search text
   */
  searchText: string;

  handleChange = (newSearchText: string) => {
    if (this.searchText !== newSearchText) {
      this.props.onSubmitSearchText(this.searchText = newSearchText);
    }
  };

  render() {
    return (
      <input
          type="text"
          placeholder="Search a track..."
          onChange={ e => this.handleChange(e.target.value) }
      />
    );
  }
}
