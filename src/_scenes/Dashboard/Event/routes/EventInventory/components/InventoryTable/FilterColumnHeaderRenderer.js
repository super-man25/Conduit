// @flow
import * as React from 'react';
import { TableHeaderCell, PositionedBox } from './styled';
import { SortIcon } from './SortIcon';
import { Box, Flex, FilterListIcon } from '_components';
import { Filter } from './Filter';
import { withClickAway } from '_hoc';
import { cssConstants } from '_constants';
import type {
  EDInventorySectionFilter,
  EDInventorySort,
  EDVenuePriceScale,
} from '_models';

type Props = {
  isFiltered: boolean,
  filterDirection: 'asc' | 'desc',
  setFilter: (string) => void,
  dataKey: string,
  disableSort: boolean,
  label: string,
  filter: EDInventorySort,
  filters: EDVenuePriceScale[] | EDInventorySectionFilter,
  selectedFilters: EDVenuePriceScale[] | EDInventorySectionFilter[],
  setSelectedFilters: (
    EDVenuePriceScale[] | EDInventorySectionFilter[]
  ) => void,
  clearFilters: () => void,
};

type State = {
  filterDropdownOpen: boolean,
};

export const FilterWithClickAway = withClickAway(Filter);

const SVGSideLength = 14;

export class FilterColumnHeader extends React.Component<Props, State> {
  state = { filterDropdownOpen: false };
  ref = React.createRef<HTMLDivElement>();

  onFilterClicked = (filter: EDVenuePriceScale | EDInventorySectionFilter) => {
    const { selectedFilters, setSelectedFilters } = this.props;

    const alreadyHasFilter = selectedFilters.find((f) => f.id === filter.id);

    const updatedFilters = alreadyHasFilter
      ? selectedFilters.filter((f) => f.id !== filter.id)
      : selectedFilters.concat(filter);

    setSelectedFilters(updatedFilters);
  };

  toggleDropdown = () => {
    const { filterDropdownOpen } = this.state;

    this.setState({
      filterDropdownOpen: !filterDropdownOpen,
    });
  };

  getPositionOfFilterIcon() {
    if (!this.ref.current) return {};

    const { left, top } = this.ref.current.getBoundingClientRect();

    return {
      top: `calc(${Math.ceil(top)}px + 25px)`,
      left: `calc(${Math.ceil(left)}px - 43px)`,
    };
  }

  render() {
    const {
      disableSort,
      label,
      setFilter,
      filters,
      selectedFilters,
      clearFilters,
      dataKey,
      filter,
    } = this.props;
    const { filterDropdownOpen } = this.state;
    const { top, left } = this.getPositionOfFilterIcon();
    const isFiltered = filter.name === dataKey;
    const filterDirection = filter.direction;

    return (
      <TableHeaderCell sortable={!disableSort} active={isFiltered}>
        <PositionedBox position="relative">
          {!disableSort && (
            <SortIcon
              isFiltered={isFiltered}
              filterDirection={filterDirection}
              onClick={() => setFilter(dataKey)}
            />
          )}
          <Flex align="center" marginLeft={!disableSort && '1.25rem'}>
            {label}
            <Box marginLeft="7px" height={`${SVGSideLength}px`} ref={this.ref}>
              <FilterListIcon
                fill={
                  filterDropdownOpen || selectedFilters.length
                    ? cssConstants.PRIMARY_BLUE
                    : cssConstants.PRIMARY_LIGHT_BLACK
                }
                style={{ cursor: 'pointer' }}
                height={SVGSideLength}
                width={SVGSideLength}
                onClick={this.toggleDropdown}
              />
            </Box>
          </Flex>
        </PositionedBox>
        {filterDropdownOpen && (
          <PositionedBox position="fixed" zIndex="9" top={top} left={left}>
            <FilterWithClickAway
              label={label}
              onClickAway={this.toggleDropdown}
              onItemClicked={this.onFilterClicked}
              filters={filters}
              selectedFilters={selectedFilters}
              onClearAllClicked={clearFilters}
              disclaimer={`${
                label === 'Scale'
                  ? 'Scale Filter can be overridden by Section Filter'
                  : 'Section Filter will override Scale Filter'
              }`}
            />
          </PositionedBox>
        )}
      </TableHeaderCell>
    );
  }
}

export const filterColumnHeaderRenderer = (
  props: any,
  filters: EDVenuePriceScale[] | EDInventorySectionFilter[],
  selectedFilters: EDVenuePriceScale[] | EDInventorySectionFilter[],
  filter: EDInventorySort,
  setFilter: () => void,
  clearFilters: () => void,
  setSelectedFilters: (EDVenuePriceScale[] | EDInventorySectionFilter[]) => void
) => (
  <FilterColumnHeader
    {...props}
    {...{
      filters,
      selectedFilters,
      filter,
      setFilter,
      clearFilters,
      setSelectedFilters,
    }}
  />
);
