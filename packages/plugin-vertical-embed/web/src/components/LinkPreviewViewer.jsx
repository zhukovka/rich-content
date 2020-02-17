import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/link-preview.scss';
class LinkPreviewViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      fetchMetadata: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if (!this.state.metadata) {
      // const url = normalizeUrl(this.props.componentData.url);
      const metadata = await this.props.settings.fetchMetadata();
      this.setState({ metadata });
    }
  }

  render() {
    // const { componentData } = this.props;
    // console.log({ componentData });
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { metadata } = this.state;
    if (!metadata) {
      return null;
    }

    const { title, description, url, thumbnail_url } = metadata;
    return (
      <a
        className={styles.linkPreview_link}
        href={this.state.metadata.url}
        target={this.context.anchorTarget}
        rel={this.context.relValue}
      >
        <figure className={styles.linkPreview}>
          <section className={styles.linkPreview_info}>
            <figcaption className={styles.linkPreview_title}>{title}</figcaption>
            <p className={this.styles.linkPreview_description}>{description}</p>
            <footer className={styles.linkPreview_footer}>{url}</footer>
          </section>
          <img className={styles.linkPreview_image} src={thumbnail_url} alt={title} />
        </figure>
      </a>
    );
  }
}

export default LinkPreviewViewer;
