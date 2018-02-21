import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/static-toolbar.scss';

export default class StaticToolbar extends React.Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    theme: PropTypes.object,
    isMobile: PropTypes.bool
  };

  state = {
    overrideContent: undefined,
    extendContent: undefined,
  }

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  render() {
    const { theme, pubsub, structure } = this.props;
    const { overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const { buttonStyles, toolbarStyles } = theme || {};
    const toolbarClassNames = classNames(Styles.toolbar, toolbarStyles && toolbarStyles.toolbar);
    const buttonClassNames = classNames(Styles.buttons, toolbarStyles && toolbarStyles.buttons);
    const extendClassNames = classNames(Styles.extend, toolbarStyles && toolbarStyles.extend);
    const childrenProps = {
      theme: buttonStyles,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
    };

    return (
      <div className={toolbarClassNames}>
        <div className={buttonClassNames}>
          {
            OverrideContent ?
              <OverrideContent {...childrenProps} /> :
              structure.map((Button, index) => <Button key={index} {...childrenProps} />)
          }
        </div>
        {ExtendContent && (
          <div className={extendClassNames}>
            <ExtendContent {...childrenProps} />
          </div>
        )}
      </div>
    );
  }
}
