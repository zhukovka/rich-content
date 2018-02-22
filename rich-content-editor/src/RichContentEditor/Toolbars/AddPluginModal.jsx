import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/add-plugin-modal.scss';

export default class AddPluginModal extends Component {
  hidePopup = () => this.props.hidePopup();

  render() {
    const { getEditorState, setEditorState, structure, theme } = this.props;
    const { panelStyles, buttonStyles } = theme || {};
    const tileClassNames = classNames(Styles.tile, panelStyles && panelStyles.tile);
    const placeHolderCount = 6 - structure.length;
    return (
      <ul className={Styles.list}>
        {structure.map((Component, index) => (
          <li key={index} className={tileClassNames}>
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              hidePopup={this.hidePopup}
              theme={buttonStyles}
              showName
              isMobile
            />
          </li>
        ))}
        {Array(placeHolderCount).fill().map((_, i) => (
          <li key={`empty-placeholder-${i}`} className={tileClassNames} />
        ))}
      </ul>
    );
  }
}

AddPluginModal.propTypes = {
  pubsub: PropTypes.object.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};
