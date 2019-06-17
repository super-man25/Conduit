import React from 'react';
import renderer from 'react-test-renderer';
import { PricingPreview } from '../PricingPreview';

it('renders correctly', () => {
  const props = {
    loading: false,
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
