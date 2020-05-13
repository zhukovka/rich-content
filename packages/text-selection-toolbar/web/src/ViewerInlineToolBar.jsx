import PropTypes from 'prop-types';
import React from 'react';
import { TWITTER } from './toolbarOptions';
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
    Comp: <Twitter />,
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
  getOptionButton = (currentOption, selectedText) => {
    const action = () => currentOption.action(selectedText);
    const option = currentOption.buttonText;
    const Comp = currentOption.Comp;
    return (
      <button key={option} className={styles.option} onClick={action}>
        {Comp}
      </button>
    );
  };

  getToolbarOptions = () => {
    const { options, selectedText } = this.props;
    const buttons = [];
    options.map(option => {
      const currentOption = toolbarOptionsActions[option];
      return buttons.push(this.getOptionButton(currentOption, selectedText));
    });
    return buttons;
  };

  render() {
    const { selectionRect = {} } = this.props;
    const { x, y, width, height } = selectionRect;
    const { top, left } = this.viewerRect;
    return (
      <div
        className={styles.container}
        style={{
          top: y - height * 3 - top,
          left: x - left + width * 0.4,
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
  selectionRect: PropTypes.object.isRequired,
  targetId: PropTypes.string.isRequired,
};
