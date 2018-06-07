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
import styled from 'styled-components';
import edLogoImage from '_images/eventdynamiclogo.svg';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LoginFooter = styled.div`
  padding: 40px;
  background-color: ${cssConstants.PRIMARY_EVEN_LIGHTER_GRAY};
  font-size: 10px;
  line-height: 130%;
`;

const LogoImg = styled.img`
  display: block;
  margin: auto;
  padding: 40px;
  paddingtop: 10px;
  width: 40%;
`;

export class LoginPresenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
      emailHadFocus: false,
      validEmail: false,
      passwordHadFocus: false,
      loginEnabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ submitted: false });
    // this next step needs to NOT depend on the state value of something that is/was changed by this event
    // state will probably not be updated in time for it's value to be up-to-date...
    if (name === 'password') {
      if (value.length === 0) {
        // check the password value directly
        this.setState({ loginEnabled: false });
      } else {
        this.setState({ loginEnabled: !!this.state.validEmail }); // rely on state for the value of validEmail
      }
    } else if (name === 'email') {
      if (!this.emailCheck(value)) {
        // check the email directly
        this.setState({ loginEnabled: false });
      } else {
        this.setState({ loginEnabled: !!this.state.password }); // rely on state for the value of password
      }
    }
  }

  handleBlur(e) {
    const { name } = e.target;
    if (name === 'email') {
      this.setState({ emailHadFocus: true });
    } else if (name === 'password') {
      this.setState({ passwordHadFocus: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    this.props.authActions.signIn(email, password);
  }

  emailCheck(email) {
    const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    const emailOK = emailRegex.test(email);
    this.setState({ validEmail: emailOK });
    return emailOK;
  }

  render() {
    const { authState } = this.props;
    const { alertState } = this.props;
    const {
      email,
      password,
      submitted,
      emailHadFocus,
      passwordHadFocus,
      validEmail,
      loginEnabled
    } = this.state;

    return (
      <ImageLayout imageSrc={`url(${stadiumImage})`}>
        <Content>
          <FlexItem>
            <Spacing padding="20% 40px 40px">
              <CenteredContainer maxWidth="400px">
                <LogoImg src={edLogoImage} alt="Event Dynamic Logo" />
                <H3 style={{ marginBottom: '5px' }}>Log In</H3>
                <form name="form" onSubmit={this.handleSubmit}>
                  <HelpBlockDiv
                    type={alertState.type}
                    show={alertState.show && submitted}
                    style={{
                      marginTop: alertState.show && submitted ? '15px' : '0px',
                      marginBottom:
                        alertState.show && submitted ? '10px' : '0px',
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
                    valid={validEmail && !(alertState.show && submitted)}
                    inValid={
                      (!validEmail && (submitted || emailHadFocus)) ||
                      (alertState.show && submitted)
                    }
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <HelpBlockDiv
                    type="alert-danger"
                    show={!validEmail && (submitted || emailHadFocus)}
                  >
                    A valid Email is required
                  </HelpBlockDiv>

                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    data-test-id="password-input"
                    autoComplete="new-password"
                    value={password}
                    inValid={
                      (!password && (submitted || passwordHadFocus)) ||
                      (alertState.show && submitted)
                    }
                    valid={password && !(alertState.show && submitted)}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <HelpBlockDiv
                    type="alert-danger"
                    show={!password && (submitted || passwordHadFocus)}
                  >
                    Password is required
                  </HelpBlockDiv>

                  <Button
                    disabled={!loginEnabled}
                    id="login"
                    data-test-id="login-button"
                  >
                    {authState.pending ? (
                      <Loader small color={cssConstants.PRIMARY_WHITE} />
                    ) : (
                      'Login'
                    )}
                  </Button>
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
  authState: PropTypes.shape(),
  authActions: PropTypes.shape()
};

function mapStateToProps(state) {
  return {
    authState: state.auth,
    alertState: state.alert
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPresenter);
