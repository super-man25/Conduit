import { createGlobalStyle } from 'styled-components';

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
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: Proxima Nova, Roboto, Helvetica, sans-serif;
    font-size: 14px;
    background: #ffffff;
  }

  a {
    text-decoration: none;
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
  
  /*
    react-virtualized styles
  */
  .ReactVirtualized__Table {
    background-color: #070707;
  }
  
  .ReactVirtualized__Grid {
    outline: none;
  }
  
  /* For some reason by default React virtualized thinks its good to force text-transform: uppercase... */
  .ReactVirtualized__Table__headerRow {
    border-bottom: 1px solid var(--PRIMARY_DARK_GRAY);
    text-transform: none !important;
  }
  
  .ReactVirtualized__Table__row--even {
    background-color: var(--PRIMARY_LIGHTER_GRAY);
  }
  
  .ReactVirtualized__Table__row--conflicting {
    background-color: rgba(255, 99, 71, 0.25);
  }
  
  .ReactVirtualized__Table__row:hover {
    box-shadow: inset 4px 0 0 var(--PRIMARY_LIGHT_BLUE);
    background-color: #eaf6fb;
  }
  
`;
