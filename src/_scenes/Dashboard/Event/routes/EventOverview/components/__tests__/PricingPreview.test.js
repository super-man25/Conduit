import React from 'react';
import renderer from 'react-test-renderer';
import { PricingPreview } from '../PricingPreview';

it('renders correctly', () => {
  const props = {
    loading: false,
    record: {
      event: {
        min: 52.18,
        max: 1147.73,
        mean: 186.57703
      },
      sections: {
        14: {
          min: 421.36,
          max: 1120.58,
          mean: 592.9125
        },
        114: {
          min: 285.06,
          max: 856.69,
          mean: 393.8181
        }
      }
    },
    error: null,
    springError: null
  };
  const tree = renderer.create(<PricingPreview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the loading preview', () => {
  const props = {
    loading: true,
    record: {
      event: {},
      sections: []
    },
    error: null,
    springError: null
  };

  const tree = renderer.create(<PricingPreview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the error preview', () => {
  const props = {
    loading: false,
    record: {
      event: {},
      sections: []
    },
    error: new Error('Error fetching pricing preview'),
    springError: new Error('Error fetching spring value')
  };

  const tree = renderer.create(<PricingPreview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
