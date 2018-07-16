// @flow
import * as React from 'react';
import { Text, Flex, ClearIcon } from '_components';
import { cssConstants } from '_constants';
import { ManualPricingButton, ManualPricingInput } from './styled';
import { connect } from 'react-redux';
import { actions } from '_state/eventInventory';
import { formatUSD } from '_helpers/string-utils';

type State = {
  overridePrice: number | string
};

type Props = {
  isEditing: boolean,
  setManualPrice: (value: number | string) => void,
  manualPriceLocked: boolean,
  setEditingManualPrice: () => void,
  cancelEditingManualPrice: () => void,
  rowData: { [string]: any },
  cellData: any
};

export class ManualPricingCellPresenter extends React.Component<Props, State> {
  state = { overridePrice: '' };

  startEditingPrice = () => {
    const { setEditingManualPrice, manualPriceLocked } = this.props;

    if (!manualPriceLocked) {
      this.setState(
        { overridePrice: this.props.rowData.overridePrice || '' },
        setEditingManualPrice
      );
    }
  };

  cancelEditingPrice = () => {
    const { cancelEditingManualPrice } = this.props;
    cancelEditingManualPrice();
  };

  setPrice = () => {
    const { overridePrice } = this.state;
    this.props.setManualPrice(overridePrice);
  };

  onOverridePriceChanged = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = (e.currentTarget: HTMLInputElement);
    this.setState({ overridePrice: value });
  };

  render() {
    const { overridePrice } = this.state;
    const {
      rowData: { listedPrice },
      cellData,
      isEditing,
      manualPriceLocked
    } = this.props;

    if (!isEditing) {
      const textOpacity = manualPriceLocked ? 0.5 : 1;
      const textToDisplay = cellData !== null ? 'EDIT PRICE' : 'SET PRICE';

      return (
        <Flex align="center">
          <Text
            size={14}
            color={cssConstants.PRIMARY_LIGHT_BLUE}
            onClick={this.startEditingPrice}
            opacity={textOpacity}
          >
            {textToDisplay}
          </Text>
          {cellData && (
            <Text
              size={14}
              color={cssConstants.PRIMARY_LIGHT_BLACK}
              marginLeft="1rem"
            >
              {formatUSD(cellData)}
            </Text>
          )}
        </Flex>
      );
    }

    const inputPlaceholder =
      cellData !== null ? formatUSD(cellData) : formatUSD(listedPrice);

    return (
      <Flex align="center">
        <ManualPricingInput
          type="text"
          pattern="[0-9]"
          placeholder={inputPlaceholder}
          value={overridePrice}
          onChange={this.onOverridePriceChanged}
        />
        <ManualPricingButton onClick={this.setPrice}>
          Set Price
        </ManualPricingButton>
        <ClearIcon
          width={16}
          height={16}
          styles={{ marginLeft: 7, cursor: 'pointer' }}
          onClick={this.cancelEditingPrice}
        />
      </Flex>
    );
  }
}

const mapStateToProps = (
  { eventInventory: { manualPriceEditId } },
  ownProps
) => {
  return {
    manualPriceLocked: manualPriceEditId !== null,
    isEditing: manualPriceEditId === ownProps.rowData.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setEditingManualPrice: () =>
    dispatch(actions.setEditingManualPrice(ownProps.rowData.id)),
  setManualPrice: (value) =>
    dispatch(actions.setEventRowManualPrice(ownProps.rowData.id, value)),
  cancelEditingManualPrice: () => dispatch(actions.cancelEditingManualPrice())
});

const ManualPricingCell = connect(mapStateToProps, mapDispatchToProps)(
  ManualPricingCellPresenter
);

export const manualPricingColumnCellRenderer = (props: any) => (
  <ManualPricingCell {...props} />
);
