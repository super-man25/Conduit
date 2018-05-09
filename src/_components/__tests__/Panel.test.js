import React from 'react';
import { Panel, PanelHeader, PanelContent } from '_components';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Panel>No Content</Panel>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with a header', () => {
  const tree = renderer
    .create(
      <Panel>
        <PanelHeader>This is a header</PanelHeader>
      </Panel>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with a header and content', () => {
  const tree = renderer
    .create(
      <Panel>
        <PanelHeader>This is a header</PanelHeader>
        <PanelContent>This is the panels content</PanelContent>
      </Panel>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
