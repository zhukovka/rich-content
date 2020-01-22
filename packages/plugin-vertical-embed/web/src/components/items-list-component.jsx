import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'wix-rich-content-common';
import styles from '../../statics/styles/items-list-component.scss';
import { getItemsListPlaceholder } from '../icons/itemsListPlaceholder';

class ItemsListComponent extends Component {
  state = {
    selectedItem: this.props.items[0] || {},
  };

  onSelectionChange() {
    this.props.onSelectionChange(this.state.selectedItem);
  }

  renderListItem(item) {
    return (
      <div
        className={styles.listItemContainer}
        onClick={() => this.setState({ selectedItem: item })}
      >
        <input
          tabIndex="-1"
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
          <h6>{new Date(item.subtitle).toDateString()}</h6>
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
