import React from 'react';
import {
  HideMe,
  ForgotLink,
  Content,
  LoginFooter,
  LogoImg
} from '../components/styled';
import edLogoImage from '_images/eventdynamiclogo.svg';
import renderer from 'react-test-renderer';

describe('Login styled components', () => {
  it('<HideMe /> should render correctly', () => {
    const tree = renderer.create(<HideMe />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<ForgotLink /> should render correctly', () => {
    const tree = renderer.create(<ForgotLink />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<Content /> should render correctly', () => {
    const tree = renderer.create(<Content />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<LoginFooter /> should render correctly', () => {
    const tree = renderer.create(<LoginFooter />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<LogoImg /> should render correctly', () => {
    const tree = renderer
      .create(<LogoImg src={edLogoImage} alt="Some alt text" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
