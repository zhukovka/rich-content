import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Image from '~/Components/Image';
import SettingsSection from '~/Components/SettingsSection';
import getImageSrc from '../get-image-source';
import InputWithLabel from '~/Components/InputWithLabel';
import SettingsPanelFooter from '~/Components/SettingsPanelFooter';
import LinkPanel from '../../../Components/LinkPanel';
import styles from './image-settings.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  propsToState(props) {
    const initialImageState = { ...props.componentData.item };
    return {
      item: props.componentData.item,
      initialImageState,
      isDoneEnabled: false,
    };
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  setLinkPanel = linkPanel => this.linkPanel = linkPanel;

  revertComponentData () {
    const { componentData, helpers, pubsub } = this.props;
    const { initialImageState } = this.state;
    if (initialImageState) {
      componentData.item = initialImageState;
      pubsub.set('componentData', componentData);
    }
    this.setState({ item: initialImageState });

    helpers.closeExternalModal();
  }

  imageMetadataUpdated = (image, value) => {
    image.metadata = Object.assign({}, image.metadata, value);
    this.setState({ item: this.state.item });
  };

  // handleFileChange = event => {
  //   if (event.target.files.length > 0) {
  //     const handleFilesSelected = this.props.pubsub.get('handleFilesSelected');
  //     handleFilesSelected(event.target.files);
  //   }
  // };

  // replaceImage(event) {
  //   this.handleFileChange(event);
  // }

  // deleteImage() {
  //   const { componentData, helpers, pubsub } = this.props;
  //   componentData.item = {};
  //   pubsub.set('componentData', componentData);
  //   this.setState({ item: {} });

  //   helpers.closeExternalModal();
  // }

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.set('componentLink', { url, targetBlank, nofollow });
    } else {
      pubsub.set('componentLink', undefined);
    }
  };

  deleteLink = () => {
    this.props.pubsub.set('componentLink', undefined);
  }

  onDoneClick = () => {
    const { helpers } = this.props;
    if (this.state.isDoneEnabled) {
      // const { item } = this.state;
      const { url, targetBlank, nofollow } = this.linkPanel.state;
      // item.metadata = Object.assign({}, item.metadata, { link: { url, targetBlank, nofollow } });
      this.setState({ item: this.state.item });
      this.wrapBlockInLink({ url, targetBlank, nofollow });
    }
    helpers.closeExternalModal();
  };

  updateParentIfNecessary = shouldUpdate => {
    this.setState({ isDoneEnabled: shouldUpdate });
  }

  render() {
    const { componentData, helpers, theme } = this.props;
    const { item } = componentData;
    const { metadata = {} } = item;
    const { url, targetBlank, nofollow } = (!isEmpty(componentData.config.link) ? componentData.config.link : {});

    return (
      <div className={this.styles.imageSettings}>
        <div className={this.styles.imageSettingsContent}>
          <h3 className={this.styles.imageSettingsTitle}>Image Settings</h3>
          <Image resizeMode={'contain'} className={this.styles.imageSettingsImage} src={getImageSrc(item, helpers)} theme={theme}/>
          <SettingsSection theme={this.props.theme} className={this.styles.imageSettingsSection}>
            <InputWithLabel
              theme={this.props.theme}
              label={'Caption'}
              placeholder={'Enter your image caption (optional)'}
              value={metadata.caption || ''}
              onChange={event => this.imageMetadataUpdated(item, { caption: event.target.value })}
            />
          </SettingsSection >
          <SettingsSection theme={this.props.theme} className={this.styles.imageSettingsSection}>
            <InputWithLabel
              theme={this.props.theme}
              label={'Alt Text'}
              placeholder={'Add image Alt Text'}
              value={metadata.altText || ''}
              onChange={event => this.imageMetadataUpdated(item, { altText: event.target.value })}
            />
          </SettingsSection>
          {/*<SettingsSection theme={this.props.theme} className={this.styles.imageSettingsSection}>
              <InputWithLabel
                theme={this.props.theme}
                label={'Link'}
                placeholder={'Add a link'}
                value={metadata.link || ''}
                onChange={event => this.imageMetadataUpdated(item, { link: event.target.value })}
              />
            </SettingsSection>*/}
          <SettingsSection theme={this.props.theme} className={this.styles.imageSettingsSection}>
            <label className={this.styles.inputWithLabel_label}>Link</label>
          </SettingsSection>
          <div className={this.styles.imageSettingsLinkContainer}>
            <LinkPanel
              ref={this.setLinkPanel}
              url={url}
              targetBlank={targetBlank}
              nofollow={nofollow}
              updateParentIfNecessary={this.updateParentIfNecessary}
              isImageSettings
            />
          </div>
          <SettingsPanelFooter theme={this.props.theme} cancel={() => this.revertComponentData()} save={() => this.onDoneClick()} />
        </div>
      </div>
    );
  }
}
ImageSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
};

export default ImageSettings;
