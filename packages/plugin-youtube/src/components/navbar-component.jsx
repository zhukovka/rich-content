import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/navbar-component.scss';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      disable: true,
    };
  }

  onAddButtonClicked = () => {
    const { selectedVideoUrl } = this.props;
    this.props.onAddClicked(selectedVideoUrl);
  };

  onBackArrowClicked = () => {
    this.props.onBackClicked();
  };

  render() {
    const { selectedVideoUrl, isTextBoxFocused, t } = this.props;
    return (
      <div className={this.styles.navbar_container}>
        <div className={this.styles.back_arrow_container}>
          <button onClick={this.onBackArrowClicked} className={this.styles.back_arrow_button} />
        </div>
        <div className={this.styles.add_button_container}>
          <button
            onClick={this.onAddButtonClicked}
            disabled={!selectedVideoUrl || isTextBoxFocused}
            className={this.styles.add_button}
          >
            {t('YoutubePlugin_AddButton_Text')}
          </button>
        </div>
      </div>
    );
  }
}

NavbarComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  selectedVideoUrl: PropTypes.string,
  onAddClicked: PropTypes.func.isRequired,
  onBackClicked: PropTypes.func.isRequired,
  isTextBoxFocused: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default NavbarComponent;
