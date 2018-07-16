// @flow
import * as React from 'react';

type SVGProps = {
  width: number,
  height: number,
  fill: string,
  styles: { [string]: any }
};

const defaultSVGProps = {
  width: 24,
  height: 24,
  fill: '#000'
};

export const ExpandMoreIcon = ({
  width,
  height,
  fill,
  styles,
  ...rest
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 24 24`}
    style={styles}
    {...rest}
  >
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

ExpandMoreIcon.defaultProps = defaultSVGProps;

export const ExpandLessIcon = ({
  width,
  height,
  fill,
  styles,
  ...rest
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={styles}
    {...rest}
  >
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

ExpandLessIcon.defaultProps = defaultSVGProps;

export const FilterListIcon = ({
  width,
  height,
  fill,
  styles,
  ...rest
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={styles}
    {...rest}
  >
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

FilterListIcon.defaultProps = defaultSVGProps;

export const ClearIcon = ({
  width,
  height,
  fill,
  styles,
  ...rest
}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={styles}
    {...rest}
  >
    <path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      fill={fill}
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

ClearIcon.defaultProps = defaultSVGProps;
