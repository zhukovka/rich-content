import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer as sortableContainer, SortableElement as sortableElement, arrayMove } from 'react-sortable-hoc';
import classNames from 'classnames';
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';

import style from './gallery-items-sortable.scss';
import ImageSettings from './gallery-image-settings';
import FileInput from '~/Components/FileInput';
import ImageLoader from '~/Components/ImageLoader';

import UploadIcon from '../../icons/upload.svg';
import Fab from '../../icons/fab.svg';

//eslint-disable-next-line no-unused-vars
const EMPTY_SMALL_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const SortableItem = sortableElement(({ item, itemIdx, clickAction, isMock, handleFileChange, isMobile, isMobileSorting }) => {
  const imageSize = (isMobile && window) ? ((window.outerWidth - 20) / 3) : 104;
  if (isMock) {
    /* eslint-disable max-len */
    return (
      <FileInput className={classNames(style.itemContainer, style.filesItem, { [style.mobile]: isMobile })} onChange={handleFileChange} multiple style={{ width: imageSize + 'px', height: imageSize + 'px' }} >
        <UploadIcon/>
      </FileInput>
    );
    /* eslint-enable max-len */
  } else {
    if (item.url.indexOf('/') < 0) {
      item.url = 'media/' + item.url;
    }

    let url;
    if (item.metadata.processedByConsumer) {
      url = getScaleToFillImageURL(item.url, item.metadata.width, item.metadata.height, imageSize, imageSize);
    }

    return (
      <div
        className={classNames(style.itemContainer, {
          [style.itemContainerSelected]: item.selected && !isMobile,
          [style.itemContainerSelectedMobile]: item.selected && isMobile,
          [style.mobile]: isMobile,
          [style.sorting]: isMobileSorting
        })}
        onClick={() => clickAction(itemIdx)}
        style={{
          width: imageSize + 'px',
          height: imageSize + 'px',
        }}
      >
        {url ? <img
          className={style.itemImage}
          src={url}
          style={{
            width: imageSize + 'px',
            height: imageSize + 'px',
          }}
        /> : <ImageLoader/>}
      </div>
    );
  }
}
);

const SortableList = sortableContainer(({ items, clickAction, handleFileChange, isMobile, isMobileSorting }) => {
  return (
    <div
      className={classNames(style.sortableContainer, { [style.mobile]: isMobile })}
    >
      {items.map((item, itemIdx) => (
        //eslint-disable-next-line
        <SortableItem key={`item-${itemIdx}`} itemIdx={itemIdx} index={itemIdx} item={item} clickAction={clickAction} isMobile={isMobile} isMobileSorting={isMobileSorting} disabled={isMobile && !isMobileSorting} />
      ))}
      {isMobileSorting ? null : <SortableItem
        key={`item-upload-mock`} itemIdx={items.length} index={items.length} disabled isMock isMobile={isMobile}
        handleFileChange={handleFileChange}
      />
      }
    </div>
  );
});

//eslint-disable-next-line
const TopBarMenu = ({ items, setAllItemsValue, deleteSelectedItems, toggleImageSettings, handleFileChange, toggleSorting, isMobileSorting, isMobile }) => {
  const hasUnselectedItems = items.some(item => !item.selected);
  const hasSelectedItems = items.some(item => item.selected);
  const selectedItems = items.filter(item => item.selected);
  //eslint-disable-next-line max-len
  const addItemButton = <FileInput className={style.filesButton} onChange={handleFileChange} multiple>{(isMobile ? <Fab className={style.fab} /> : 'Add Items')}</FileInput>;

  const separator = '·';
  const buttons = [];


  if (isMobile && selectedItems.length === 0) {
    buttons.push(<a className={style.topBarLink} onClick={toggleSorting}>{isMobileSorting ? 'Finish Sorting' : 'Sort Items'}</a>);
    buttons.push(separator);
  }
  if (!isMobileSorting) {
    if (hasUnselectedItems) {
      buttons.push(<a className={style.topBarLink} onClick={() => setAllItemsValue('selected', true)}>Select All</a>);
      buttons.push(separator);
    }
    if (hasSelectedItems) {
      buttons.push(<a className={style.topBarLink} onClick={() => setAllItemsValue('selected', false)}>Deselect All</a>);
      buttons.push(separator);
      buttons.push(<a className={style.topBarLink} onClick={() => deleteSelectedItems()}>Delete Selected</a>);
      buttons.push(separator);
    }
    if (selectedItems.length === 1) {
      buttons.push(<a className={style.topBarLink} onClick={() => toggleImageSettings(true)}>Item Settings</a>);
      buttons.push(separator);
    }
  }
  buttons.splice(buttons.length - 1, 1);

  return (
    <div className={classNames(style.topBar, { [style.mobile]: isMobile })}>
      {buttons}
      {(hasSelectedItems || isMobileSorting) ? null : addItemButton}
    </div>
  );
};

TopBarMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setAllItemsValue: PropTypes.func,
  deleteSelectedItems: PropTypes.func,
  toggleImageSettings: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func,
  toggleSorting: PropTypes.func,
  isMobileSorting: PropTypes.bool,
  isMobile: PropTypes.bool
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
    if (this.state.isMobileSorting) {
      return;
    }
    if (this.clickedOnce) {
      this.toggleImageSettings(true, itemIdx);
      this.clickedOnce = false;
      clearInterval(this.doubleClickTimer);
    } else {
      this.clickedOnce = true;
      this.doubleClickTimer = setTimeout(() => {
        if (this.clickedOnce) {
          this.selectItem(itemIdx);
        }
        this.clickedOnce = false;
      }, 200);
    }
  }

  selectItem = itemIdx => {
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

  toggleImageSettings = (imageSettingsVisible, itemIdx) => {
    const { items } = this.state;
    let editedImage;

    if (itemIdx >= 0) {
      items.map((item, idx) => {
        item.selected = (idx === itemIdx);
        return item;
      });
      editedImage = this.state.items[itemIdx];
    } else {
      editedImage = this.state.editedImage;
    }

    this.setState({
      items,
      imageSettingsVisible,
      editedImage
    });
  }

  toggleSorting = () => {
    this.setState({ isMobileSorting: !this.state.isMobileSorting });
  }

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
    return !!this.state.items && (
      <div>
        <TopBarMenu
          items={this.state.items}
          setAllItemsValue={this.setAllItemsValue.bind(this)}
          deleteSelectedItems={this.deleteSelectedItems.bind(this)}
          toggleImageSettings={() => this.toggleImageSettings(true)}
          handleFileChange={this.props.handleFileChange}
          toggleSorting={this.toggleSorting}
          isMobileSorting={this.state.isMobileSorting}
          isMobile={this.props.isMobile}
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
          isMobileSorting={this.state.isMobileSorting}
          isMobile={this.props.isMobile}
        />
        {this.state.imageSettingsVisible ? <ImageSettings
          images={this.state.items}
          selectedImage={this.state.editedImage}
          onCancel={items => this.saveImageSettings(items)}
          onSave={items => this.saveImageSettings(items)}
          handleFileChange={this.props.handleFileChange}
          isMobile={this.props.isMobile}
        /> : null}
      </div>);
  }
}

SortableComponent.propTypes = {
  onItemsChange: PropTypes.func.isRequired,
  addItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
};
