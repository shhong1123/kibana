/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { Fragment } from 'react';
import {
  EuiAccordion,
  EuiText,
  EuiSelect,
  EuiSpacer,
  EuiFlyout,
  EuiFlyoutBody,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiFlyoutHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutFooter,
  EuiTitle,
  EuiTextColor,
} from '@elastic/eui';


export class FlyOut extends React.Component {

  constructor() {
    super();
  }

  _renderFlexibleSelect = (options, selectAction) => {
    const onChange = ({ target }) => selectAction(target.value);

    return (
      <Fragment>
        <EuiSpacer size="m" />
        <EuiSelect
          options={options}
          onChange={onChange}
          aria-label="Use aria labels when no actual label is in use"
        />
      </Fragment>
    );
  };

  _renderFlyout() {
    const options = this.props.emsLayerOptions &&
      this.props.emsLayerOptions.map(service => ({ value: service.name, text: service.name }));
    const { selectAction } = this.props;

    return (
      <EuiFlyout onClose={this.props.onClose} style={{ maxWidth: 768 }}>
        <EuiFlyoutHeader>
          <EuiTitle size="l">
            <h2>Add layer</h2>
          </EuiTitle>
          <EuiSpacer size="m"/>
          <EuiTextColor color="subdued">
            <EuiText size="s">
              <p>Choose a source from one of the following options, then click Add to map to continue.</p>
            </EuiText>
          </EuiTextColor>
          <EuiSpacer/>
          <EuiHorizontalRule margin="none"/>
        </EuiFlyoutHeader>

        <EuiFlyoutBody style={{ paddingTop: 0 }}>
          <div>
            <EuiSpacer size="l" />
            <EuiAccordion
              id="accordion2"
              buttonContent="Import from Elastic Maps Service"
              paddingSize="l"
            >
              <EuiText>
                { this._renderFlexibleSelect(options, selectAction) }
              </EuiText>
            </EuiAccordion>
          </div>
        </EuiFlyoutBody>

        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                onClick={this.props.closeFlyout}
                flush="left"
              >
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              {/*{addToMapBtn}*/}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  render() {
    const { flyoutVisible } = this.props;
    return (flyoutVisible ? this._renderFlyout() : null);
  }
}
