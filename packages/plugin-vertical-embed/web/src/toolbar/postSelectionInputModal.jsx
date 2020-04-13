import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/post-selection-input-modal.scss';
import UrlInputModal from 'wix-rich-content-editor-common/dist/lib/UrlInputModal';

// TODO: You may want to make this component a generic item selection modal, rather than a post selection modal
export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    products: [],
    selectedProduct: null,
  };
  styles = mergeStyles({ styles, theme: this.props.theme });

  componentDidMount() {
    this.search();
  }

  searchProducts = query => {
    const {
      fetchFunctions,
      componentData: { type },
    } = this.props;
    const abortController = new AbortController();
    const promise = fetchFunctions[type](query, abortController.signal).then(res => {
      // if (res.ok)
      return res;
      // else throw res.statusText;
    });
    // .then(res => res.json());
    return {
      abortController,
      promise,
    };
  };

  currentAbortController = null;
  async search(query) {
    const { abortController, promise } = this.searchProducts(query);
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    this.currentAbortController = abortController;

    try {
      const products = await promise;
      this.setState({ products });
    } catch (e) {
      if (e?.name === 'AbortError') {
        return;
      }
      throw e;
    }
  }

  onInputChange = inputString => {
    this.search(inputString);
    this.setState({ inputString });
  };

  onConfirm = item => {
    const { onConfirm, componentData, helpers } = this.props;
    if (!onConfirm) {
      return;
    }

    onConfirm({
      ...componentData,
      selectedProduct: item, //this.state.selectedProduct || this.state.products[0],
    });
    helpers.closeModal();
  };

  render() {
    const { products, inputString } = this.state;
    const {
      t,
      languageDir,
      componentData: { type },
      helpers,
    } = this.props;
    return (
      <UrlInputModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        t={t}
        languageDir={languageDir}
        title={`Select embed ${type}`}
        subtitle={`Choose a ${type} from your ${type} list`}
        dataHook={`verticalEmbedModal`}
        saveLabel={t('EmbedURL_Common_CTA_Primary')}
        cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
        setSelection={selectedProduct => this.setState({ selectedProduct })}
        onCloseRequested={helpers.closeModal}
        dropdownItems={products}
        onInputChange={this.onInputChange}
        input={inputString}
      />
    );
  }
}

PostSelectionInputModal.propTypes = {
  onConfirm: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  instance: PropTypes.string,
  fetchFunctions: PropTypes.object.isRequired,
};
