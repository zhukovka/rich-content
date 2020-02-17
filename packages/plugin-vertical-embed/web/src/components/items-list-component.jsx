import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { id, title, subtitle, imageUrl } = item;
    return (
      <div
        className={styles.listItemContainer}
        role="button"
        tabIndex="-1"
        onKeyDown={() => {}}
        onClick={() => this.onSelectionChange(item)}
      >
        <input
          id={`list-item-radio-${id}`}
          className={styles.radioInput}
          type={'radio'}
          checked={this.state.selectedItem.id === id}
        />
        <span className={styles.radioButton} />
        {imageUrl ? (
          <img className={styles.listItemImage} src={imageUrl} alt={title} />
        ) : (
          getItemsListPlaceholder()
        )}

        <div className={styles.actionItemsContainer}>
          <h5>{title}</h5>
          <h6>{subtitle}</h6>
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
  onSelectionChange: PropTypes.func,
};

export default ItemsListComponent;
