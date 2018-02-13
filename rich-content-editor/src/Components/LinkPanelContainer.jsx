import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorateComponentWithProps from 'decorate-component-with-props';

import LinkHeader from './LinkHeader';
import LinkPanel from './LinkPanel';
import Styles from '~/Styles/link-panel.scss';
import RadioGroupHorizontal from './RadioGroupHorizontal';

const LinkType = props => (
  <RadioGroupHorizontal
    dataSource={[{ value: 'url', labelText: 'Website address (URL)' }, { value: 'page', labelText: 'Site Page' }]}
    {...props}
  />
);

LinkType.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class LinkPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDoneEnabled: false,
    };
  }

  setLinkPanel = linkPanel => this.linkPanel = linkPanel;

  componentDidMount() {
    const linkHeaderProps = {
      isActive: this.props.isActive,
      onBack: this.props.onCancel,
      onDelete: this.props.onDelete,
    };

    const LinkHeaderWithProps = decorateComponentWithProps(LinkHeader, linkHeaderProps);
    this.props.onOverrideContent(LinkHeaderWithProps);
  }

  onDoneClick = () => {
    if (this.state.isDoneEnabled) {
      const { url, targetBlank, nofollow } = this.linkPanel.state;
      this.props.onDone && this.props.onDone({ url, targetBlank, nofollow });
    }
  };

  onCancelClick = () => this.props.onCancel && this.props.onCancel();

  updateParentIfNecessary = shouldUpdate => {
    this.setState({ isDoneEnabled: shouldUpdate });
  }

  render() {
    const { url, targetBlank, nofollow } = this.props;
    const doneButtonClassName = classNames(Styles.linkPanelFooterDoneButton,
      {
        [Styles.enabled]: this.state.isDoneEnabled,
        [Styles.disabled]: !this.state.isDoneEnabled
      }
    );
    return (
      <div className={Styles.linkPanelModal}>
        {/*<LinkType
            value="url"
          />*/}
        <LinkPanel
          ref={this.setLinkPanel}
          url={url}
          targetBlank={targetBlank}
          nofollow={nofollow}
          updateParentIfNecessary={this.updateParentIfNecessary}
        />
        <div className={Styles.actionsDivider} />
        <div className={Styles.linkPanelFooter}>
          <div className={Styles.linkPanelFooterCancelButton} onClick={this.onCancelClick}>Cancel</div>
          <div className={doneButtonClassName} onClick={this.onDoneClick}>Update</div>
        </div>
      </div>
    );
  }
}

LinkPanelContainer.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  url: PropTypes.string,
  isActive: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  onOverrideContent: PropTypes.func.isRequired,
};

export default LinkPanelContainer;
