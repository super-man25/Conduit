import React from 'react';
import { ImageLayout } from './ImageLayout';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

it('renders correctly', () => {
  const tree = renderer
    .create(<ImageLayout imageSrc="url(test)" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with children', () => {
  const tree = renderer
    .create(
      <ImageLayout imageSrc="url(test)">
        <div>content</div>
      </ImageLayout>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
