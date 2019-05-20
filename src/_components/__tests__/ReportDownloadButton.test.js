import React from 'react';
import { ReportDownloadButton } from '_components';
import renderer from 'react-test-renderer';

it('renders correctly when downloading is false', () => {
  const props = { onClick: jest.fn(), downloading: false };
  const tree = renderer.create(<ReportDownloadButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when downloading is true', () => {
  const props = { onClick: jest.fn(), downloading: true };
  const tree = renderer.create(<ReportDownloadButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
