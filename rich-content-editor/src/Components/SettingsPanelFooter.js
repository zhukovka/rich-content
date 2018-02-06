import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'stylable-components/dist/src/components/button';

import { mergeStyles } from '~/Utils';
import styles from '~/Styles/settings-panel-footer.scss';

class SettingsPanelFooter extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { save, cancel } = this.props;
    return (
      <div className={this.styles.settingsPanel_footer}>
        <Button onClick={() => cancel()} className={this.styles.settingsPanel_cancel}>
          {'Cancel'}
        </Button>
        <Button className={this.styles.settingsPanel_save} onClick={() => save()}>{'Done'}</Button>
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
