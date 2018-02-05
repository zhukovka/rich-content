import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';

import { mergeStyles } from '~/Utils';
import styles from './layout-selector.scss';
class LayoutSelector extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  layouts = [
    { layoutId: 0, name: 'Grid' },
    { layoutId: 1, name: 'Masonry' },
    { layoutId: 2, name: 'Collage' },
    { layoutId: 3, name: 'Thumbnails' },
    { layoutId: 4, name: 'Slideshow' },
    { layoutId: 5, name: 'Panorama' },
    { layoutId: 6, name: 'Columns' },
    { layoutId: 7, name: 'Slides' },
  ];

  sidebarToOriginalLayoutMapper = sidebarLayoutId => {
    const { sidebar, original } = this.props.layoutsOrder;
    const sidebarLayoutName = sidebar[sidebarLayoutId];
    const originalLayoutId = original.indexOf(sidebarLayoutName);
    return originalLayoutId;
  }

  originalToSidebarLayoutMapper = originalLayoutId => {
    const { sidebar, original } = this.props.layoutsOrder;
    const originalLayoutName = original[originalLayoutId];
    const sidebarLayoutId = sidebar.indexOf(originalLayoutName);
    return sidebarLayoutId;
  }

  dataMapper = ({ layoutId, name }) => ({ value: layoutId, label: name });

  renderOption = ({ layoutId }, { label }, { id, selected, focused }) => (
    <SelectionListOption id={id} value={layoutId} selected={selected} focused={focused}>
      <div className={this.styles.layoutsSelector_tile}>
        <div
          className={classnames(this.styles[selected ?
            `layoutsSelector_icon_${label.toLowerCase()}_selected` : `layoutsSelector_icon_${label.toLowerCase()}`],
          this.styles.layoutsSelector_tile)}
        />
        <label className={this.styles.layoutsSelector_tile_label}>{label}</label>
      </div>
    </SelectionListOption>
  );

  onLayoutChange = ({ value }) => {
    const originalLayoutId = this.sidebarToOriginalLayoutMapper(value);
    this.props.onChange({ value: originalLayoutId });
  }


  render() {
    const styles = this.styles;
    const { value } = this.props;
    return (
      <div>
        <label className={styles.layoutsSelector_label}>Layouts</label>
        <SelectionList
          className={styles.layoutsSelector_grid}
          dataSource={this.layouts}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={this.originalToSidebarLayoutMapper(value)}
          onChange={this.onLayoutChange}
        />
      </div>
    );
  }
}

LayoutSelector.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  layoutsOrder: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default LayoutSelector;
