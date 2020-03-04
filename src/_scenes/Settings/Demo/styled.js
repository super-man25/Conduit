import { Flex, Box, S1, Text } from '_components';
import styled from 'styled-components';
import { colors } from '_constants';

export const DemoWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;

export const DataWrapper = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const SectionWrapper = styled(Box)`
  max-height: 75vh;
  overflow-y: auto;
`;

export const SectionData = styled(Box)`
  padding: 0.5em;
`;

export const SectionText = styled(S1)`
  font-size: 1rem;
  font-weight: bold;
`;

export const RowWrapper = styled(Box)`
  padding: 0.5em;
`;

export const FeatureGroupWrapper = styled.div`
  padding: 20px 25px;
  background-color: ${colors.lightGray};
  box-shadow: 1px 1px 3px ${colors.lightGray};
  margin-top: 2rem;
`;

export const FeatureGroupTitle = styled(Text)`
  font-size: 18px;
  font-weight: normal;
  color: ${colors.gray};
  margin-bottom: 20px;
`;

export const FeatureInputLabel = styled(Text)`
  font-size: 12px;
  color: ${colors.gray};
  margin-bottom: 10px;
`;

export const SoupedUpSlider = styled.input`
  appearance: none;
  width: 100%;
  background: transparent;

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: ${colors.gray};
    border: none;
    border-radius: 3px;
  }

  ::-moz-range-track {
    width: 100%;
    height: 5px;
    background: ${colors.gray};
    border: none;
    border-radius: 3px;
  }

  ::-webkit-slider-thumb {
    appearance: none;
    margin-top: -5px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${colors.white};
    border: 1px solid ${colors.blue};
  }

  ::-moz-range-thumb {
    margin-top: -5px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${colors.white};
    border: 1px solid ${colors.blue};
  }

  :-moz-focusring {
    outline: 1px solid white;
    outline-offset: -1px;
  }

  :focus::-moz-range-track {
    background: ${colors.gray};
  }

  :focus {
    outline: none;
  }
`;
