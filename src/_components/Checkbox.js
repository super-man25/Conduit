import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Label } from './StyledTags';

// const MaterialIcon = (props) => (
//   <i className={`material-icons ${props.className}`}>account_balance</i>
// );

// // WORKS 🎉
// const Icon = styled(MaterialIcon)`
//   background-color: green;
//   font-size: 50px;
// `;

// goals of the Checkbox component
// - to match the appearance of the Style Guide checkboxes for:
// --- default state              - white background with PRIMARY_DARK_GRAY stroke
// --- checked state              - PRIMARY_LIGHT_BLUE bg and stroke, with a white checkmark
// --- disabled state unchecked   - PRIMARY_LIGHT_GRAY background and stroke
// --- disabled state checked     - PRIMARY_LIGHT_GRAY bg and stroke, with a white checkmark
// - to be styled accordingly when the following props are passed in:
// --- rtl (right-to-left)        - switch to farsi alignment, on the right side of the container
// --- alignEnd                   - switch the position of the inline label and the checkbox

const MdcFormFieldDiv = styled.div`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-decoration: inherit;
  text-transform: inherit;
  color: rgba(0, 0, 0, 0.87);
  /* @alternate */
  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin-left: -11px;
`;

const MdcCheckboxDiv = styled.div`
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  padding: 11px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: transparent;
  will-change: transform, opacity;
`;

const MdcCheckboxInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`;

const MdcCheckboxBgDiv = styled.div`
  /* @noflip */
  left: 11px;
  /* @noflip */
  right: initial;
  display: inline-flex;
  position: absolute;
  top: 11px;
  bottom: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 45%;
  height: 45%;
  transition: background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
    border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
`;

const MdcCheckboxCheckmarkSvg = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  opacity: 0;
`;

const MdcCheckboxCheckmarkPath = styled.path`
  transition: stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: white !important;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.78334;
  stroke-dasharray: 29.78334;
  fill: none;
`;

const MdcCheckboxMixedmarkDiv = styled.div`
  width: 100%;
  height: 2px;
  -webkit-transform: scaleX(0) rotate(0deg);
  transform: scaleX(0) rotate(0deg);
  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
    -webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transition: opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
    transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),
    -webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  opacity: 0;
  background-color: white;
`;

export const Checkbox = (props) => {
  const { label } = props;

  return (
    <MdcFormFieldDiv>
      <MdcCheckboxDiv>
        <MdcCheckboxInput />
        <MdcCheckboxBgDiv>
          <MdcCheckboxCheckmarkSvg viewbox="0 0 24 24">
            <MdcCheckboxCheckmarkPath
              fill="none"
              stroke="white"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </MdcCheckboxCheckmarkSvg>
          <MdcCheckboxMixedmarkDiv />
        </MdcCheckboxBgDiv>
      </MdcCheckboxDiv>
      <Label>{label}</Label>
    </MdcFormFieldDiv>
  );
};

Checkbox.propTypes = {
  label: PropTypes.label
};
