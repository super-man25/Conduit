import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectGlobal } from 'styled-components';

import { userActions } from '../_actions';
import { Button, Input, HelpBlockDiv, OuterWrapper, ContentWrapper } from '../_components';
import LogoName from './LogoName';
import LoginFormDiv from './LoginFormDiv';
import { cssConstants } from '../_constants';
// import { media } from '../_helpers';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: '',
      password: '',
      submitted: false,
      emailHadFocus: false,
      passwordHadFocus: false,
      validEmail: false,
      loginEnabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    injectGlobal`
      body {
        background: ${cssConstants.SECONDARY_GREEN};
      }
      
      @font-face {
        font-family: 'Roboto Regular';
        src: url('../fonts/Operator-Mono.ttf');
      }
    `;
  }

  handleChange(e) {       
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ submitted: false });
    this.setState({ loginEnabled: this.state.validEmail && this.state.password });
    if (name === 'password' && value.length === 0) { 
      // console.log('%c password is empty, setting loginEnabled to false', 'color: red');
      this.setState({ loginEnabled: false });
    } else if (name === 'email' && !this.emailCheck(value)) { 
      this.setState({ loginEnabled: false });
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
    const { dispatch } = this.props;
    dispatch(userActions.login(email, password));
  }

  emailCheck(email) {
    const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    const emailOK = emailRegex.test(email);
    this.setState({ validEmail: emailOK });
    return emailOK;
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted, emailHadFocus, passwordHadFocus, validEmail, loginEnabled } = this.state;
    
    return (
      <OuterWrapper login>
        <ContentWrapper login>
          <LoginFormDiv>
            <LogoName>Event Dynamic</LogoName>
            <h5>Log In</h5>
            
            <form name="form" onSubmit={this.handleSubmit}>
              
              <div>
                <label htmlFor="email">Email Address</label>
                
                <Input type="text" name="email" value={email} valid={validEmail} inValid={!validEmail && (submitted || emailHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
                <HelpBlockDiv type='error' show={!validEmail && (submitted || emailHadFocus)}>A valid Email is required</HelpBlockDiv>
              </div>
              
              <div className={'form-group' + (!password && (submitted || passwordHadFocus) ? ' has-error' : '')}>
                <label htmlFor="password">Password</label>
               
                <Input inValid type="password" className="form-control" name="password" id="password" value={password} onChange={this.handleChange} onBlur={this.handleBlur} />
                <HelpBlockDiv show={!password && (submitted || passwordHadFocus)}>Password is required</HelpBlockDiv>
              </div>
              
              <div className="form-group">
                <Button disabled={!loginEnabled}>Login</Button>
                {loggingIn &&
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="processing spinner"/>
                }
                <br/>
                <Link to="/register" className="btn btn-link">Forgot password?</Link>
              </div>
            
            </form>
          </LoginFormDiv>
        </ContentWrapper>
      </OuterWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 