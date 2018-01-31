import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AddIcon from '../icons/add.svg';
import Styles from '~/Styles/toolbar-button.scss';

export default class AddPluginButton extends Component {
    static propTypes = {
      pubsub: PropTypes.object.isRequired,
      theme: PropTypes.object,
    };

    handleClick = () => {
      this.props.pubsub.set('addPluginPanelVisible', !this.isActive());
    }

    isActive = () => this.props.pubsub.get('addPluginPanelVisible');

    preventBubblingUp = event => event.preventDefault();

    render() {
      const { theme } = this.props;
      const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme && theme.buttonWrapper);
      const idleButtonClassNames = classNames(Styles.button, theme && theme.button);
      const activeButtonClassNames = classNames(idleButtonClassNames, Styles.active, theme && theme.active);
      const buttonClassNames = this.isActive() ? activeButtonClassNames : idleButtonClassNames;
      const iconClassNames = classNames(Styles.icon, theme && theme.icon);
      return (
        <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
          <button className={buttonClassNames} onClick={this.handleClick}>
            <div className={iconClassNames}>
              <AddIcon />
            </div>
          </button>
        </div>
      );
    }
}
