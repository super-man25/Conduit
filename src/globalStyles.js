import { createGlobalStyle } from 'styled-components';
import { colors } from '_constants';

export const GlobalStyles = createGlobalStyle`
  :root {
    --PRIMARY_LIGHT_BLUE: #0A169A;
    --SECONDARY_BLUE: #2670ae;
    --PRIMARY_LIGHT_GRAY: #d1d1d1;
    --PRIMARY_LIGHTER_GRAY: #eeeeee;
    --PRIMARY_DARK_GRAY: #767676;
  }

  * {
    box-sizing: border-box;
    outline: none;
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    background: #ffffff;
    color: ${colors.black};
  }

  a {
    text-decoration: none;
    color: ${colors.black};
  }

  input {
    border: none;
  }

  button + button {
    margin-left: 5px;
  }

  #root {
    height: 100%;
  }
  
  /*
    react-day-picker styles
  */
  .DayPicker-Caption {
    color: var(--PRIMARY_LIGHT_BLUE);
  }
  
  .DayPicker-Month {
    margin-top: 1.75rem !important;
  }
  
  .DayPicker-Day--selected:not(.DayPicker-Day--outside):not(.DayPicker-Day--disabled) {
    background-color: var(--PRIMARY_LIGHT_BLUE);
  }
  
  .DayPicker-Day--selected:not(.DayPicker-Day--from):not(.DayPicker-Day--to):not(.DayPicker-Day--outside) {
    background-color: rgba(56, 169, 219, 0.3) !important;
    color: #333333;
  }

  .DayPicker-Day {
    border-radius: 0 !important;
    padding: 0.7rem !important;
  }

  .DayPicker-Day--from:not(.DayPicker-Day--outside) {
    background-color: var(--PRIMARY_LIGHT_BLUE) !important;
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
    color: #ffffff;
  }

  .DayPicker-Day--to:not(.DayPicker-Day--outside) {
    background-color: var(--PRIMARY_LIGHT_BLUE) !important;
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
    color: #ffffff !important;
  }

  .DayPickerInput-Overlay.DayPickerInput-Overlay--AlignRight {
    left: initial;
    right: 0;
  }
`;
