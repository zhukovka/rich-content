import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '~/Components/Button';
import { mergeStyles } from '~/Utils';
import styles from '~/Styles/settings-panel-footer.scss';

class SettingsPanelFooter extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { save, cancel, theme } = this.props;
    return (
      <div className={this.styles.settingsPanel_footer}>
        <Button theme={theme} onClick={() => cancel()} className={this.styles.settingsPanel_cancel} type={'secondary'}>
          {'Cancel'}
        </Button>
        <Button theme={theme} className={this.styles.settingsPanel_save} onClick={() => save()}>{'Done'}</Button>
      </div>
    );
  }
}

SettingsPanelFooter.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SettingsPanelFooter;
