import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'wix-rich-content-common';
import styles from '../../statics/styles/items-list-component.scss';
import { getItemsListPlaceholder } from '../icons/itemsListPlaceholder';

class ItemsListComponent extends Component {
  state = {
    selectedItem: this.props.items[0] || {},
  };

  onSelectionChange(item) {
    this.setState({ selectedItem: item });
    this.props.onSelectionChange(item);
  }

  renderListItem(item) {
    return (
      <div
        className={styles.listItemContainer}
        onClick={() => this.onSelectionChange(item)}
      >
        <input
          id={`list-item-radio-${item.id}`}
          className={styles.radioInput}
          type={'radio'}
          checked={this.state.selectedItem.id === item.id}
        />
        <span className={styles.radioButton} />
        {item.imageUrl ? (
          <img className={styles.listItemImage} src={item.imageUrl} alt={item.title} />
        ) : (
            getItemsListPlaceholder()
          )}

        <div className={styles.actionItemsContainer}>
          <h5>{item.title}</h5>
          <h6>{item.subtitle}</h6>
        </div>
      </div>
    );
  }

  render() {
    return <>{this.props.items.map(item => this.renderListItem(item))}</>;
  }
}

ItemsListComponent.propTypes = {
  items: PropTypes.array.isRequired,
};

ItemsListComponent.contextType = Context.type;

export default ItemsListComponent;
