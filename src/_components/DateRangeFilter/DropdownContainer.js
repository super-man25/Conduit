import styled from 'styled-components';
import { withClickAway } from '_hoc';

export const DropdownContainer = withClickAway(styled.div`
  position: relative;
  cursor: pointer;
`);
DropdownContainer.displayName = 'DropdownContainer';
