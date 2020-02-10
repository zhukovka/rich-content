import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate, pluginLinkPreviewSchema } from 'wix-rich-content-common';
import styles from '../statics/styles/link-preview.scss';

class LinkPreviewViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      disableEmbed: PropTypes.bool,
    }).isRequired,
    theme: PropTypes.object,
    isMobile: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    const { componentData, isMobile } = props;
    validate(componentData, pluginLinkPreviewSchema);
    const { title, description } = componentData;
    this.state = {};
    const MAX_2_LINES_CHARS_NUM = isMobile ? 60 : 120;
    this.shouldElipsiseTitle = title.length > MAX_2_LINES_CHARS_NUM;
    this.shouldElipsiseDescription = isMobile && description && description.length > 70;
    let imageRatio = this.shouldElipsiseTitle ? 138 : 104;
    if (description) {
      imageRatio += 28;
    }
    this.imageRatio = imageRatio;
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
    const {
      componentData: {
        title,
        description,
        thumbnail_url,
        /* html,*/ provider_url,
        config: {
          link: { url },
        },
      },
      theme,
      isMobile,
    } = this.props;

    this.styles = this.styles || mergeStyles({ styles, theme });
    const {
      linkPreview,
      linkPreview_info,
      linkPreview_title,
      linkPreview_image,
      linkPreview_description,
      linkPreview_url,
      // linkPreview_embed,
      ellipsis,
    } = this.styles;

    // if (!settings.disableEmbed && html) {
    //   return (
    //     <iframe
    //       title="oembed content"
    //       srcDoc={html}
    //       ref={ref => (this.iframe = ref)}
    //       onLoad={this.handleIframeLoad}
    //       className={linkPreview_embed}
    //     />
    //   );
    // }

    return (
      <figure className={linkPreview} id="linkPreviewSection" data-hook="linkPreviewViewer">
        <div
          style={{
            width: isMobile ? 110 : this.imageRatio || 0,
            backgroundImage: `url(${thumbnail_url})`,
          }}
          className={linkPreview_image}
          alt={title}
        />
        <section className={linkPreview_info}>
          <div className={linkPreview_url}>{provider_url || url}</div>
          <figcaption className={linkPreview_title} id="link-preview-title">
            {title}
            {this.shouldElipsiseTitle && <span className={ellipsis}>...</span>}
          </figcaption>
          {description && (
            <div className={linkPreview_description}>
              {description}
              {this.shouldElipsiseDescription && <span className={ellipsis}>...</span>}
            </div>
          )}
        </section>
      </figure>
    );
  }
}

export default LinkPreviewViewer;
