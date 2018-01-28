import React from 'react';
import PropTypes from 'prop-types';

export default class StaticToolbar extends React.Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    theme: PropTypes.object,
    isMobile: PropTypes.bool
  };

  state = {
    overrideContent: undefined
  }

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  render() {
    const { theme, pubsub, structure } = this.props;
    const { overrideContent: OverrideContent } = this.state;
    const childrenProps = {
      theme: theme.buttonStyles,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent
    };

    return (
      <div
        className={theme.toolbarStyles.toolbar}
      >
        {OverrideContent ?
          <OverrideContent {...childrenProps} /> :
          structure.map((Component, index) => <Component key={index} {...childrenProps} />)
        }
      </div>
    );
  }
}
