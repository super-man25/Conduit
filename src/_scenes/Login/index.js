// @flow
import {
  Button,
  CenteredContainer,
  FlexItem,
  H3,
  HelpBlockDiv,
  ImageLayout,
  Input,
  Label,
  Loader,
  MailtoLink,
  Spacing
} from '_components';
import { cssConstants } from '_constants';
import stadiumImage from '_images/stadiumseats.jpg';
import { actions as authActions } from '_state/auth';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import edLogoImage from '_images/eventdynamiclogo.svg';
import {
  Content,
  LoginFooter,
  LogoImg,
  ForgotLink,
  HideMe
} from './components/styled';
import { validateEmail } from '_helpers/string-utils';

type Props = {
  authState: {
    error: ?Error,
    loggingIn: boolean
  },
  authActions: typeof authActions
};

type State = {
  email: string,
  password: string,
  forgot: boolean,
  submitted: boolean,
  showAlert: boolean,
  touched: { [name: string]: boolean }
};

export class LoginPresenter extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    forgot: false,
    submitted: false,
    showAlert: false,
    touched: {}
  };

  submitEnabled() {
    const { email, password, forgot } = this.state;
    const isValidPassword = !!password.length;
    const isValidEmail = validateEmail(email);

    if (forgot) {
      return isValidEmail;
    } else {
      return isValidPassword && isValidEmail;
    }
  }

  static getDerivedStateFromProps(props: Props) {
    if (props.authState.error) {
      return { showAlert: true };
    }

    return null;
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = (e.currentTarget: HTMLInputElement);

    this.setState({
      [name]: value,
      submitted: false,
      showAlert: false
    });
  };

  handleBlur = (e: SyntheticFocusEvent<HTMLInputElement>) => {
    const { name } = (e.currentTarget: HTMLInputElement);
    const { touched } = this.state;

    this.setState({
      touched: { ...touched, [name]: true }
    });
  };

  // handles submittal of Login / Forgot Password form
  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (this.state.forgot) {
      this.props.authActions.forgotPass(email);
    } else {
      this.props.authActions.signIn(email, password);
    }
  };

  handleForgotClick = () => {
    this.setState({ forgot: !this.state.forgot });
  };

  render() {
    const { authState } = this.props;
    const {
      email,
      password,
      forgot,
      submitted,
      showAlert,
      touched
    } = this.state;

    const submitEnabled = this.submitEnabled();
    const validEmail = validateEmail(email);

    return (
      <ImageLayout imageSrc={`url(${stadiumImage})`}>
        <Content>
          <FlexItem>
            <Spacing padding="20% 40px 40px">
              <CenteredContainer maxWidth="400px">
                <LogoImg src={edLogoImage} alt="Event Dynamic Logo" />
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
                      fontWeight: 'bold'
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
                    inValid={
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
                      inValid={
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
                  <Button
                    disabled={!submitEnabled}
                    id="login"
                    data-test-id="login-button"
                  >
                    {authState.loggingIn ? (
                      <Loader small color={cssConstants.PRIMARY_WHITE} />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                  <ForgotLink onClick={this.handleForgotClick}>
                    {forgot ? 'back to Login' : 'forgot password?'}
                  </ForgotLink>
                </form>
              </CenteredContainer>
            </Spacing>
          </FlexItem>
          <LoginFooter>
            If you do not already have an account please contact{' '}
            <MailtoLink mailto="robert.smith@soldoutsports.com">
              robert.smith@soldoutsports.com
            </MailtoLink>{' '}
            to begin setting up an account for your organization.
          </LoginFooter>
        </Content>
      </ImageLayout>
    );
  }
}

LoginPresenter.propTypes = {
  authState: PropTypes.shape()
};

function mapStateToProps(state) {
  return {
    authState: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPresenter);
