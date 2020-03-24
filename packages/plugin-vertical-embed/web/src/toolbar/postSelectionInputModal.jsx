import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CloseIcon, Button, TextInput } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/post-selection-input-modal.scss';
import ItemsListComponent from '../components/items-list-component';

// TODO: You may want to make this component a generic item selection modal, rather than a post selection modal
export default class PostSelectionInputModal extends Component {
  state = {
    errorMsg: '',
    products: [],
    selectedProduct: null,
  };
  styles = mergeStyles({ styles, theme: this.props.theme });

  afterOpenModal = () => this.input.focus();

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
    this.search();
  }

  handleKeyPress = () => {};

  searchProducts = query => {
    const {
      fetchFunctions,
      componentData: { type },
    } = this.props;
    const abortController = new AbortController();

    const promise = fetchFunctions[type](query, abortController.signal)
      .then(res => {
        if (res.ok) return res;
        else throw res.statusText;
      })
      .then(res => res.json());
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
      if (e.name === 'AbortError') {
        return;
      }
      throw e;
    }
  }

  onInputChange = e => this.search(e.target.value);

  onConfirm = () => {
    const { onConfirm, componentData } = this.props;
    if (!onConfirm) {
      return;
    }

    onConfirm({
      ...componentData,
      selectedProduct: this.state.selectedProduct || this.state.products[0],
    });
    this.onCloseRequested();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { products } = this.state;
    const {
      t,
      isMobile,
      languageDir,
      componentData: { type },
    } = this.props;
    const { styles } = this;

    return (
      <div dir={languageDir} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.verticalEmbedContainer} data-hook="verticalEmbedModal">
          {!isMobile && (
            <CloseIcon
              className={styles.verticalEmbedModalCloseIcon}
              onClick={() => this.onCloseRequested()}
            />
          )}
          <h2 className={styles.verticalEmbedModalTitle}>{`Select embed ${type}`}</h2>
          <div className={styles.textInputWrapper}>
            <TextInput
              inputRef={ref => {
                this.input = ref;
              }}
              onKeyPress={this.handleKeyPress}
              onChange={this.onInputChange}
              placeholder={`Enter ${type} name`}
              theme={styles}
              data-hook="blogPostSearchInput"
            />
          </div>
          {products && products.length > 0 && (
            <ItemsListComponent
              items={products}
              onSelectionChange={selectedProduct => this.setState({ selectedProduct })}
            />
          )}
        </div>

        <div className={styles.actionButtonsContainer}>
          <Button
            type="secondary"
            className={styles.actionButton}
            onClick={() => this.onCloseRequested()}
          >
            {t('Select_Products_Modal_Cancel')}
          </Button>
          <Button className={styles.actionButton} onClick={() => this.onConfirm()}>
            {t('Select_Products_Modal_Confirm')}
          </Button>
        </div>
      </div>
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
