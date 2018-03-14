import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { translate } from 'react-i18next';

import Button from '~/Components/Button';
import { mergeStyles } from '~/Utils';
import styles from '~/Styles/settings-panel-footer.scss';

class SettingsPanelFooter extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { save, cancel, theme, cancelLabel, saveLabel, fixed, className, t } = this.props;
    return (
      <div className={classnames(this.styles.settingsPanel_footer, className, { [this.styles.settingsPanel_footer_fixed]: (fixed || false) })}>
        <Button theme={theme} onClick={() => cancel()} className={this.styles.settingsPanel_cancel} type={'secondary'}>
          {cancelLabel || t('SettingsPanelFooter_Cancel')}
        </Button>
        <Button theme={theme} className={this.styles.settingsPanel_save} onClick={() => save()}>
          {saveLabel || t('SettingsPanelFooter_Done')}
        </Button>
      </div>
    );
  }
}

SettingsPanelFooter.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  saveLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  fixed: PropTypes.bool,
  className: PropTypes.string,
  t: PropTypes.func,
};

export default SettingsPanelFooter;
// export default translate(null)(SettingsPanelFooter);
