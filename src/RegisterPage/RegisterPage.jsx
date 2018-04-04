import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input, HelpBlockDiv, OuterWrapper, H3, Label, S1 } from '../_components';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      submitted: false,
      emailHadFocus: false,
      firstNameHadFocus: false,
      lastNameHadFocus: false,
      passwordHadFocus: false,
      validEmail: false,
      registerEnabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
    this.setState({ submitted: false });
    this.setState({ registerEnabled: this.state.validEmail && user.password && user.firstName && user.lastName });
    if (name === 'password' && value.length === 0) { 
      this.setState({ registerEnabled: false });
    } else if (name === 'email' && !this.emailCheck(value)) { 
      this.setState({ registerEnabled: false });
    } else if (name === 'firstName' && value.length === 0) { 
      this.setState({ registerEnabled: false });
    } else if (name === 'lastName' && value.length === 0) { 
      this.setState({ registerEnabled: false });
    }
  }

  handleBlur(e) {
    const { name } = e.target;
    if (name === 'email') {
      this.setState({ emailHadFocus: true });
    } else if (name === 'password') {
      this.setState({ passwordHadFocus: true });
    } else if (name === 'firstName') {
      this.setState({ firstNameHadFocus: true });
    } else if (name === 'lastName') {
      this.setState({ lastNameHadFocus: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.password) {
      dispatch(userActions.register(user));
    }
  }

  emailCheck(email) {
    const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    const emailOK = emailRegex.test(email);
    this.setState({ validEmail: emailOK });
    return emailOK;
  }

  render() {
    const { registering  } = this.props;
    const { user, submitted, emailHadFocus, passwordHadFocus, firstNameHadFocus, lastNameHadFocus, validEmail, registerEnabled } = this.state;
    return (
      <OuterWrapper> 
        <H3 style={{paddingLeft:'50px'}}>Register</H3>
        <HelpBlockDiv type={this.props.alert.type} show={this.props.alert} style={{paddingLeft:'50px'}}>{this.props.alert.message}</HelpBlockDiv>

        <form name="form" onSubmit={this.handleSubmit} style={{width:'500px', padding:'50px', paddingTop: '0px'}}>

            <Label htmlFor="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName" value={user.firstName} valid={user.firstName} inValid={!user.firstName && (submitted || firstNameHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
            <HelpBlockDiv type='alert-danger' show={!user.firstName && (submitted || firstNameHadFocus)}>First Name is required</HelpBlockDiv>

            <Label htmlFor="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" value={user.lastName} valid={user.lastName} inValid={!user.lastName && (submitted || lastNameHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
            <HelpBlockDiv type='alert-danger' show={!user.lastName && (submitted || lastNameHadFocus)}>Last Name is required</HelpBlockDiv>

            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" id="email" value={user.email} valid={validEmail} inValid={!validEmail && (submitted || emailHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
            <HelpBlockDiv type='alert-danger' show={!validEmail && (submitted || emailHadFocus)}>A valid Email is required</HelpBlockDiv>
          
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" value={user.password} inValid={!user.password} valid={user.password} onChange={this.handleChange} onBlur={this.handleBlur} />
            <HelpBlockDiv type='alert-danger' show={!user.password && (submitted || passwordHadFocus)}>Password is required</HelpBlockDiv>

            <Button disabled={!registerEnabled}>Register</Button>
            {registering && 
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="processing spinner" />
            }
            <S1><Link to="/login">Cancel</Link></S1>
        </form>
      </OuterWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };