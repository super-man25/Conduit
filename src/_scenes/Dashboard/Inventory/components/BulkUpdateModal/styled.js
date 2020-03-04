import styled from 'styled-components';
import { colors } from '_constants';
import { Box, Text, H4, Checkbox } from '_components';

export const ModalHeader = styled.div`
  padding: 1.5rem;
  background-color: ${colors.lightGray};
  border-bottom: 1px solid ${colors.blue};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  background-color: ${colors.white};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const Title = styled(H4)`
  margin: 0;
  margin-bottom: 0.25rem;
  color: ${colors.black};
`;

export const NumberInput = styled.input`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray};
  border-radius: 3px;
  height: 40px;
  margin: 0;
  padding: 0 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.black};
`;

export const Field = styled(Box)`
  position: relative;
`;

export const FieldErrorText = styled(Text)`
  position: absolute;
  top: 100%;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-top: 15px;
`;
