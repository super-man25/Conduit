import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { useClickAway } from '_hooks';
import { colors } from '_constants';
import { Icon } from './Icon';

const StyledMultiSelect = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledMultiSelectDropdown = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 250px;
  border: 1px solid ${colors.lightGray};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
`;

const FilterInput = styled.input`
  padding: 10px 15px;
  border: 1px solid ${colors.lightGray};
  margin: 5px;
  border-radius: 3px;
`;

const BulkSelectButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  color: ${colors.blue};
  user-select: none;
  padding: 10px 15px;
  border-top: 1px solid ${colors.lightGray};
  border-bottom: 1px solid ${colors.lightGray};
`;

const Options = styled.div`
  max-height: 250px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Checkbox = styled.input`
  margin-right: 15px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGray};
  }

  & + & {
    border-top: 1px solid ${colors.lightGray};
  }
`;

const DropdownArrow = styled(Icon)`
  margin-left: 15px;
`;

const DefaultOption = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
`;

export const MultiSelectDropdown = ({
  options,
  setIsOpen,
  handleChange,
  handleFilterTextChange,
  handleSelect,
  handleSelectAll,
  handleSelectNone,
  selectedOptions,
  filterText,
}) => {
  const ref = useRef();

  const handleClickAway = () => {
    handleChange(selectedOptions);
    setIsOpen(false);
  };

  useClickAway({ ref, handleClickAway });

  return (
    <StyledMultiSelectDropdown ref={ref}>
      <FilterInput onChange={handleFilterTextChange} placeholder="Filter..." />
      {selectedOptions.length === options.length ? (
        <BulkSelectButton onClick={handleSelectNone}>
          Select None
        </BulkSelectButton>
      ) : (
        <BulkSelectButton onClick={handleSelectAll}>
          Select All
        </BulkSelectButton>
      )}
      <Options>
        {options
          .filter((option) =>
            option.label.toLowerCase().includes(filterText.toLowerCase())
          )
          .sort((a, b) => (a.label < b.label ? -1 : 1))
          .map((option, index) => (
            <Option key={index} onClick={() => handleSelect(option)}>
              <Checkbox
                type="checkbox"
                onChange={() => handleSelect(option)}
                checked={
                  !!selectedOptions.find(
                    (selectedOption) => selectedOption.id === option.id
                  )
                }
              />
              {option.label}
            </Option>
          ))}
      </Options>
    </StyledMultiSelectDropdown>
  );
};

export const MultiSelect = ({ options, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterText, setFilterText] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleSelect = (option) => {
    if (
      selectedOptions.find((selectedOption) => selectedOption.id === option.id)
    ) {
      // remove option from selectedOptions
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOption) => selectedOption.id !== option.id
        )
      );
    } else {
      // add option to selectedOptions
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const handleFilterTextChange = (event) => setFilterText(event.target.value);
  const handleSelectAll = () => setSelectedOptions(options);
  const handleSelectNone = () => setSelectedOptions([]);

  return (
    <StyledMultiSelect onClick={handleOpen}>
      {isOpen ? (
        <MultiSelectDropdown
          options={options}
          selectedOptions={selectedOptions}
          setIsOpen={setIsOpen}
          handleChange={handleChange}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleSelectNone={handleSelectNone}
          filterText={filterText}
          handleFilterTextChange={handleFilterTextChange}
        />
      ) : selectedOptions.length ? (
        <div>{selectedOptions.length} Selected</div>
      ) : (
        <DefaultOption>
          Select...
          <DropdownArrow
            size={10}
            color={colors.blue}
            name={isOpen ? 'arrowUp' : 'arrowDown'}
          />
        </DefaultOption>
      )}
    </StyledMultiSelect>
  );
};
