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
    const abortController = new AbortController();
    const promise = fetch(`/_serverless/vertical-oembed/query-products?filter=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.instance,
      },
      signal: abortController.signal,
    })
      .then(res => res.json())
      .catch(() => [
        {
          id: 'c8539b66-7a44-fe18-affc-afec4be8562a',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_119100d8c0144221b2f6733f4d205d2e.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>10.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-2">View Details</a></div></div>',
        },
        {
          id: '975bc5ac-c45f-f81c-fd5c-c909f20d89fa',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_849d96e85f044bc7ae0a47f78d9a898b.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>130.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-8">View Details</a></div></div>',
        },
        {
          id: 'ea77f230-558f-57b6-cdd1-0ba565e8f827',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_5e32b6d9419343c29c68e9173b5461e0.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>85.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-6">View Details</a></div></div>',
        },
        {
          id: 'd99d3cc8-bc75-ec47-6c72-f713016f98f3',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_03155a7e79bd4cca9aaf3f0e98378100.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>7.50 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-4">View Details</a></div></div>',
        },
        {
          id: '6b6778b4-c626-c00d-972c-b138d85e3f07',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_ea68bd8398ac489a8e4e8b99755f96b0.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>40.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-7">View Details</a></div></div>',
        },
        {
          id: '52b0658f-3b3d-796e-9532-87cd79468363',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_f9b427f2017641468a0b939aa26777b5.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3><span><strike>100.00 ₪</strike>95.00 ₪</span></h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-10">View Details</a></div></div>',
        },
        {
          id: '1a2d7e83-4bef-31d5-09e1-3326ee271c09',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_c6158b4d41784ae8b08337a331e1de7f.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>25.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-3">View Details</a></div></div>',
        },
        {
          id: 'a668ef33-f5b8-6569-d04c-1d123be68441',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_ed3b544c319b4fad9c222c791a997832.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>120.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-11">View Details</a></div></div>',
        },
        {
          id: '3fb6a3c8-988b-8755-04bd-5c59ae0b18ea',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_5bc54b597d67423d8022157cef968f7b.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>15.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-5">View Details</a></div></div>',
        },
        {
          id: '7bb38a7a-70b7-9cf3-fc80-584205694465',
          html:
            // eslint-disable-next-line max-len
            '<div style="display:flex;flex-direction:row;width:100%;height:100%" data-reactroot=""><div style="width:50%"><img src="https://static.wixstatic.com/media/a9ff3b_18ef3d9c8058444ea08059329237a1f2.jpg/v1/fit/w_1000,h_1000,q_90/file.jpg" style="width:100%" alt="product"/></div><div style="width:50%;text-align:center"><h2 style="margin-top:25%">I&#x27;m a product</h2><hr style="width:40px"/><h3>45.00 ₪</h3><a style="display:inline-block;margin:0;border:0;outline:0;vertical-align:baseline;overflow:hidden;text-overflow:ellipsis;border-style:solid;padding:13px 0;cursor:pointer;border-color:#384AD3;border-width:1px;border-radius:0;width:30%;color:#384AD3;margin-top:50px" href="https://dorm62.wixsite.com/mysite-8/product-page/i-m-a-product-9">View Details</a></div></div>',
        },
      ]);

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
    const { t, isMobile, languageDir } = this.props;
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
          <h2 className={styles.verticalEmbedModalTitle}>{t('Select_Embed_Product')}</h2>
          <div className={styles.textInputWrapper}>
            <TextInput
              inputRef={ref => {
                this.input = ref;
              }}
              onKeyPress={this.handleKeyPress}
              onChange={this.onInputChange}
              placeholder={t('Select_Products_Search_Placeholder')}
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
};
