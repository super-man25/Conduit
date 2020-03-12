// @flow

import styled from 'styled-components';
import * as React from 'react';
import { Text, Flex } from '_components';
import { Checkbox, MultiSelectOption } from './styled';
import { colors } from '_constants';

const MultiSelectOptionHeader = styled(MultiSelectOption)`
  background-color: ${colors.blue};
  color: #fff;

  :hover {
    background-color: ${colors.blue};
  }
`;

type Props = {
  categories: any[],
  grouped: any,
  selected: any[],
  labelFn: (option: any) => string,
  onItemClicked: (option: any) => void,
  updatePriceRuleProperty: (options: any[]) => void,
};

type State = {
  selectAllNext: any,
};

export class MultiSelectGroupView extends React.Component<Props, State> {
  state = { selectAllNext: {} };

  componentDidMount() {
    const selectAllNext = this.props.categories.reduce(
      (acc, category) => ({
        ...acc,
        [category.id]: true,
      }),
      {}
    );

    this.setState({ selectAllNext });
  }

  toggleSelectAllCategory(category: any) {
    const { updatePriceRuleProperty, selected, grouped } = this.props;
    const { selectAllNext } = this.state;

    let selectedIds;
    if (selectAllNext[category.id]) {
      selectedIds = grouped[category.id]
        .map((e) => e.id)
        .concat(selected)
        .filter((event, index, events) => events.indexOf(event) === index);
    } else {
      const idsInGroup = grouped[category.id].map((o) => o.id);
      selectedIds = selected.filter((s) => !idsInGroup.includes(s));
    }

    updatePriceRuleProperty(selectedIds);
    this.setState({
      selectAllNext: {
        ...selectAllNext,
        [category.id]: !selectAllNext[category.id],
      },
    });
  }

  render() {
    const {
      categories,
      grouped,
      selected,
      onItemClicked,
      labelFn,
    } = this.props;

    return (
      <React.Fragment>
        {categories.map((category) => {
          return (
            <React.Fragment key={`category${category.id}`}>
              <MultiSelectOptionHeader>
                <Flex align="center" justify="space-between">
                  {category.name}
                  <Text
                    color="#fff"
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.toggleSelectAllCategory(category)}
                  >
                    {this.state.selectAllNext[category.id]
                      ? 'Select All'
                      : 'Select None'}
                  </Text>
                </Flex>
              </MultiSelectOptionHeader>
              {grouped[category.id].map((option) => {
                return (
                  <MultiSelectOption
                    key={option.id}
                    isActive={selected.includes(option.id)}
                    onClick={() => onItemClicked(option)}
                  >
                    <Flex align="center">
                      <Checkbox
                        checked={selected.includes(option.id)}
                        onChange={() => onItemClicked(option)}
                      />
                      {labelFn(option)}
                    </Flex>
                  </MultiSelectOption>
                );
              })}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}
