import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash';
import { default as Video } from 'santa-components/src/components/Video/Video';
import { mergeStyles } from 'wix-rich-content-common';

const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center'
  },
};

class VideoComponent extends React.Component {

  componentDidUpdate() {
    this.handleDataSrc();
  }

  /* eslint-disable react/no-find-dom-node */
  handleDataSrc() {
    const $iframes = $('iframe[data-src]');

    $iframes.forEach(iframe => {
      const src = iframe.getAttribute('src');
      const dataSrc = iframe.getAttribute('data-src');

      if (dataSrc) {
        if (src !== dataSrc) {
          iframe.setAttribute('src', dataSrc);
        }
        iframe.removeAttribute('data-src');
      }
    });
  }

  render() {
    const props = {
      compData: {
        type: 'Video',
        id: 'dataItem-jhg2mieg',
        metaData: {
          isPreset: false,
          schemaVersion: '1.0',
          isHidden: false
        },
        videoId: 'WWpQK3nQclU',
        videoType: 'YOUTUBE'
      },
      compProp: {
        type: 'VideoProperties',
        metaData: {
          schemaVersion: '1.0'
        },
        autoplay: false,
        loop: false,
        showinfo: false,
        lightTheme: false,
        showControls: 'temp_show'
      },
      style: {
        width: '100%',
        height: 0
      },
      windowScrollEventAspect: { clearCompScrollModes: noop },
      logger: {
        error: e => { console.log(e) }
      },
      skin: 'wysiwyg.viewer.skins.VideoSkin',
      isExperimentOpen: () => false,
      styleId: 'v1',
      id: 'comp-jhg2midp',
      structure: {
        layout: {
          width: 480,
          height: 277,
          x: 250,
          y: 264,
          scale: 1,
          rotationInDegrees: 0,
          fixedPosition: false
        },
        skin: 'wysiwyg.viewer.skins.VideoSkin',
        componentType: 'wysiwyg.viewer.components.Video',
        components: [],
        dataQuery: '#dataItem-jhg2mieg',
        dimensions: {
          height: 277,
          width: 480,
          x: 250,
          y: 264
        },
        propertyQuery: 'propItem-jhg2miei',
        type: 'Component'
      }
    };

    const styleData = {
      compId: '',
      componentClassName: '',
      id: 'v1',
      metaData: {
        isPreset: true,
        schemaVersion: '1.0',
        isHidden: false
      },
      pageId: '',
      skin: 'wysiwyg.viewer.skins.VideoSkin',
      style: {
        groups: {},
        properties: {},
        propertiesSource: {}
      },
      styleType: 'system',
      type: 'TopLevelStyle'
    };

    const themeData = {
      color: ['#FFFFFF', '#FFFFFF', '000000'],
      font: [
        'normal normal normal 40px/1.4em proxima-n-w01-reg {color_15}',
        'normal normal normal 16px/1.4em din-next-w01-light {color_14}',
        'normal normal normal 28px/1.4em proxima-n-w01-reg {color_15}'
      ]
    };
    const serviceTopology = {
      scriptsLocationMap: {
        skins: 'https://static.parastorage.com/services/skins/2.1229.80'
      }
    };

    const reportMissingSkin = noop;

    const styles = Video.getCompCss(props.styleId, styleData, { themeData, serviceTopology, reportMissingSkin });

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styles[props.styleId] }} />
        <Video isPlayingAllowed={false} {...props} />
      </div>
    );
  }
}

VideoComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export { VideoComponent as Component, DEFAULTS };
