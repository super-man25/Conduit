import React from 'react';
import renderer from 'react-test-renderer';
import { EventPricingPresenter } from '../EventPricing';

const defaultProps = {
  event: {
    id: 1
  },
  togglingBroadcasting: false,
  setBroadcasting: jest.fn(),
  fetchPricingPreview: jest.fn(),
  pricingPreviewParamsChanged: jest.fn(),
  fetchAutomatedSpring: jest.fn(),
  saveAdminModifiers: jest.fn(),
  seasonId: 1,
  pendingFactors: {
    eventScore: 1,
    eventScoreModifier: 1,
    spring: 1,
    springModifier: 1
  },
  pricingPreview: {
    record: 'record',
    loading: false
  },
  handleModifierChange: jest.fn(),
  resetFactors: jest.fn()
};

it('renders correctly', () => {
  const tree = renderer.create(<EventPricingPresenter {...defaultProps} />);
  expect(tree).toMatchSnapshot();
});
