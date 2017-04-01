// @flow

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SearchField from './SearchField';
import type { Item } from '../flowTypes';

type Props = {
  /**
   * The list of items
   */
    items: Array<Item>,

  /**
   * Notify the user wants add/remove it to/from the cart
   */
    onToggleInCart: (item: Item) => void,

  /**
   * Notify the user wants to submit the search string
   */
    onSubmitSearchText: (searchText: string) => void
};

/**
 * CartHeader Component
 *
 * Use a pure component -- it doesn't re-render if neither its props or state has changed
 */
export default class SearchTable extends React.PureComponent<void, Props, void> {
  props: Props;

  /**
   * Use static functions to format custom cells
   */

  static artworkFormatter(cell) {
    return <img src={ cell }/>;
  }

  inCartFormatter = (cell: string, row: any, extra: any, rowIdx: number) => {
    return <input type="checkbox" checked={ cell } onChange={ () => this.props.onToggleInCart(this.props.items[rowIdx]) } />;
  };

  render() {
    return (
      <div className="search-table">
        <div className="field-container">
          <SearchField onSubmitSearchText={ this.props.onSubmitSearchText }/>
        </div>
        <div className="table-container">
          <BootstrapTable data={ this.props.items } striped hover>
            <TableHeaderColumn isKey dataField="trackId" hidden/>
            <TableHeaderColumn dataField="artworkUrl60"
                dataFormat={ SearchTable.artworkFormatter }
                headerAlign="center"
                dataAlign="center"
                columnClassName="artworkUrl60-cell"
                width="80px"
            >Track</TableHeaderColumn>
            <TableHeaderColumn dataField="trackName" headerAlign="center">Name</TableHeaderColumn>
            <TableHeaderColumn dataField="artistName" headerAlign="center">Artist</TableHeaderColumn>
            <TableHeaderColumn dataField="isInCart"
                headerAlign="center"
                dataAlign="center"
                columnClassName="checkbox-cell"
                width="60px"
                dataFormat={ this.inCartFormatter }
            >In Cart</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
