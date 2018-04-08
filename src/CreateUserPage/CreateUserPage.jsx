import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input, Checkbox, HelpBlockDiv, OuterWrapper, H3, Label, S1 } from '../_components';

import { userActions } from '../_actions';

class CreateUserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isAdmin: false
      },
      submitted: false,
      emailHadFocus: false,
      firstNameHadFocus: false,
      lastNameHadFocus: false,
      passwordHadFocus: false,
      validEmail: false,
      validPassword: false,
      createEnabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    const { user, validEmail, validPassword } = this.state;

    if (name === 'isAdmin') { value = event.target.checked ? true : false; }

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
    this.setState({ submitted: false });
    this.setState({ createEnabled: validEmail && validPassword && user.firstName.length > 0 && user.lastName.length > 0 });
    if (name === 'password' && !this.passCheck(value)) { 
      this.setState({ createEnabled: false });
    } else if (name === 'email' && !this.emailCheck(value)) { 
      this.setState({ createEnabled: false });
    } else if (name === 'firstName' && value.length === 0) { 
      this.setState({ createEnabled: false });
    } else if (name === 'lastName' && value.length === 0) { 
      this.setState({ createEnabled: false });
    } else {
      this.setState({ createEnabled: true });
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
    const { validEmail, validPassword } = this.state;
    
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && validEmail && validPassword) {
      dispatch(userActions.register(user));
    }
  }

  emailCheck(email) {
    const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    const emailOK = emailRegex.test(email);
    this.setState({ validEmail: emailOK });
    return emailOK;
  }

  passCheck(password) {
    // Password must be at least 8 characters long, with at least one uppercase letter, lowercase letter, number, and special character.
    // const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/;
    
    // Password must be at least 8 characters long, with at least one number and at least one letter.
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passOK = passRegex.test(password);
    this.setState({ validPassword: passOK });
    return passOK;
  }

  render() {
    const { registering  } = this.props;
    const { user, submitted, emailHadFocus, passwordHadFocus, firstNameHadFocus, lastNameHadFocus, validEmail, validPassword, createEnabled } = this.state;
    return (
      <OuterWrapper> 
        <H3 style={{paddingLeft:'50px'}}>Create User</H3>
        <HelpBlockDiv type={this.props.alert.type} show={this.props.alert} style={{paddingLeft:'50px'}}>{this.props.alert.message}</HelpBlockDiv>

        <form name="form" onSubmit={this.handleSubmit} style={{width:'500px', padding:'50px', paddingTop: '0px'}}>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" name="firstName" id="firstName" value={user.firstName} valid={user.firstName} inValid={!user.firstName && (submitted || firstNameHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
          <HelpBlockDiv type='alert-danger' show={!user.firstName && (submitted || firstNameHadFocus)}>First Name is required</HelpBlockDiv>

          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" name="lastName" id="lastName" value={user.lastName} valid={user.lastName} inValid={!user.lastName && (submitted || lastNameHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
          <HelpBlockDiv type='alert-danger' show={!user.lastName && (submitted || lastNameHadFocus)}>Last Name is required</HelpBlockDiv>

          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" id="email"  autoComplete="new-email" value={user.email} valid={validEmail} inValid={!validEmail && (submitted || emailHadFocus)} onChange={this.handleChange} onBlur={this.handleBlur} />
          <HelpBlockDiv type='alert-danger' show={!validEmail && (submitted || emailHadFocus)}>A valid Email is required</HelpBlockDiv>
        
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password"  autoComplete="new-password" value={user.password} inValid={!validPassword && (submitted || passwordHadFocus)} valid={validPassword} onChange={this.handleChange} onBlur={this.handleBlur} />
          <HelpBlockDiv type='alert-danger' show={!validPassword && (submitted || passwordHadFocus)}>Password must be at least 8 characters long, with at least one number and at least one letter.</HelpBlockDiv>

          <Checkbox type="checkbox" name="isAdmin" value="isAdmin" label="Admin Privileges?" onChange={this.handleChange} onBlur={this.handleBlur} />
          <br />

          <Button disabled={!createEnabled}>Create</Button>
          {registering && 
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="processing spinner" />
          }
          <S1><Link to="/dashboard">Cancel</Link></S1>
        </form>
      </OuterWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  const { alert } = state;
  return {
    registering,
    alert
  };
}

const connectedCreateUserPage = connect(mapStateToProps)(CreateUserPage);
export { connectedCreateUserPage as CreateUserPage };