import React from 'react';
export const withRowStyles = (RowRenderer) => {
  const RowStylesRenderer = (props) => {
    const { className, index } = props;
    let newClassName = `${className} private`;
    if (index % 2) {
      newClassName += ' ReactVirtualized__Table__row--even';
    }
    return <RowRenderer {...props} className={newClassName} />;
  };
  return (props) => {
    return <RowStylesRenderer {...props} />;
  };
};
