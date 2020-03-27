/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

import { LAYOUT } from '../../constants';

export class PollLayoutSelector extends PureComponent {
  handleTypeSelection = () => {
    const { helpers, componentData, onConfirm } = this.props;

    onConfirm({
      ...componentData,
      layout: {
        ...componentData,
        type: LAYOUT.WITH_IMAGE,
      },
    });
    helpers.closeModal();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleTypeSelection}>kek</button>
      </div>
    );
  }
}
