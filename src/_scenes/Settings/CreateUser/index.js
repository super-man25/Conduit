// @flow

import {
  ApiAlert,
  Button,
  HelpBlockDiv,
  Input,
  Label,
  Flex,
  H3
} from '_components';
import { actions as usersActions } from '_state/user';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { EDUser } from '_models';

const CreateUserWrapper = Flex.extend`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;

type Props = {
  usersActions: {
    create: (user: EDUser) => void
  },
  userState: {
    creating: boolean
  },
  authState: {
    model: EDUser
  }
};

type State = {
  user: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean,
    clientId: ?number
  },
  submitted: boolean,
  emailHadFocus: boolean,
  firstNameHadFocus: boolean,
  lastNameHadFocus: boolean,
  validEmail: boolean,
  createEnabled: boolean
};

class CreateUser extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isAdmin: false,
        clientId: null
      },
      submitted: false,
      emailHadFocus: false,
      firstNameHadFocus: false,
      lastNameHadFocus: false,
      validEmail: false,
      createEnabled: false
    };
  }

  handleChange = (event) => {
    const { name, value: rawValue } = event.target;
    const value = name === 'isAdmin' ? !!event.target.checked : rawValue;
    const { user, validEmail } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
    this.setState({ submitted: false });
    this.setState({
      createEnabled:
        validEmail && user.firstName.length > 0 && user.lastName.length > 0
    });
    if (name === 'email' && !this.emailCheck(value)) {
      this.setState({ createEnabled: false });
    } else if (name === 'firstName' && value.length === 0) {
      this.setState({ createEnabled: false });
    } else if (name === 'lastName' && value.length === 0) {
      this.setState({ createEnabled: false });
    } else {
      this.setState({ createEnabled: true });
    }
  };

  handleBlur = (e) => {
    const { name } = e.target;
    if (name === 'email') {
      this.setState({ emailHadFocus: true });
    } else if (name === 'firstName') {
      this.setState({ firstNameHadFocus: true });
    } else if (name === 'lastName') {
      this.setState({ lastNameHadFocus: true });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { validEmail } = this.state;

    this.setState({ submitted: true });
    const { user } = this.state;
    user.clientId = this.props.authState.model.clientId;
    if (user.firstName && user.lastName && validEmail) {
      this.props.usersActions.create(user);
    }
  };

  emailCheck(email) {
    const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    const emailOK = emailRegex.test(email);
    this.setState({ validEmail: emailOK });
    return emailOK;
  }

  render() {
    const { userState } = this.props;

    const {
      user,
      submitted,
      emailHadFocus,
      firstNameHadFocus,
      lastNameHadFocus,
      validEmail,
      createEnabled
    } = this.state;
    return (
      <CreateUserWrapper>
        <ApiAlert />
        <form
          name="form"
          onSubmit={this.handleSubmit}
          style={{ width: '500px', padding: '50px', paddingTop: '0px' }}
        >
          <H3 type="secondary">Create User</H3>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={user.firstName}
            valid={user.firstName}
            inValid={!user.firstName && (submitted || firstNameHadFocus)}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <HelpBlockDiv
            type="alert-danger"
            show={!user.firstName && (submitted || firstNameHadFocus)}
          >
            First Name is required
          </HelpBlockDiv>

          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={user.lastName}
            valid={user.lastName}
            inValid={!user.lastName && (submitted || lastNameHadFocus)}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <HelpBlockDiv
            type="alert-danger"
            show={!user.lastName && (submitted || lastNameHadFocus)}
          >
            Last Name is required
          </HelpBlockDiv>

          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            autoComplete="new-email"
            value={user.email}
            valid={validEmail}
            inValid={!validEmail && (submitted || emailHadFocus)}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <HelpBlockDiv
            type="alert-danger"
            show={!validEmail && (submitted || emailHadFocus)}
          >
            A valid Email is required
          </HelpBlockDiv>

          <input
            type="checkbox"
            name="isAdmin"
            value="isAdmin"
            onChange={this.handleChange}
          />
          <label htmlFor="isAdmin"> Admin Privileges?</label>
          <br />
          <br />
          <br />
          <br />
          <br />

          <Button disabled={!createEnabled}>Create</Button>
          {userState.creating && (
            <img
              src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              alt="processing spinner"
            />
          )}
        </form>
      </CreateUserWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.user,
    authState: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    usersActions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
