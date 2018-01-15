import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import style from './gallery-items-sortable.scss';
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';


const SortableItem = SortableElement(({value}) => {
  const imageSize = 80;
  if (value.url.indexOf('/') < 0) {
    value.url = 'media/' + value.url;
  }
  const resizedUrl = getScaleToFillImageURL(value.url, value.metadata.width, value.metadata.height, imageSize, imageSize);
  return (
    <div
        className={style.itemContainer}
    ><img
      className={style.itemImage}
      src={resizedUrl}/>
    </div>
  );
}
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

export class SortableComponent extends Component {
  state = {
    items: this.props.items,
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    }, () => {
      this.props.onSortEnd(this.state.items);
    });
  };
  render() {
    return <SortableList
              items={this.state.items}
              onSortEnd={this.onSortEnd}
              hideSortableGhost={false}
              axis="xy"
              helperClass='sortableHelper'
              transitionDuration={50}
           />;
  }
}
