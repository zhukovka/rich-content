import React from 'react';
import { RicosEditor } from 'ricos-editor';
import {
  pluginVerticalEmbed,
  verticalEmbedProviders,
} from 'wix-rich-content-plugin-vertical-embed';
import PropTypes from 'prop-types';
import MockVerticalSearchModule from '../../../../main/shared/editor/Utils/verticalEmbedUtil';

const { event, booking, product } = verticalEmbedProviders;

const plugins = [
  pluginVerticalEmbed({
    verticalsApi: {
      [product]: new MockVerticalSearchModule(product),
      [event]: new MockVerticalSearchModule(event),
      [booking]: new MockVerticalSearchModule(booking),
    },
    exposeEmbedButtons: [product, event, booking],
  }),
];

const VerticalEmbedEditor = ({ content }) => <RicosEditor plugins={plugins} content={content} />;

VerticalEmbedEditor.propTypes = {
  content: PropTypes.object,
};

export default VerticalEmbedEditor;
