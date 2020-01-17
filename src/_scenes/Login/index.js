// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { actions as authActions } from '_state/auth';
import stadiumImage from '_images/stadiumseats.jpg';
import EdLogoDark from '_images/logo_dark.svg';
import { validateEmail } from '_helpers/string-utils';
import type { EDUser } from '_models/user';
import {
  H3,
  HelpBlockDiv,
  ImageLayout,
  Input,
  Label,
  MailtoLink,
  Flex,
  AsyncButton,
} from '_components';
import {
  CenteredContainer,
  Content,
  LoginFooter,
  LogoImg,
  ForgotLink,
  HideMe,
} from './components/styled';

type Props = {
  authState: {
    error: ?Error,
    loggingIn: boolean,
    requestingPassword: boolean,
    forgot: boolean,
    model: ?EDUser,
  },
  authActions: typeof authActions,
  location: { state: { from: { pathname: string } } },
};

type State = {
  email: string,
  password: string,
  submitted: boolean,
  showAlert: boolean,
  touched: { [name: string]: boolean },
};

export class LoginPresenter extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    submitted: false,
    showAlert: false,
    touched: {},
  };

  submitEnabled() {
    const { email, password } = this.state;
    const { forgot, requestingPassword } = this.props.authState;
    const isValidPassword = !!password.length;
    const isValidEmail = validateEmail(email);

    if (forgot) {
      return isValidEmail && !requestingPassword;
    } else {
      return isValidPassword && isValidEmail;
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.authState.error &&
      this.props.authState.error !== prevProps.authState.error
    ) {
      this.setState({ showAlert: true });
    }
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = (e.currentTarget: HTMLInputElement);

    this.setState({
      [name]: value,
      submitted: false,
      showAlert: false,
    });
  };

  handleBlur = (e: SyntheticFocusEvent<HTMLInputElement>) => {
    const { name } = (e.currentTarget: HTMLInputElement);
    const { touched } = this.state;

    this.setState({
      touched: { ...touched, [name]: true },
    });
  };

  // handles submittal of Login / Forgot Password form
  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { forgot } = this.props.authState;
    const { email, password } = this.state;

    this.setState({ submitted: true });

    if (forgot) {
      this.props.authActions.forgotPass(email);
      this.setState({
        password: '',
        submitted: false,
        touched: {
          email: true,
          password: false,
        },
      });
    } else {
      this.props.authActions.signIn(email, password);
    }
  };

  handleForgotClick = () => {
    const { forgot } = this.props.authState;
    const { showForgotPass } = this.props.authActions;
    showForgotPass(!forgot);
  };

  isLoggedIn() {
    return !!this.props.authState.model;
  }

  render() {
    if (this.isLoggedIn()) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    }

    const { authState } = this.props;
    const { email, password, submitted, showAlert, touched } = this.state;
    const { forgot } = this.props.authState;
    const submitEnabled = this.submitEnabled();
    const validEmail = validateEmail(email);

    return (
      <ImageLayout imageSrc={`url(${stadiumImage})`}>
        <Content>
          <Flex>
            <CenteredContainer>
              <LogoImg src={EdLogoDark} alt="Event Dynamic Logo" />
              <H3 style={{ marginBottom: '5px' }}>
                {forgot ? 'Forgot Password' : 'Log In'}
              </H3>
              <form name="form" onSubmit={this.handleSubmit}>
                <HelpBlockDiv
                  type={'alert-danger'}
                  show={showAlert && submitted}
                  style={{
                    marginTop: showAlert && submitted ? '15px' : '0px',
                    marginBottom: showAlert && submitted ? '10px' : '0px',
                    fontWeight: 'bold',
                  }}
                >
                  Incorrect Email Address or Password.
                </HelpBlockDiv>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  data-test-id="email-input"
                  autoComplete="new-email"
                  value={email}
                  valid={validEmail && !(showAlert && submitted)}
                  invalid={
                    (!validEmail && (submitted || touched.email)) ||
                    (showAlert && submitted)
                  }
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <HelpBlockDiv
                  type="alert-danger"
                  show={!validEmail && (submitted || touched.email)}
                >
                  A valid Email is required
                </HelpBlockDiv>
                <HideMe show={!forgot}>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    data-test-id="password-input"
                    autoComplete="new-password"
                    value={password}
                    invalid={
                      (!password && (submitted || touched.password)) ||
                      (showAlert && submitted)
                    }
                    valid={password && !(showAlert && submitted)}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <HelpBlockDiv
                    type="alert-danger"
                    show={!password && (submitted || touched.password)}
                  >
                    Password is required
                  </HelpBlockDiv>
                </HideMe>
                <Flex justify="space-between" align="center">
                  <AsyncButton
                    id="login"
                    data-test-id="login-button"
                    disabled={!submitEnabled}
                    isLoading={
                      authState.loggingIn || authState.requestingPassword
                    }
                  >
                    Submit
                  </AsyncButton>
                  <ForgotLink onClick={this.handleForgotClick}>
                    {forgot ? 'Back to Log In' : 'Forgot Password?'}
                  </ForgotLink>
                </Flex>
              </form>
            </CenteredContainer>
          </Flex>
          <LoginFooter>
            If you do not already have an account please contact{' '}
            <MailtoLink href="mailto:info@eventdynamic.com">
              info@eventdynamic.com
            </MailtoLink>{' '}
            to begin setting up an account for your organization.
          </LoginFooter>
        </Content>
      </ImageLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    authState: state.auth,
    location: state.router.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPresenter);
