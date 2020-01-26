import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import {
  mergeStyles,
  validate,
  Context,
  ReadMore,
  pluginLinkPreviewSchema,
} from 'wix-rich-content-common';
import styles from '../statics/styles/link-preview.scss';

class LinkPreviewViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      disableOembed: PropTypes.bool,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, pluginLinkPreviewSchema);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkPreviewSchema);
    }
  }

  async componentDidMount() {
    validate(pluginLinkPreviewSchema, this.props.componentData);
  }

  handleIframeLoad = () => {
    this.iframe.style.height = this.iframe.contentWindow.document.body.scrollHeight + 'px';
  };
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      componentData: { title, description, thumbnail_url, url, html },
      settings,
    } = this.props;
    if (!settings.disableOembed && html) {
      return (
        <iframe
          title="oembed content"
          srcDoc={html}
          ref={ref => (this.iframe = ref)}
          onLoad={this.handleIframeLoad}
        />
      );
    }
    const { anchorTarget, relValue } = this.context;
    const {
      linkPreview_link,
      linkPreview,
      linkPreview_info,
      linkPreview_title,
      linkPreview_image,
      linkPreview_description,
      linkPreview_url,
    } = this.styles;
    const { imageRatio } = this.state;
    if (!imageRatio) {
      this.setState(
        { imageRatio: document.getElementById('linkPreviewSection')?.offsetHeight },
        () => this.forceUpdate()
      );
    }
    return (
      <a className={linkPreview_link} href={url} target={anchorTarget} rel={relValue}>
        <figure className={linkPreview} id="linkPreviewSection">
          <div
            style={{
              height: imageRatio,
              width: imageRatio,
              backgroundImage: `url(${thumbnail_url})`,
            }}
            className={linkPreview_image}
            alt={title}
          />
          <section className={linkPreview_info}>
            <div className={linkPreview_url}>{url}</div>
            <figcaption className={linkPreview_title}>
              <ReadMore lines={2} text={title} label="" />
            </figcaption>
            {description && (
              <div className={linkPreview_description}>
                <ReadMore lines={1} text={description} label="" />
              </div>
            )}
          </section>
        </figure>
      </a>
    );
  }
}

LinkPreviewViewer.contextType = Context.type;

export default LinkPreviewViewer;
