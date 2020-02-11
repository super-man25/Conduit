import React from 'react';
import renderer from 'react-test-renderer';
import {
  Field,
  FieldErrorText,
  Label,
  ModalBody,
  ModalHeader,
  NumberInput,
  Title,
} from '../styled';

describe('BulkUpdateModal styled components', () => {
  it('<Field /> renders correctly', () => {
    const tree = renderer.create(<Field />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('<FieldErrorText /> renders correctly', () => {
    const tree = renderer
      .create(<FieldErrorText>Text</FieldErrorText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('<Label /> renders correctly', () => {
    const tree = renderer.create(<Label>Label</Label>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('<ModalBody /> renders correctly', () => {
    const tree = renderer.create(<ModalBody>Modal Body</ModalBody>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('<ModalHeader /> renders correctly', () => {
    const tree = renderer
      .create(<ModalHeader>Modal Header</ModalHeader>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('<NumberInput /> renders correctly', () => {
    const tree = renderer
      .create(<NumberInput type="number" placeholder="$ Manual Price" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('<Title /> renders correctly', () => {
    const tree = renderer.create(<Title>Title</Title>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
