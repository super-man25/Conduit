import { isMobileDevice } from '_helpers';

export const getFilterOptions = () => {
  const filterOptions = [
    'All Time',
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Month to Date',
    'Previous Month',
    'Year to Date',
  ];

  if (!isMobileDevice) {
    filterOptions.push('Select Date Range');
  }

  return filterOptions;
};
