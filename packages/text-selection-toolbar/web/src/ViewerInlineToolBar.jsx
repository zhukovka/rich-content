import PropTypes from 'prop-types';
import React from 'react';
import { TWITTER } from './toolbarOptions';
import OptionButton from './OptionButton';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';
import Twitter from './icons/twitter.svg';

const TWEET_ON_TWITTER_URL = 'https://twitter.com/intent/tweet?text=';

function handleTweetClick(selectedText) {
  window.open(TWEET_ON_TWITTER_URL + encodeURI(selectedText));
}

const toolbarOptionsActions = {
  [TWITTER]: {
    action: selectedText => handleTweetClick(selectedText),
    buttonText: 'Tweet',
    icon: <Twitter />,
  },
};

export default class ViewerInlineToolBar extends React.Component {
  constructor(props) {
    super(props);
    const { targetId } = props;
    this.viewerRect =
      (document.getElementById(targetId) &&
        document.getElementById(targetId).getBoundingClientRect()) ||
      {};
  }

  getToolbarOptions = () => {
    const { options, selectedText } = this.props;
    const buttons = [];
    options.map(option => {
      const currentOption = toolbarOptionsActions[option];
      return buttons.push(
        <OptionButton
          key={currentOption.buttonText}
          currentOption={currentOption}
          selectedText={selectedText}
        />
      );
    });
    return buttons;
  };

  render() {
    const { position = {} } = this.props;
    const { x, y, width, height } = position;
    const { top, left } = this.viewerRect;
    return (
      <div
        className={styles.container}
        style={{
          top: y - top * 2.3,
          left: x - left + width * 0.5,
        }}
      >
        {this.getToolbarOptions()}
      </div>
    );
  }
}

ViewerInlineToolBar.propTypes = {
  options: PropTypes.array.isRequired,
  selectedText: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  targetId: PropTypes.string.isRequired,
};
