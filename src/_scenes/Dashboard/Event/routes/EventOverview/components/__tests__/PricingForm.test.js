import React from 'react';
import renderer from 'react-test-renderer';
import { PricingForm } from '../PricingForm';

const defaultProps = {
  initialValues: {
    eventScore: 1,
    eventScoreModifier: 1,
    spring: 1,
    springModifier: 1
  },
  pendingFactors: {
    eventScore: 1,
    eventScoreModifier: 1,
    spring: 1,
    springModifier: 1
  },
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  eventId: 1,
  fetchAutomatedSpring: jest.fn(),
  onCancel: jest.fn(),
  pricingPreview: {
    error: null,
    loading: false
  }
};

it('render correctly', () => {
  const tree = renderer.create(<PricingForm {...defaultProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
