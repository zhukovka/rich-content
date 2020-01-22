import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, Context, verticalEmbedSchema } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import { customClassName } from '../classNameStrategies';
import styles from '../../statics/styles/vertical-embed-viewer.rtlignore.scss';
import LinkPreviewViewer from './LinkPreviewViewer';

class VerticalEmbedComponent extends PureComponent {
  static customClassName = (componentData, theme, styles, isMobile) =>
    customClassName(componentData, theme, styles, isMobile);

  constructor(props) {
    super(props);
    validate(props.componentData, verticalEmbedSchema);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, verticalEmbedSchema);
    }
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = () => {
    return {};
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const post = this.props.componentData.selectedPost;

    // TODO: Make sure SSR works with url
    const metadata = { title: post.title, url: `${window.location.href}/post/${post.slug}`, description: post.excerpt };

    // TODO: Modify this to properly use LinkPreviewViewer when it's finished
    return (
      <div className={this.props.className} data-hook="vertical-embed">
        <LinkPreviewViewer
          componentData={this.props.componentData}
          settings={{ fetchMetadata: () => Promise.resolve(metadata) }}></LinkPreviewViewer>
      </div>
    );
  }
}

VerticalEmbedComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  className: PropTypes.string,
};

VerticalEmbedComponent.contextType = Context.type;

export default VerticalEmbedComponent;
