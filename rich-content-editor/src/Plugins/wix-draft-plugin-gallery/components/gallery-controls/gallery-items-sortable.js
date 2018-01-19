import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer as sortableContainer, SortableElement as sortableElement, arrayMove } from 'react-sortable-hoc';
import style from './gallery-items-sortable.scss';
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';

import ImageSettings from './image-settings';

const SortableItem = sortableElement(({ item, itemIdx, clickAction }) => {
  const imageSize = 100;
  if (item.url.indexOf('/') < 0) {
    item.url = 'media/' + item.url;
  }
  const resizedUrl = getScaleToFillImageURL(item.url, item.metadata.width, item.metadata.height, imageSize, imageSize);
  return (
    <div
      className={item.selected ? style.itemContainerSelected : style.itemContainer}
      onClick={() => clickAction(itemIdx)}
    >
      <img className={style.itemImage} src={resizedUrl} />
    </div>
  );
}
);

const SortableList = sortableContainer(({ items, clickAction }) => {
  return (
    <div>
      {items.map((item, itemIdx) => (
        <SortableItem key={`item-${itemIdx}`} itemIdx={itemIdx} index={itemIdx} item={item} clickAction={clickAction}/>
      ))}
    </div>
  );
});

const TopBarMenu = ({ items, setAllItemsValue, deleteSelectedItems, toggleImageSettings }) => {
  const hasSelectedItems = items.some(item => item.selected);
  const hasUnselectedItems = items.some(item => !item.selected);
  const selectedItems = items.filter(item => item.selected);

  return (
    <div className={style.topBar}>
      {hasUnselectedItems ? <a className={style.topBarLink} onClick={() => setAllItemsValue('selected', true)}>Select All</a> : null}
      {hasSelectedItems ? <a className={style.topBarLink} onClick={() => setAllItemsValue('selected', false)}>Deselect All</a> : null}
      {hasSelectedItems ? <a className={style.topBarLink} onClick={() => deleteSelectedItems()}>Delete Selected</a> : null}
      {(selectedItems.length === 1) ? <a className={style.topBarLink} onClick={() => toggleImageSettings()}>Item Settings</a> : null}
    </div>
  );
};

TopBarMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setAllItemsValue: PropTypes.func,
  deleteSelectedItems: PropTypes.func,
  toggleImageSettings: PropTypes.func.isRequired,
};

export class SortableComponent extends Component {

  state = this.propsToState(this.props);

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    }, () => {
      this.props.onItemsChange(this.state.items);
    });
  };

  componentDidMount() {
    this.props.items.forEach(i => i.selected = false);
  }

  clickAction = itemIdx => {
    const { items } = this.state;
    const item = items[itemIdx];
    item.selected = !item.selected;
    const selectedItems = items.filter(i => i.selected);
    this.setState({
      items,
      editedImage: selectedItems.length ? selectedItems[0] : null
    });
  }

  setAllItemsValue(field, val) {
    const { items } = this.state;
    items.map(item => {
      item[field] = val;
      return item;
    });
    this.setState({
      items
    });
  }

  toggleImageSettings = visible => this.setState({ imageSettingsVisible: visible });

  deleteSelectedItems() {
    const { items } = this.state;
    this.setState({
      items: items.filter(item => !item.selected)
    }, () => {
      this.props.onItemsChange(this.state.items);
    });
  }

  propsToState(props) {
    return {
      items: props.items
    };
  }

  componentWillReceiveProps(props) {
    this.setState(this.propsToState(props));
  }

  onSaveImageSettings(items) {
    this.props.onItemsChange(items);
    this.toggleImageSettings(false);
  }

  render() {
    return (
      <div>
        <TopBarMenu
          items={this.state.items}
          setAllItemsValue={this.setAllItemsValue.bind(this)}
          deleteSelectedItems={this.deleteSelectedItems.bind(this)}
          toggleImageSettings={() => this.toggleImageSettings(true)}
        />
        <SortableList
          items={this.state.items}
          onSortEnd={this.onSortEnd}
          clickAction={this.clickAction}
          hideSortableGhost={false}
          axis="xy"
          helperClass="sortableHelper"
          transitionDuration={50}
        />
        {this.state.imageSettingsVisible ? <ImageSettings
          images={this.state.items}
          selectedImage={this.state.editedImage}
          onCancel={() => this.toggleImageSettings(false)}
          onSave={items => this.onSaveImageSettings(items)}
        /> : null}
      </div>);
  }
}

SortableComponent.propTypes = {
  onItemsChange: PropTypes.func,
  toggleImageSettings: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
