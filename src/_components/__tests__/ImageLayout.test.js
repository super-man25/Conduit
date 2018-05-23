import React from 'react';
import { ImageLayout } from '_components/ImageLayout';
import renderer from 'react-test-renderer';


it('renders correctly', () => {
  const tree = renderer.create(<ImageLayout imageSrc="url(test)" />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with children', () => {
  const tree = renderer
    .create(
      <ImageLayout imageSrc="url(test)">
        <div>content</div>
      </ImageLayout>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
