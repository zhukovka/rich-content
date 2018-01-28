import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer as sortableContainer, SortableElement as sortableElement, arrayMove } from 'react-sortable-hoc';
import style from './gallery-items-sortable.scss';
import classNames from 'classnames';
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';

import ImageSettings from './image-settings';
import FileInput from '../stylable-base/file-input';

//eslint-disable-next-line no-unused-vars
const EMPTY_SMALL_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const SortableItem = sortableElement(({ item, itemIdx, clickAction, isMock, handleFileChange }) => {
  const imageSize = 100;
  if (isMock) {
    /* eslint-disable max-len */
    return (
      <FileInput className={classNames(style.itemContainer, style.filesItem)} onChange={handleFileChange}>
        <svg className={style.itemImage} xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="-39 -39 100 100">
          <path d="M15,15 C15,15.5522847 14.5522847,16 14,16 L5,16 C4.44771525,16 4,15.5522847 4,15 L4,12.2 C4,12.0895431 4.08954305,12 4.2,12 L4.8,12 C4.91045695,12 5,12.0895431 5,12.2 L5,15 L14,15 L14,12.2 C14,12.0895431 14.0895431,12 14.2,12 L14.8,12 C14.9104569,12 15,12.0895431 15,12.2 L15,15 Z M9.99999338,5.73724106 L9.99999338,12.7998125 C9.99999338,12.9102695 9.91045033,12.9998125 9.79999338,12.9998125 L9.19999338,12.9998125 C9.08953643,12.9998125 8.99999338,12.9102695 8.99999338,12.7998125 L8.99999338,5.74926108 L6.70710016,8.02407651 C6.6289953,8.10218137 6.5023623,8.10218137 6.42425745,8.02407651 L5.99999338,7.59981244 C5.92188852,7.52170758 5.92188852,7.39507459 5.99999338,7.31696973 L9.36593133,3.97310971 C9.40498376,3.93405728 9.45616823,3.91453107 9.50735269,3.91453107 C9.55853715,3.91453107 9.60972162,3.93405728 9.64877405,3.97310971 L12.9999934,7.31696973 C13.0780982,7.39507459 13.0780982,7.52170758 12.9999934,7.59981244 L12.5757293,8.02407651 C12.4976245,8.10218137 12.3709915,8.10218137 12.2928866,8.02407651 L9.99999338,5.73724106 Z"/>
        </svg>
      </FileInput>
    );
    /* eslint-enable max-len */
  } else {
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
}
);

const SortableList = sortableContainer(({ items, clickAction, handleFileChange }) => {
  return (
    <div>
      {items.map((item, itemIdx) => (
        <SortableItem key={`item-${itemIdx}`} itemIdx={itemIdx} index={itemIdx} item={item} clickAction={clickAction}/>
      ))}
      <SortableItem
        key={`item-upload-mock`} itemIdx={items.length} index={items.length} disabled isMock
        handleFileChange={handleFileChange}
      />
    </div>
  );
});

const TopBarMenu = ({ items, setAllItemsValue, deleteSelectedItems, toggleImageSettings, handleFileChange }) => {
  const hasSelectedItems = items.some(item => item.selected);
  const hasUnselectedItems = items.some(item => !item.selected);
  const selectedItems = items.filter(item => item.selected);

  const addItemButton = <FileInput className={style.filesButton} onChange={handleFileChange}>Add Items</FileInput>;
  return (
    <div className={style.topBar}>
      {hasUnselectedItems ? <a className={style.topBarLink} onClick={() => setAllItemsValue('selected', true)}>Select All</a> : null}
      {hasSelectedItems ? <a className={style.topBarLink} onClick={() => setAllItemsValue('selected', false)}>Deselect All</a> : null}
      {hasSelectedItems ? <a className={style.topBarLink} onClick={() => deleteSelectedItems()}>Delete Selected</a> : null}
      {(selectedItems.length === 1) ? <a className={style.topBarLink} onClick={() => toggleImageSettings()}>Item Settings</a> : null}
      {addItemButton}
    </div>
  );
};

TopBarMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setAllItemsValue: PropTypes.func,
  deleteSelectedItems: PropTypes.func,
  toggleImageSettings: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func,
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

  saveImageSettings(items) {
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
          handleFileChange={this.props.handleFileChange}
        />
        <SortableList
          items={this.state.items}
          onSortEnd={this.onSortEnd}
          clickAction={this.clickAction}
          hideSortableGhost={false}
          axis="xy"
          helperClass="sortableHelper"
          transitionDuration={50}
          handleFileChange={this.props.handleFileChange}
        />
        {this.state.imageSettingsVisible ? <ImageSettings
          images={this.state.items}
          selectedImage={this.state.editedImage}
          onCancel={items => this.saveImageSettings(items)}
          onSave={items => this.saveImageSettings(items)}
          handleFileChange={this.props.handleFileChange}
        /> : null}
      </div>);
  }
}

SortableComponent.propTypes = {
  onItemsChange: PropTypes.func.isRequired,
  addItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFileChange: PropTypes.func.isRequired
};
