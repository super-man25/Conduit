// @flow
import * as React from 'react';
import { Text, Flex } from '_components';
import { Icon } from '_components/Icon';
import { cssConstants } from '_constants';
import { withClickAway } from '_hoc';
import { MultiSelect } from './MultiSelect';
import { PositionedBox } from './styled';
import type { Option } from './MultiSelect';

type State = {
  dropDownOpen: boolean,
  selectAllNext: boolean
};

type Props = {
  isEditing: boolean,
  rowData: { [string]: any },
  cellData: any,
  columnData: any,
  rulePropertyValue: number[],
  updatePriceRuleProperty: (rulePropertyValue: number[]) => void
};

export const MultiSelectWithClickAway = withClickAway(MultiSelect);

export class MultiSelectCellPresenter extends React.Component<Props, State> {
  state = { dropDownOpen: false, selectAllNext: true };
  ref = React.createRef();

  componentDidMount() {
    if (this.items().length === this.props.rulePropertyValue.length) {
      this.setState({ selectAllNext: false });
    }
  }

  toggleDropdown = () => {
    const { dropDownOpen } = this.state;

    this.setState({
      dropDownOpen: !dropDownOpen
    });
  };

  clipLabel = (label: string) => {
    const length = this.props.columnData.labelLength || 13;
    return label.length > length ? `${label.slice(0, length)}...` : label;
  };

  items = () => {
    const { columnData } = this.props;
    const { optionsKey } = columnData;

    return columnData[optionsKey];
  };

  onItemClicked = (item: Option) => {
    const { rulePropertyValue, updatePriceRuleProperty } = this.props;

    const itemPreviouslySelected = rulePropertyValue.some((i) => i === item.id);

    const newlySelectedItemIds = itemPreviouslySelected
      ? rulePropertyValue.filter((o) => o !== item.id)
      : [...rulePropertyValue, item.id];

    updatePriceRuleProperty(newlySelectedItemIds);
  };

  toggleSelectAll = () => {
    const { updatePriceRuleProperty } = this.props;
    const { selectAllNext } = this.state;

    const selectedIds = selectAllNext ? this.items().map((i) => i.id) : [];
    updatePriceRuleProperty(selectedIds);
    this.setState({ selectAllNext: !selectAllNext });
  };

  getPositionOfFilterIcon() {
    if (!this.ref.current) return {};

    const { left, top } = this.ref.current.getBoundingClientRect();

    return {
      top: `calc(${Math.ceil(top)}px - 230px)`,
      left: `calc(${Math.ceil(left)}px - 121px)`
    };
  }

  render() {
    const {
      columnData: { label, labelFn },
      rulePropertyValue
    } = this.props;

    const { dropDownOpen } = this.state;

    const items = this.items();
    const selectedNumber = rulePropertyValue.length;

    const cellLabel =
      selectedNumber === 1
        ? this.clipLabel(
            labelFn(items.find((i) => i.id === rulePropertyValue[0]))
          )
        : `${selectedNumber} ${label}`;

    // fetch selected options and concatenate their labels
    // to be used as a title on the multi select container
    const selectedTitles = items
      .filter((item) => rulePropertyValue.includes(item.id))
      .map((option) => labelFn(option))
      .reduce((acc, description) => `${acc} ${description},`, '')
      .slice(0, -1);

    if (!this.props.isEditing) {
      return (
        <Flex align="center">
          <Text title={selectedTitles}>{cellLabel}</Text>
        </Flex>
      );
    }

    return (
      <div>
        <PositionedBox position="relative">
          <Flex
            align="center"
            justify="space-between"
            onClick={this.toggleDropdown}
          >
            {cellLabel}
            <div
              style={{
                marginLeft: 5,
                marginRight: 15,
                height: 24,
                cursor: 'pointer'
              }}
              ref={this.ref}
            >
              <Icon
                color={
                  dropDownOpen
                    ? cssConstants.PRIMARY_LIGHT_BLUE
                    : cssConstants.PRIMARY_LIGHT_BLACK
                }
                name={'arrow-drop-down'}
                size={24}
              />
            </div>
          </Flex>
        </PositionedBox>
        {dropDownOpen && (
          <div
            style={{
              ...this.getPositionOfFilterIcon(),
              position: 'fixed',
              zIndex: 9
            }}
          >
            <MultiSelectWithClickAway
              onClickAway={this.toggleDropdown}
              onItemClicked={this.onItemClicked}
              toggleSelectAll={this.toggleSelectAll}
              selectAllNext={this.state.selectAllNext}
              items={items}
              labelFn={labelFn}
              selectedItems={rulePropertyValue}
              label={label}
            />
          </div>
        )}
      </div>
    );
  }
}
