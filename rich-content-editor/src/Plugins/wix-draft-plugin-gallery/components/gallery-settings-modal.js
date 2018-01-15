import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tabs, Tab } from 'stylable-components/dist/src/components/tabs';
import { Image } from 'stylable-components/dist/src/components/image';

import { ThemeProvider } from '../../../Common/theme-provider';
import LayoutSelector from './gallery-controls/layouts-selector';

import style from './gallery-settings-modal.scss';

import GallerySettingsFooter from './gallery-controls/gallery-settings-footer';
import LayoutControlsSection from './layout-controls-section';
import { SettingsSection } from './gallery-controls/settings-section';
import { SortableComponent } from './gallery-controls/gallery-items-sortable';
import layoutData from '../layout-data-provider';
import InputWithLabel from './stylable-base/input-with-label';

class ManageMediaSection extends Component {

  applyItems = items => {
    const { data, store } = this.props;
    const componentData = { ...data, items };
    store.set('componentData', componentData);
  };

  render() {
    return (
      <div>
        <SortableComponent items={this.props.data.items} onItemsChange={this.applyItems} />
      </div>
    );
  }
}

ManageMediaSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
class ImageSettings extends Component {
  render() {
    const { helpers, visible, onVisibilityToggle } = this.props;
    if (visible) {
      return (
        <div className={style['image-settings']}>
          <h3 className={classnames(style.title, style['back-button'])} onClick={() => onVisibilityToggle()}>← Image Settings</h3>
          <Image className={style.image} src={'https://static.wixstatic.com/media/8bb438_3ff588618aa2433faec50a49cd48fef5.jpg'} />
          <i className={style.left} onClick={() => {}}/>
          <i className={style.right} onClick={() => {}} />
          <div className={style['manage-image-grid']}>
            <button />
            <button />
          </div>
          <SettingsSection className={style['image-settings-section']}>
            <InputWithLabel label={'Title'} placeholder={'Add image title'} value={''}/>
          </SettingsSection>
          <SettingsSection className={style['image-settings-section']}>
            <InputWithLabel label={'Description'} placeholder={'Describe your image'} value={''}/>
          </SettingsSection>
          <SettingsSection className={style['image-settings-section']}>
            <InputWithLabel label={'Link'} placeholder={'Add a link'} value={''}/>
          </SettingsSection>
          <SettingsSection>
            <hr />
          </SettingsSection>
          <GallerySettingsFooter cancel={() => helpers.closeExternalModal()} save={() => onVisibilityToggle()} />
        </div>
      );
    }
    return null;
  }
}
ImageSettings.propTypes = {
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  onVisibilityToggle: PropTypes.func.isRequired,
};

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = { ...data, styles: Object.assign({}, data.styles, setting) };
    store.set('componentData', componentData);
  };

  switchLayout = layout => {
    const layoutStyles = Object.assign({}, layout, layoutData[layout.galleryLayout]);
    this.applyGallerySetting(layoutStyles);
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  render() {
    const { data, store } = this.props;
    return (
      <div>
        <SettingsSection>
          <label>Layouts</label>
          <LayoutSelector
            value={this.getValueFromComponentStyles('galleryLayout')}
            onChange={event => this.switchLayout({ galleryLayout: event.value })}
          />
          <hr />
        </SettingsSection>
        <LayoutControlsSection layout={this.getValueFromComponentStyles('galleryLayout')} data={data} store={store} />
      </div>
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export class GallerySettingsModal extends Component {
  state = { activePanel: 'tabs' };

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  toggleImageSettings = () => this.setState({
    activePanel: this.state.activePanel === 'tabs' ? 'image' : 'tabs'
  });

  onComponentUpdate = () => this.forceUpdate();

  render() {
    const { activeTab, pubsub, helpers } = this.props;
    const componentData = pubsub.get('componentData');
    // console.log('MODAL_RENDER: ', componentData);
    return (
      <ThemeProvider theme={'default'}>
        <h3 className={style.title}>Gallery Settings</h3>
        <Tabs value={activeTab}>
          <Tab label={'Organize Media'} value={'manage_media'}>
            <ManageMediaSection data={componentData} store={pubsub.store} />
          </Tab>
          <Tab label={'Advanced Settings'} value={'advanced_settings'}>
            <AdvancedSettingsSection data={componentData} store={pubsub.store} />
          </Tab>
        </Tabs>
        <SettingsSection>
          <hr />
        </SettingsSection>
        <GallerySettingsFooter cancel={() => helpers.closeExternalModal()} save={() => this.toggleImageSettings()} />
        <ImageSettings {...this.props} visible={this.state.activePanel === 'image'} onVisibilityToggle={() => this.toggleImageSettings()}/>
      </ThemeProvider>
    );
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings']),
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
};

export default GallerySettingsModal;
