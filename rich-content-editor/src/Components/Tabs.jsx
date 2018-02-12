import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '~/Styles/tabs.scss';
import { mergeStyles } from '~/Utils/mergeStyles';
import RadioGroup from './RadioGroup';

const tabPropTypes = {
  theme: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export class Tab extends Component {
  static propTypes = {
    ...tabPropTypes,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles, props } = this;
    return (
      <div
        className={classnames(styles.tabs_tabPanel, props.selected ? styles.tabs_tabPanel_selected : '')}
      >{props.children}
      </div>);
  }
}

export class Tabs extends Component {
  static propTypes = tabPropTypes;

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { activeTab: props.value };
  }

  getTabHeaders = tabs => React.Children.map(tabs, tab => ({ label: tab.props.label, value: tab.props.value }));

  renderTabs = () => React.Children.map(this.props.children, tab => React.cloneElement(tab, {
    selected: this.props.value === tab.value,
    key: tab.value
  }));

  render() {
    const { styles, props } = this;
    const headers = this.getTabHeaders(props.children);

    return (
      <div className={styles.tabs}>
        <div className={styles.tabs_headers}>
          {headers.map(({ label, value }) => {
            const checked = value === this.props.value ? { checked: 'checked' } : {};
            return (
              <label
                name={`tabs`}
                key={value}
                className={styles.tabs_headers_option}
                onClick={() => this.setState({ activeTab: value })}
              >
                <input className={this.styles.tabs_headers_option_input} type={'radio'} {...checked}/>
                <span className={this.styles.tabs_headers_option_label}>{label}</span>
              </label>);
          })}
        </div>
        {this.renderTabs()}
      </div>
    );
  }
}
