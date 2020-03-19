import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/items-list-component.scss';

class ItemsListComponent extends Component {
  state = {
    selectedItem: this.props.items[0] || {},
  };

  onSelectionChange(item) {
    this.setState({ selectedItem: item });
    this.props.onSelectionChange(item);
  }

  renderListItem(item) {
    const { id, html } = item;
    return (
      <div
        className={styles.listItemContainer}
        role="button"
        tabIndex="-1"
        onKeyDown={() => {}}
        onClick={() => this.onSelectionChange(item)}
      >
        <div
          style={{
            position: 'relative',
            border: this.state.selectedItem.id === id ? '1px blue solid' : 0,
          }}
        >
          <div className={styles.blocker} />
          {/* eslint-disable-next-line react/no-danger */}
          <div key={id} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    );
  }

  render() {
    return (
      //TODO: make height work with % instead of px
      <div className={styles.wrapper} style={{ maxHeight: '80%' }}>
        {this.props.items.map(item => this.renderListItem(item))}
      </div>
    );
  }
}

ItemsListComponent.propTypes = {
  items: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func,
};

export default ItemsListComponent;
