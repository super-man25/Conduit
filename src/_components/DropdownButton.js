import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '_constants';
import { withClickAway } from '_hoc';
import { Icon } from './Icon';
import { P1 } from './StyledTags';
import { Flex } from './Flex';

const Container = withClickAway(styled.div`
  display: inline-block;
  position: relative;
`);

const Label = styled(P1)`
  color: ${colors.blue};
  transition: 0.2s ease-in-out all;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  width: 180px;
  top: calc(100% + 8px);
  z-index: 10;
  border: 1px solid ${colors.lightGray};
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.06);

  transition: 0.1s ease-in-out all;
  opacity: 0;
  transform: translateY(20px);
  visibility: hidden;

  ${(props) =>
    props.show &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    `};
`;

const Option = styled.div`
  padding: 12px 16px;
  background-color: ${colors.white};
  transition: 0.1s ease-in-out all;

  :not(:last-child) {
    border-bottom: 1px solid ${colors.lightGray};
  }

  :hover {
    cursor: pointer;
    background-color: ${colors.lightGray};
  }
`;

export class DropdownButton extends React.Component {
  static defaultProps = {
    onSelect: () => {},
    parseLabel: (opt) => opt,
  };

  state = {
    show: false,
  };

  handleClickAway = () => {
    const { show } = this.state;
    if (show) {
      this.setState({ show: false });
    }
  };

  handleSelect = (option, index) => {
    const { onSelect } = this.props;
    onSelect(option, index);
    this.setState({ show: false });
  };

  render() {
    const { selected, options, parseLabel } = this.props;

    const { show } = this.state;

    return (
      <Container onClickAway={this.handleClickAway}>
        <Flex direction="row" align="center">
          <Label onClick={() => this.setState({ show: !show })}>
            {parseLabel(options[selected])}
          </Label>
          <Icon name="caretDown" size={24} color="#000" />
        </Flex>
        <Dropdown show={show}>
          {options.map((o, key) => (
            <Option key={key} onClick={() => this.handleSelect(o, key)}>
              {parseLabel(o)}
            </Option>
          ))}
        </Dropdown>
      </Container>
    );
  }
}

DropdownButton.propTypes = {
  /** Index of the selected option */
  selected: PropTypes.number.isRequired,

  /** List of options that can be in any form */
  options: PropTypes.arrayOf(PropTypes.any).isRequired,

  /**
   * Function for parsing the label from an option. It is passed an option and should return
   * a string. Defaults to an identity function.
   */
  parseLabel: PropTypes.func,

  /**
   * Function to be called when an item is selected. It is passed the selected option and
   * its index.
   */
  onSelect: PropTypes.func,
};
