import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/mobile-navbar.scss';

class MobileNavbar extends Component {
  static propTypes = {
    backButtonLabel: PropTypes.string,
    saveButtonLabel: PropTypes.string,
    titleLabel: PropTypes.string,
    onBackButtonClick: PropTypes.func,
    onSaveButtonClick: PropTypes.func,
    theme: PropTypes.object.isRequired,
    ariaProps: PropTypes.object,
    BackButtonComponent: PropTypes.node,
    SaveButtonComponent: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const {
      backButtonLabel,
      saveButtonLabel,
      titleLabel,
      onBackButtonClick,
      onSaveButtonClick,
      BackButtonComponent,
      SaveButtonComponent,
      ariaProps
    } = this.props;
    //console.log(BackButtonComponent);
    const backButton = BackButtonComponent ?
      <div className={this.styles.mobile_navbar_back_button_wrapper}>
        {BackButtonComponent}
      </div>
      : backButtonLabel ? <div className={this.styles.mobile_navbar_back_button_wrapper}>
        <button className={this.styles.mobile_navbar_back_button} onClick={onBackButtonClick}>
          {backButtonLabel}
        </button>
      </div> : null;

    const Title = titleLabel ?
      <div className={this.styles.mobile_navbar_title_label_wrapper}>
        {titleLabel}
      </div>
      : null;

    const saveButton = SaveButtonComponent ?
      <div className={this.styles.mobile_navbar_save_button_wrapper}>
          {SaveButtonComponent}
      </div>
      : saveButtonLabel ? <div className={this.styles.mobile_navbar_save_button_wrapper}>
        <button className={this.styles.mobile_navbar_save_button} onClick={onSaveButtonClick}>
          {saveButtonLabel}
        </button>
      </div> : null;

    return (
      <div className={this.styles.mobile_navbar_container} {...ariaProps}>
        {backButton}
        {Title}
        {saveButton}
      </div>
    );
  }
}

export default MobileNavbar;


 //    tabIndex={readOnly ? -1 : 0} data-hook={dataHook} onChange={e => this.onChange(e.target.valueAsNumber)}
      //   onMouseUp={e => onChange(e.target.valueAsNumber)} onKeyUp={e => this.onKeyUp(e)}
      // />

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.value !== nextProps.value) {
  //     this.onChange(nextProps.value);
  //   }
  // }

  // onChange(value) {
  //   this.setState({ value });
  // }

  //this.state = { value: props.value };