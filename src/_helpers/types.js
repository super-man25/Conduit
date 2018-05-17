// @flow
// common flow types

export type Option = {
  label: string,
  value: any
};

export type Filter = Option;

export type DateRange = {
  from: ?Date,
  to: ?Date
};
