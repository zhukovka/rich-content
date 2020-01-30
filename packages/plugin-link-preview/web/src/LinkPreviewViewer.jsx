import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate, Context, pluginLinkPreviewSchema } from 'wix-rich-content-common';
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
    this.iframe.style.width = this.iframe.contentWindow.document.body.scrollWidth + 'px';
  };
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      componentData: { title, description, thumbnail_url, html, provider_url },
      settings,
    } = this.props;

    const {
      linkPreview,
      linkPreview_info,
      linkPreview_title,
      linkPreview_image,
      linkPreview_description,
      linkPreview_url,
      linkPreview_oEmbed,
    } = this.styles;

    if (!settings.disableOembed && html) {
      return (
        <iframe
          title="oembed content"
          srcDoc={html}
          ref={ref => (this.iframe = ref)}
          onLoad={this.handleIframeLoad}
          className={linkPreview_oEmbed}
        />
      );
    }
    const { imageRatio } = this.state;
    if (!imageRatio) {
      this.setState(
        { imageRatio: document.getElementById('linkPreviewSection')?.offsetHeight },
        () => this.forceUpdate()
      );
    }
    return (
      <figure className={linkPreview} id="linkPreviewSection">
        <div
          style={{
            height: imageRatio || 0,
            width: imageRatio || 0,
            backgroundImage: `url(${thumbnail_url})`,
          }}
          className={linkPreview_image}
          alt={title}
        />
        <section className={linkPreview_info}>
          <div className={linkPreview_url}>{provider_url}</div>
          <figcaption className={linkPreview_title} id="link-preview-title">
            {title}
          </figcaption>
          {description && <div className={linkPreview_description}>{description}</div>}
        </section>
      </figure>
    );
  }
}

LinkPreviewViewer.contextType = Context.type;

export default LinkPreviewViewer;
