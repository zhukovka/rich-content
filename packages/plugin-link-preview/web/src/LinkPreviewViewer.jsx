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
      fetchMetadata: PropTypes.func.isRequired,
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
    if (!this.state.metadata) {
      this.setState({ metadata: this.props.componentData });
    }
  }

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    if (!this.state.metadata) {
      return null;
    }
    const { title, description, thumbnail_url, url, html } = this.state.metadata;
    if (!this.props.settings.disableOembed && html) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />; //eslint-disable-line
    }

    const { anchorTarget, relValue } = this.context;
    const {
      linkPreview_link,
      linkPreview,
      linkPreview_info,
      linkPreview_title,
      linkPreview_image,
      linkPreview_description,
      linkPreview_footer,
    } = this.styles;
    return (
      <a className={linkPreview_link} href={url} target={anchorTarget} rel={relValue}>
        <figure className={linkPreview}>
          <section className={linkPreview_info}>
            <figcaption className={linkPreview_title}>
              <ReadMore lines={1} text={title} label="" />
            </figcaption>
            <p className={linkPreview_description}>
              <ReadMore text={description} label="" />
            </p>
            <footer className={linkPreview_footer}>{url}</footer>
          </section>
          <img className={linkPreview_image} src={thumbnail_url} alt={title} />
        </figure>
      </a>
    );
  }
}

LinkPreviewViewer.contextType = Context.type;

export default LinkPreviewViewer;
