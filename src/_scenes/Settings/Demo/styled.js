import { Flex, Box, S1, Text } from '_components';
import styled from 'styled-components';
import { cssConstants } from '_constants';

export const DemoWrapper = Flex.extend`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;

export const DataWrapper = Flex.extend`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const SectionWrapper = Box.extend`
  max-height: 75vh;
  overflow-y: auto;
`;

export const SectionData = Box.extend`
  padding: 0.5em;
`;

export const SectionText = S1.extend`
  font-size: 1rem;
  font-weight: bold;
`;

export const RowWrapper = Box.extend`
  padding: 0.5em;
`;

export const FeatureGroupWrapper = styled.div`
  padding: 20px 25px;
  background-color: ${cssConstants.PRIMARY_LIGHTER_GRAY};
  box-shadow: 1px 1px 3px ${cssConstants.PRIMARY_LIGHT_GRAY};
  margin-top: 2rem;
`;

export const FeatureGroupTitle = Text.extend`
  font-size: ${cssConstants.TITLE_SIZE_H4};
  font-weight: ${cssConstants.TITLE_WEIGHT_H4};
  color: ${cssConstants.PRIMARY_DARKEST_GRAY};
  margin-bottom: 20px;
`;

export const FeatureInputLabel = Text.extend`
  font-size: 12px;
  color: ${cssConstants.PRIMARY_GRAY};
  margin-bottom: 10px;
`;

export const SoupedUpSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: ${cssConstants.PRIMARY_GRAY};
    border: none;
    border-radius: 3px;
  }

  ::-moz-range-track {
    width: 100%;
    height: 5px;
    background: ${cssConstants.PRIMARY_GRAY};
    border: none;
    border-radius: 3px;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -5px;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${cssConstants.PRIMARY_WHITE};
    border: 1px solid ${cssConstants.PRIMARY_DARK_BLUE};
  }

  ::-moz-range-thumb {
    margin-top: -5px;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${cssConstants.PRIMARY_WHITE};
    border: 1px solid ${cssConstants.PRIMARY_DARK_BLUE};
  }

  :-moz-focusring {
    outline: 1px solid white;
    outline-offset: -1px;
  }

  :focus::-moz-range-track {
    background: ${cssConstants.PRIMARY_GRAY};
  }

  :focus {
    outline: none;
  }
`;
