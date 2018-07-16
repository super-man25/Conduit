// @flow
import * as React from 'react';
import { Flex, Text, Box } from '_components';
import styled from 'styled-components';
import { cssConstants } from '_constants';

const ScaleFilterContainer = Box.extend`
  width: 300px;
  border: 1px solid ${cssConstants.SECONDARY_BLUE};
  background-color: ${cssConstants.PRIMARY_WHITE};
  position: relative;
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.43);

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    position: absolute;
    top: -5px;
    left: 43px;
    transform: rotate(45deg);
    z-index: 1;
    background-color: ${cssConstants.PRIMARY_WHITE};
    border-top: 1px solid ${cssConstants.SECONDARY_BLUE};
    border-left: 1px solid ${cssConstants.SECONDARY_BLUE};
  }
`;

const FilterListItem = styled.li`
  height: 35px;
  display: flex;
  padding: 0 1rem;
  align-items: center;
`;

const FilterList = styled.ul`
  margin: 0;
  height: 100%;
  list-style: none;
  padding: 0;
  overflow: auto;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;

const ApplyButton = styled.button`
  color: ${cssConstants.PRIMARY_WHITE};
  height: 30px;
  background-color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  border-radius: 3px;
  max-width: 100px;
  min-width: 65px;
  margin: 0;
  padding: 0 0.5rem;
  border: none;
  font-weight: 300;
`;

type Props = {
  scales: any[]
};

export const ScaleFilter = ({ scales }: Props) => (
  <ScaleFilterContainer>
    <Flex justify="space-between" align="center" padding="1rem">
      <Text size={16} weight={600}>
        Filter to Sections:
      </Text>
      <ApplyButton>Apply</ApplyButton>
    </Flex>
    <Box height="270px">
      <FilterList>
        {scales.map((scale) => (
          <FilterListItem key={scale}>
            <Checkbox />
            <Text size={14}>{scale}</Text>
          </FilterListItem>
        ))}
      </FilterList>
    </Box>
  </ScaleFilterContainer>
);
