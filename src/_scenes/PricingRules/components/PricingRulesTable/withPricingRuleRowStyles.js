import * as React from 'react';
import { connect } from 'react-redux';

export const withPricingRuleRowStyles = (RowRenderer) => {
  class PricingRuleRowPresenter extends React.Component {
    render() {
      const { rowIsConflicting, className, index } = this.props;
      let newClassName = className;
      if (rowIsConflicting)
        newClassName += ' ReactVirtualized__Table__row--conflicting';
      if (index % 2) {
        newClassName += ' ReactVirtualized__Table__row--even';
      }

      return <RowRenderer {...this.props} className={newClassName} />;
    }
  }

  const mapStateToRowProps = ({ priceRule: { error } }, { rowData }) => ({
    rowIsConflicting: error && error.code === 409 && error.body === rowData.id
  });

  const PriceRuleRowRenderer = connect(
    mapStateToRowProps,
    null
  )(PricingRuleRowPresenter);

  return (props) => {
    return <PriceRuleRowRenderer {...props} />;
  };
};
