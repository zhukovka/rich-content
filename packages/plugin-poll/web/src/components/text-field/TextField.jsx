import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { clamp, debounce } from 'lodash';

import { RCEHelpersPropTypes, withRCEHelpers } from '../rce-helpers-context';
import { LoaderIcon } from '../../assets/icons';

import styles from './text-field.scss';

class TextFieldComponent extends React.PureComponent {
  $el = React.createRef();

  state = {
    placeholder: this.props.placeholder,
    rows: 1,
    value: this.props.value,
    syncing: false,
  };

  componentDidMount() {
    if (!this.props.rce.isViewMode) {
      this.resize();
    }

    window?.addEventListener('resize', this.handleWindowResizeEvent);
  }

  componentWillUnmount() {
    window?.removeEventListener('resize', this.handleWindowResizeEvent);
  }

  handleWindowResizeEvent = () => setTimeout(() => this.resize());

  hidePlaceholder() {
    this.setState({ placeholder: '' });
  }

  showPlaceholder() {
    this.setState({ placeholder: this.props.placeholder });
  }

  handleFocus = () => {
    this.hidePlaceholder();
    this.props.rce.setInPluginEditingMode(true);
  };

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  handleBlur = () => {
    this.showPlaceholder();
    this.props.rce.setInPluginEditingMode(false);

    if (this.state.value !== this.props.value) {
      this.sync();
    }
  };

  sync = debounce(this._sync, 500);

  async _sync() {
    this.setState({ syncing: true });
    try {
      await this.props.onChange(this.state.value);
    } catch (error) {
    } finally {
      this.setState({ syncing: false });
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      this.sync();
    });

    this.resize();
  };

  resize() {
    if (!this.$el.current) {
      return;
    }

    const computedStyles = getComputedStyle(this.$el.current);

    const lineHeight = parseInt(computedStyles.lineHeight);
    const paddingTop = parseInt(computedStyles.paddingTop);
    const paddingBottom = parseInt(computedStyles.paddingBottom);

    this.$el.current.rows = 1;

    const { scrollHeight } = this.$el.current;

    this.$el.current.rows = this.state.rows;

    const contentHeight = scrollHeight - (paddingTop + paddingBottom);
    const rows = Math.ceil(clamp(contentHeight / lineHeight, 1, Infinity));

    this.setState({ rows });
  }

  render() {
    const { textAutoResize, className, rce, endAdornment, style } = this.props;
    const { value, placeholder, rows, syncing } = this.state;

    if (rce.isViewMode) {
      return (
        <p
          style={style}
          className={cls(
            styles.text,
            className,
            textAutoResize && {
              [styles.small]: value.length > 90,
              [styles.medium]: value.length <= 90,
              [styles.large]: value.length <= 60,
            }
          )}
        >
          {this.props.value}
        </p>
      );
    }

    return (
      <div className={styles.root}>
        <textarea
          style={style}
          ref={this.$el}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={placeholder}
          value={value}
          rows={rows}
          onKeyDown={this.handleKeyDown}
          className={cls(
            styles.input,
            className,
            textAutoResize && {
              [styles.small]: value.length > 90,
              [styles.medium]: value.length <= 90,
              [styles.large]: value.length <= 60,
            }
          )}
          onClick={undefined}
        />
        <span
          className={cls(styles.endAdornment, {
            [styles.shown]: syncing,
          })}
        >
          {syncing ? <LoaderIcon className={styles.spinner} /> : endAdornment}
        </span>
      </div>
    );
  }
}

export const TextField = withRCEHelpers(TextFieldComponent);

TextFieldComponent.defaultProps = {};

TextFieldComponent.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  textAutoResize: PropTypes.bool,
  endAdornment: PropTypes.node,
  ...RCEHelpersPropTypes,
};
