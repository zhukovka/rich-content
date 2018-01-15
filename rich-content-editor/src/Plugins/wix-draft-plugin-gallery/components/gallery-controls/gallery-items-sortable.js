import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import style from './gallery-items-sortable.scss';
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';


const SortableItem = SortableElement(({item, itemIdx, clickAction}) => {
  const imageSize = 100;
  if (item.url.indexOf('/') < 0) {
    item.url = 'media/' + item.url;
  }
  const resizedUrl = getScaleToFillImageURL(item.url, item.metadata.width, item.metadata.height, imageSize, imageSize);
  return (
    <div
        className={item.selected ? style.itemContainerSelected : style.itemContainer}
        onClick={() => clickAction(itemIdx)}
    ><img
      className={style.itemImage}
      src={resizedUrl}/>
    </div>
  );
}
);

const SortableList = SortableContainer(({items, clickAction}) => {
  return (
    <div>
      {items.map((item, itemIdx) => (
        <SortableItem key={`item-${itemIdx}`} itemIdx={itemIdx} index={itemIdx} item={item} clickAction={clickAction}/>
      ))}
    </div>
  );
});

const TopBarMenu = ({items, setAllItemsValue, deleteSelectedItems}) => {
  let hasSelectedItems = false;
  let hasUnselectedItems = false;
  for (let item, i = 0; item = items[i]; i++) {
    if (item.selected) {
      hasSelectedItems = true;
    } else {
      hasUnselectedItems = true;
    }
    if (hasSelectedItems && hasUnselectedItems) break;
  }

  return (
    <div className={style.topBar}>
      {hasUnselectedItems ? <a className={style.topBarLink} onClick={() => setAllItemsValue('selected', true)}>Select All</a> : null}
      {hasSelectedItems   ? <a className={style.topBarLink} onClick={() => setAllItemsValue('selected', false)}>Deselect All</a> : null}
      {hasSelectedItems   ? <a className={style.topBarLink} onClick={() => deleteSelectedItems()}>Delete Selected</a> : null}
    </div>
  )
}

export class SortableComponent extends Component {

  state = this.propsToState(this.props);

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    }, () => {
      this.props.onItemsChange(this.state.items);
    });
  };

  clickAction = (itemIdx) => {
    let {items} = this.state;
    let item = items[itemIdx];
    item.selected = !item.selected;
    this.setState({
      items
    });
  }

  setAllItemsValue(field, val) {
    let {items} = this.state;
    items.map(item => {
      item[field] = val;
      return item;
    });
    this.setState({
      items
    });
  }

  deleteSelectedItems() {
    let {items} = this.state;
    this.setState({
      items: items.filter(item => !item.selected)
    }, () => {
      this.props.onItemsChange(this.state.items);
    });
  }

  propsToState(props) {
    return {
      items: props.items,
    };
  };

  componentWillReceiveProps(props) {
    this.setState(this.propsToState(props));
  };

  render() {
    return (<div>
      <TopBarMenu
        items={this.state.items}
        setAllItemsValue={this.setAllItemsValue.bind(this)}
        deleteSelectedItems={this.deleteSelectedItems.bind(this)}
      />
      <SortableList
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        clickAction={this.clickAction}
        hideSortableGhost={false}
        axis="xy"
        helperClass='sortableHelper'
        transitionDuration={50}
      />
    </div>)
  }
}
