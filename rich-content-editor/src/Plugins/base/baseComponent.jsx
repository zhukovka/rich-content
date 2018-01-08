/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import camelCase from 'lodash/camelcase';
import upperFirst from 'lodash/upperfirst';
import isUndefined from 'lodash/isundefined';
import merge from 'lodash/merge';
import classNames from 'classnames';
import createHocName from './createHocName';
import Styles from '~/Styles/global.scss';

const DEFAULTS = {
  alignment: null,
  size: 'content',
  url: undefined,
};

const alignmentClassName = alignment => {
  if (!alignment) {
    return '';
  } else {
    return Styles[`align${upperFirst(alignment)}`];
  }
};

const sizeClassName = size => {
  if (!size) {
    return '';
  } else {
    return Styles[`size${upperFirst(camelCase(size))}`];
  }
};

const createBaseComponent = ({ PluginComponent, theme, pubsub, helpers }) => {
  class WrappedComponent extends Component {
    static displayName = createHocName('BaseComponent', PluginComponent);

    constructor(props) {
      super(props);
      this.state = { componentState: {}, ...this.stateFromProps(props) };
    }

    componentWillReceiveProps(nextProps) {
      this.setState(this.stateFromProps(nextProps));
    }

    stateFromProps(props) {
      const { getData, readOnly } = props.blockProps;
      const initialState = pubsub.get('initialState_' + props.block.getKey());
      if (initialState) {
        //reset the initial state
        pubsub.set('initialState_' + props.block.getKey(), undefined);
      }
      return {
        componentData: getData() || { config: DEFAULTS },
        readOnly: !!readOnly,
        componentState: initialState || {},
      };
    }

    componentDidMount() {
      this.updateComponent();
      pubsub.subscribe('componentData', this.onComponentDataChange);
      pubsub.subscribe('componentState', this.onComponentStateChange);
      pubsub.subscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.subscribe('componentSize', this.onComponentSizeChange);
      pubsub.subscribe('componentLink', this.onComponentLinkChange);
    }

    componentDidUpdate() {
      this.duringUpdate = true;
      this.updateComponent();
      this.duringUpdate = false;
    }

    componentWillUnmount() {
      pubsub.unsubscribe('componentData', this.onComponentDataChange);
      pubsub.unsubscribe('componentState', this.onComponentStateChange);
      pubsub.unsubscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.unsubscribe('componentSize', this.onComponentSizeChange);
      pubsub.unsubscribe('componentLink', this.onComponentLinkChange);
      pubsub.set('visibleBlock', null);
    }

    isMe = () => {
      const { block } = this.props;
      const updatedVisibleBlock = pubsub.get('visibleBlock');
      return updatedVisibleBlock === block.getKey();
    };

    onComponentDataChange = componentData => {
      if (this.isMeAndIdle) {
        this.setState({ componentData: componentData || {} });
        const { setData } = this.props.blockProps;
        setData(componentData);
      }
    };

    onComponentStateChange = componentState => {
      if (this.isMeAndIdle) {
        this.setState({ componentState: componentState || {} });
      }
    };

    onComponentAlignmentChange = alignment => {
      if (alignment && this.isMeAndIdle) {
        this.updateComponentData({ config: { alignment } });
      }
    };

    onComponentSizeChange = size => {
      if (size && this.isMeAndIdle) {
        this.updateComponentData({ config: { size } });
      }
    };

    onComponentLinkChange = urlData => {
      if (urlData && this.isMeAndIdle) {
        this.updateComponentData({ config: { url: { ...urlData } } });
      }
    };

    updateComponent() {
      const { block, blockProps } = this.props;
      if (blockProps.isFocused && blockProps.isCollapsedSelection) {
        this.updateSelectedComponent();
      } else if (pubsub.get('visibleBlock') === block.getKey()) {
        this.updateUnselectedComponent();
      }
    }

    get isMeAndIdle() {
      return this.isMe() && !this.duringUpdate;
    }

    updateComponentData = newData => {
      const { blockProps } = this.props;
      const newComponentData = merge(this.state.componentData, newData);
      this.setState({ componentData: newComponentData });
      const { setData } = blockProps;
      setData(newComponentData);
    };

    getBoundingClientRectAsObject = element => {
      const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect();
      return { top, right, bottom, left, width, height, x, y };
    };

    updateSelectedComponent() {
      const { block } = this.props;

      const oldVisibleBlock = pubsub.get('visibleBlock');
      const visibleBlock = block.getKey();
      if (oldVisibleBlock !== visibleBlock) {
        const batchUpdates = {};
        const blockNode = findDOMNode(this);
        const componentData = this.state.componentData;
        const config = componentData.config;
        const boundingRect = this.getBoundingClientRectAsObject(blockNode);
        batchUpdates.boundingRect = boundingRect;
        batchUpdates.componentData = componentData;
        batchUpdates.componentState = {};
        batchUpdates.componentSize = config.size;
        batchUpdates.componentAlignment = config.alignment;
        batchUpdates.deleteBlock = this.props.blockProps.deleteBlock;
        batchUpdates.visibleBlock = visibleBlock;
        pubsub.set(batchUpdates);
      } else {
        //maybe just the position has changed
        const blockNode = findDOMNode(this);
        const boundingRect = this.getBoundingClientRectAsObject(blockNode);
        pubsub.set('boundingRect', boundingRect);
      }
    }

    updateUnselectedComponent() {
      const batchUpdates = {};
      batchUpdates.visibleBlock = null;
      batchUpdates.componentData = {};
      batchUpdates.componentState = {};
      batchUpdates.componentSize = null;
      batchUpdates.componentAlignment = null;
      pubsub.set(batchUpdates);
    }

    render = () => {
      const { blockProps, className, onClick, selection } = this.props;
      const { componentData, readOnly } = this.state;
      const { alignment, size, url } = componentData.config || {};
      const isEditorFocused = selection.getHasFocus();
      const { isFocused } = blockProps;
      const isActive = isFocused && isEditorFocused && !readOnly;

      const ContainerClassNames = classNames(
        {
          [Styles.pluginContainer]: !readOnly,
          [Styles.pluginContainerReadOnly]: readOnly,
        },
        alignmentClassName(alignment),
        sizeClassName(size),
        className || '',
        {
          [Styles.hasFocus]: isActive,
          [theme.hasFocus]: isActive,
        }
      );

      const overlayClassNames = classNames(Styles.overlay, {
        [Styles.hidden]: readOnly,
      });

      const component = (
        <PluginComponent
          {...this.props}
          store={pubsub.store}
          theme={theme}
          componentData={this.state.componentData}
          componentState={this.state.componentState}
          helpers={helpers}
        />
      );

      return (
        <div style={{ position: 'relative' }} className={ContainerClassNames}>
          {!isUndefined(url) ? (
            <a href={url.url} target={url.targetBlank ? '_blank' : '_self'}>
              {component}
            </a>
          ) : (
            component
          )}
          <div onClick={onClick} className={overlayClassNames} />
        </div>
      );
    };
  }

  WrappedComponent.propTypes = {
    block: PropTypes.object.isRequired,
    blockProps: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  return WrappedComponent;
};

export default createBaseComponent;
