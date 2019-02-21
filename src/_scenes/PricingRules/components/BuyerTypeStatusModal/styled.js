import styled from 'styled-components';
import { cssConstants } from '_constants';
import { H4, Flex, Input, Text } from '_components';
import { darken } from 'polished';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.4;
  background-color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  z-index: 9;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.27);
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  border-bottom: 1px solid ${cssConstants.PRIMARY_DARK_BLUE};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const ModalBody = styled.div`
  padding: 1rem 2rem;
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  border-bottom: 1px solid ${cssConstants.PRIMARY_DARK_BLUE};
`;

export const ModalFooter = styled.div`
  padding: 1.5rem;
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  border-bottom: ${cssConstants.PRIMARY_DARK_BLUE};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const BuyerTypeOption = Flex.extend`
  padding: 0 2rem;
  min-height: 45px;
  width: 100%;
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};

  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY};

  :hover {
    background-color: ${darken(0.05, cssConstants.PRIMARY_WHITE)};
  }
`;

export const FlexText = Text.extend`
  flex-basis: ${(props) => props.basis || '10%'};
`;

export const ErrorText = Text.extend`
  text-align: right;
`;

export const Title = H4.extend`
  margin: 0;
  margin-bottom: 2rem;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

export const FilterBuyerTypesInput = Input.extend`
  border-radius: 20px;
  height: 35px;
  width: 80px;
`;
