import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/add-plugin-panel.scss';

export default class AddPluginPanel extends Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    this.props.pubsub.subscribe('addPluginPanelVisible', this.onAddPluginPanelVisibleChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('addPluginPanelVisible', this.onAddPluginPanelVisibleChange);
  }

  onAddPluginPanelVisibleChange = isVisible => this.setState({ isVisible });

  render() {
    if (!this.state.isVisible) {
      return null;
    }

    const { structure, pubsub, theme } = this.props;
    const getEditorState = pubsub.get('getEditorState');
    const setEditorState = pubsub.get('setEditorState');
    const { panelStyles, buttonStyles } = theme || {};
    const wrapperClassNames = classNames(Styles.wrapper, panelStyles && panelStyles.wrapper);
    const tileClassNames = classNames(Styles.tile, panelStyles && panelStyles.tiles);
    const placeHolderCount = 6 - structure.length;
    return (
      <div className={wrapperClassNames}>
        <ul className={Styles.list}>
          {structure.map((Component, index) => (
            <li key={index} className={tileClassNames}>
              <Component
                key={index}
                getEditorState={getEditorState}
                setEditorState={setEditorState}
                theme={buttonStyles}
                hidePluginSelectPopup={this.hidePopup}
              />
            </li>
          ))}
          {Array(placeHolderCount).fill().map((_, i) => (
            <li key={`empty-placeholder-${i}`} className={tileClassNames} />
          ))}
        </ul>
      </div>
    );
  }
}

AddPluginPanel.propTypes = {
  pubsub: PropTypes.object.isRequired,
  structure: PropTypes.array.isRequired,
  theme: PropTypes.object,
};
