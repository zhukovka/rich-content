import React from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from '../../base/icons/block-settings.svg';
import EditIcon from '../icons/icon-edit.svg';
import { BUTTONS } from '~/Plugins/base/buttons';
import { DEFAULTS } from '../divider-component';
import Styles from '../default-divider-styles.scss';

class SettingsModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      width: (props.componentData && props.componentData && props.componentData.width) || DEFAULTS.width,
      t: props.t,
    };
  };

  changeWidth = event => {
    const width = event.target.valueAsNumber;
    const componentData = { ...this.props.componentData, width };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    const { t } = this.props;
    const widthLabel = t('DividerPlugin_Width');
    return (
      <div>
        <div>
          <label htmlFor="width">{widthLabel}</label>
          <input
            type="range" min="10" max="100" value={this.state.width} id="width" step="1"
            data-hook="dividerPluginWidth" onChange={this.changeWidth}
          />
          <output htmlFor="width" id="widthVal">
            {this.state.width}%
          </output>
        </div>
      </div>
    );
  };
}

class EditModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      type: (props.componentData && props.componentData.type) || 'divider1',
      t: props.t,
    };
  };

  changeType = event => {
    this.setState({ type: event.target.value }, () => {
      const componentData = { ...this.props.componentData };
      componentData.type = this.state.type;
      this.props.store.set('componentData', componentData);
    });
  };

  render = () => {
    const { t } = this.props;
    const dividerType1 = t('DividerPlugin_DividerType_1');
    const dividerType2 = t('DividerPlugin_DividerType_2');
    const dividerType3 = t('DividerPlugin_DividerType_3');
    const dividerType4 = t('DividerPlugin_DividerType_4');

    return (
      <div style={{ width: 90 + 'px' }}>
        <div className={Styles.tabs}>
          <div className={Styles.tab}>
            <div>
              <input
                type="radio" name="type" id="divider1" value="divider1" checked={this.state.type === 'divider1'}
                data-hook="dividerTypeOne" onChange={this.changeType}
              />
              <label htmlFor="divider1">{dividerType1}</label>
            </div>
            <div>
              <input
                type="radio" name="type" id="divider2" value="divider2" checked={this.state.type === 'divider2'}
                data-hook="dividerTypeTwo" onChange={this.changeType}
              />
              <label htmlFor="divider2">{dividerType2}</label>
            </div>
            <div>
              <input
                type="radio" name="type" id="divider3" value="divider3" checked={this.state.type === 'divider3'}
                data-hook="dividerTypeThree" onChange={this.changeType}
              />
              <label htmlFor="divider3">{dividerType3}</label>
            </div>
            <div>
              <input
                type="radio" name="type" id="divider4" value="divider4" checked={this.state.type === 'divider4'}
                data-hook="dividerTypeFour" onChange={this.changeType}
              />
              <label htmlFor="divider4">{dividerType4}</label>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default({ t }) => {
  return [
    {
      keyName: 'edit',
      type: BUTTONS.PANEL,
      panelElement: EditModal,
      icon: EditIcon,
      onClick: pubsub => console.log('*** click edit *** '), //eslint-disable-line no-console, no-unused-vars
      mobile: true,
      tooltipTextKey: 'EditButton_Tooltip',
      t,
    },
    { type: BUTTONS.SEPARATOR, mobile: true },
    { type: BUTTONS.SIZE_SMALL_LEFT, mobile: true },
    { type: BUTTONS.SIZE_SMALL_CENTER, mobile: true },
    { type: BUTTONS.SIZE_SMALL_RIGHT, mobile: true },
    { type: BUTTONS.SIZE_CONTENT, mobile: true },
    { type: BUTTONS.SIZE_FULL_WIDTH, mobile: true },
    { type: BUTTONS.SEPARATOR, mobile: true },
    {
      keyName: 'settings',
      type: BUTTONS.PANEL,
      panelElement: SettingsModal,
      icon: SettingsIcon,
      onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
      mobile: true,
      tooltipTextKey: 'SettingsButton_Tooltip',
      t,
    },
    { type: BUTTONS.LINK, mobile: true },
    { type: BUTTONS.DELETE, mobile: true },
  ];
};

