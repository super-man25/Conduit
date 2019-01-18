// @flow
import * as React from 'react';
import { TableHeaderCell, PositionedBox } from './styled';
import { SortIcon } from './SortIcon';
import { Flex, FilterListIcon } from '_components';
import { actions } from '_state/eventInventory';
import { connect } from 'react-redux';
import { ScaleFilter } from './ScaleFilter';
import { withClickAway } from '_hoc';
import { cssConstants } from '_constants';
import type { EDVenuePriceScale } from '_models';

type Props = {
  isFiltered: boolean,
  filterDirection: 'asc' | 'desc',
  setFilter: () => void,
  disableSort: boolean,
  label: string,
  scaleFilters: EDVenuePriceScale[],
  selectedScaleFilters: EDVenuePriceScale[],
  setSelectedScaleFilters: (EDVenuePriceScale[]) => void,
  selectAllScaleFilters: () => void
};

type State = {
  scaleDropdownOpen: boolean
};

export const ScaleFilterWithClickAway = withClickAway(ScaleFilter);

const SVGSideLength = 14;

export class ScaleColumnHeaderPresenter extends React.Component<Props, State> {
  state = { scaleDropdownOpen: false };
  ref = React.createRef();

  onScaleClicked = (scale: EDVenuePriceScale) => {
    const { selectedScaleFilters, setSelectedScaleFilters } = this.props;

    const alreadyHasScale = selectedScaleFilters.find((s) => s.id === scale.id);

    const updatedScaleFilters = alreadyHasScale
      ? selectedScaleFilters.filter((s) => s.id !== scale.id)
      : selectedScaleFilters.concat(scale);

    setSelectedScaleFilters(updatedScaleFilters);
  };

  toggleDropdown = () => {
    const { scaleDropdownOpen } = this.state;

    this.setState({
      scaleDropdownOpen: !scaleDropdownOpen
    });
  };

  getPositionOfFilterIcon() {
    if (!this.ref.current) return {};

    const { left, top } = this.ref.current.getBoundingClientRect();

    return {
      top: `calc(${Math.ceil(top)}px + 25px)`,
      left: `calc(${Math.ceil(left)}px - 43px)`
    };
  }

  render() {
    const {
      disableSort,
      label,
      setFilter,
      isFiltered,
      filterDirection,
      scaleFilters,
      selectedScaleFilters,
      selectAllScaleFilters
    } = this.props;

    const { scaleDropdownOpen } = this.state;

    return (
      <TableHeaderCell sortable={!disableSort} active={isFiltered}>
        <PositionedBox position="relative">
          {!disableSort && (
            <SortIcon
              isFiltered={isFiltered}
              filterDirection={filterDirection}
              onClick={setFilter}
            />
          )}
          <Flex align="center" marginLeft={!disableSort && '1.25rem'}>
            {label}
            <div
              style={{ marginLeft: 7, height: SVGSideLength }}
              ref={this.ref}
            >
              <FilterListIcon
                styles={{ cursor: 'pointer' }}
                fill={
                  scaleDropdownOpen
                    ? cssConstants.PRIMARY_LIGHT_BLUE
                    : cssConstants.PRIMARY_LIGHT_BLACK
                }
                height={SVGSideLength}
                width={SVGSideLength}
                onClick={this.toggleDropdown}
              />
            </div>
          </Flex>
        </PositionedBox>
        {scaleDropdownOpen && (
          <div
            style={{
              ...this.getPositionOfFilterIcon(),
              position: 'fixed',
              zIndex: 9
            }}
          >
            <ScaleFilterWithClickAway
              onClickAway={this.toggleDropdown}
              onItemClicked={this.onScaleClicked}
              scales={scaleFilters}
              selectedScales={selectedScaleFilters}
              onSelectAllClicked={selectAllScaleFilters}
            />
          </div>
        )}
      </TableHeaderCell>
    );
  }
}

const mapStateToProps = (
  {
    eventInventory: {
      filterDirection,
      filterName,
      scaleFilters,
      selectedScaleFilters
    }
  },
  ownProps
) => ({
  isFiltered: filterName === ownProps.dataKey,
  filterDirection,
  scaleFilters,
  selectedScaleFilters
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => dispatch(actions.setEventInventoryFilter(ownProps.dataKey)),
  setSelectedScaleFilters: (filters) =>
    dispatch(actions.setSelectedScaleFilters(filters)),
  selectAllScaleFilters: () => dispatch(actions.clearSelectedScaleFilters())
});

const ScaleColumnHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScaleColumnHeaderPresenter);

export const scaleColumnHeaderRenderer = (props: any) => (
  <ScaleColumnHeader {...props} />
);
