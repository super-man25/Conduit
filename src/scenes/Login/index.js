import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import LoginFormDiv from './components/LoginForm';
import LoginFooterDiv from './components/LoginFooter';
import { actions as authActions } from '../../state/auth';

import {
  Button,
  ContentWrapper,
  H3,
  HelpBlockDiv,
  Input,
  Label,
  LogoName,
  MailtoLink,
  OuterWrapper
} from '../../_components';

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
      if (value.length === 0) { // check the password value directly
        this.setState({ loginEnabled: false });
      } else {
        this.setState({ loginEnabled: this.state.validEmail }); // rely on state for the value of validEmail
      }
    } else if (name === 'email') {
      if (!this.emailCheck(value)) { // check the email directly
        this.setState({ loginEnabled: false });
      } else {
        this.setState({ loginEnabled: this.state.password }); // rely on state for the value of password
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
    const { email, password, submitted, emailHadFocus, passwordHadFocus, validEmail, loginEnabled } = this.state;

    return (
      <OuterWrapper login>
        <ContentWrapper login>
          <LoginFormDiv>
            <LogoName login />
            <H3 login>Log In</H3>
            {/* <HelpBlockDiv type={this.props.alert.type} show={this.props.alert}>{this.props.alert.message}</HelpBlockDiv> */}
            <br />
            <form name="form" onSubmit={this.handleSubmit}>
              <Label htmlFor="email">Email Address</Label>
              <Input type="text" name="email" id="email" autoComplete="new-email" value={email} valid={validEmail} inValid={!validEmail && (submitted || emailHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
              <HelpBlockDiv type='alert-danger' show={!validEmail && (submitted || emailHadFocus)}>A valid Email is required</HelpBlockDiv>

              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" id="password" autoComplete="new-password" value={password} inValid={!password && (submitted || passwordHadFocus)} valid={password} onChange={this.handleChange} onBlur={this.handleBlur} />
              <HelpBlockDiv type='alert-danger' show={!password && (submitted || passwordHadFocus)}>Password is required</HelpBlockDiv>

              <Button disabled={!loginEnabled} id='login'>Login</Button>
              {authState.pending &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="processing spinner"/>
              }
              <br />
            </form>
          </LoginFormDiv>
          <LoginFooterDiv>If you do not already have an account please contact <MailtoLink mailto="robert.smith@soldoutsports.com">robert.smith@soldoutsports.com</MailtoLink> to begin setting up an account for your organization.</LoginFooterDiv>
        </ContentWrapper>
      </OuterWrapper>
    );
  }
}

LoginPresenter.propTypes = {
  authActions: PropTypes.object, // eslint-disable-line
  authState: PropTypes.object, // eslint-disable-line
  alert: PropTypes.object // eslint-disable-line
};

function mapStateToProps(state) {
  return {
    authState: state.auth,
    alertState: state.alert
  };
}

function mapActionCreators(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(LoginPresenter);
