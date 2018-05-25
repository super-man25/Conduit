// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  EDText,
  Flex,
  Input,
  Setting,
  SettingEditButton,
  SettingBorderButton,
  H5,
  HelpBlockDiv,
  Spacing
} from '_components';
import {
  validateEmail,
  validatePhoneNumber,
  orDash
} from '_helpers/string-utils';
import { actions as userActions } from '_state/user';
import type { EDUser } from '_models';
import { titleCase } from '_helpers/string-utils';
import { withClickAway } from '_hoc';

const ContactInfoWrapper = withClickAway(Flex.extend`
  flex-direction: column;
  width: 100%;
  margin: 2rem 0;
  padding: 0;
`);

const SettingButtonGroup = Flex.extend`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ContactSection = Flex.extend`
  align-items: start;
  flex-direction: column;
`;

const ContactText = EDText.extend`
  font-size: 1.2rem;
  margin: '1rem 0';
`;

type Props = {
  userActions: {
    changePassword: (e: any) => void,
    update: (e: any) => void,
    updateEmail: (e: any) => void
  },
  authState: {
    model: {}
  }
};

type State = {
  confirmPassword: string,
  editEmail: boolean,
  editName: boolean,
  editPassword: boolean,
  editPhoneNumber: boolean,
  newPassword: string,
  password: string,
  passwordsMatch: boolean,
  user: EDUser,
  touchedFields: EDUser
};

class ContactInfo extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      confirmPassword: '',
      editEmail: false,
      editName: false,
      editPassword: false,
      editPhoneNumber: false,
      newPassword: '',
      password: '',
      passwordsMatch: false,
      user: props.authState.model,
      touchedFields: {}
    };
  }

  reset = () => {
    this.setState({
      confirmPassword: '',
      editEmail: false,
      editName: false,
      editPassword: false,
      editPhoneNumber: false,
      newPassword: '',
      password: '',
      passwordsMatch: false,
      user: this.props.authState.model,
      touchedFields: {}
    });
  };

  handleEditClick = (editFlagName) => {
    this.reset();
    this.setState({ [editFlagName]: true });
  };

  handlePasswordChange = (event) => {
    const { value } = event.target;
    this.setState({ password: value });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;

    if (name === 'confirmPassword' || name === 'newPassword') {
      this.setState({ [name]: value });
      this.matchingPasswordCheck(name, value);
    } else {
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
    }
  };

  handleBlur = (e) => {
    const touchedFields = Object.assign({}, this.state.touchedFields);
    touchedFields[e.target.name] = true;
    this.setState({ touchedFields });
  };

  matchingPasswordCheck = (name, value) => {
    const { newPassword, confirmPassword } = this.state;
    let passwordsMatch = false;

    if (name === 'confirmPassword') {
      passwordsMatch =
        newPassword === value && newPassword.length >= 8 && value.length >= 8;
    } else {
      passwordsMatch =
        value === confirmPassword &&
        newPassword.length >= 8 &&
        value.length >= 8;
    }

    this.setState({ passwordsMatch });
    return passwordsMatch;
  };

  savePersonalInfo = (e) => {
    e.preventDefault();

    const editFlagName = e.target.parentElement.id;
    const { user } = this.state;

    if (editFlagName === 'editPhoneNumber') {
      if (validatePhoneNumber(user.phoneNumber)) {
        this.props.userActions.update(user);
        this.reset();
      }
    } else {
      if (user.firstName.length >= 1 && user.lastName.length >= 1) {
        this.props.userActions.update(user);
        this.reset();
      }
    }
  };

  saveEmail = (e) => {
    e.preventDefault();

    const { user, password } = this.state;

    if (validateEmail(user.email) && password !== '' && password.length >= 8) {
      this.props.userActions.updateEmail({
        email: user.email,
        password
      });
      this.reset();
    } else {
      const touchedFields = Object.assign({}, this.state.touchedFields);
      touchedFields.password = true;
      this.setState({ touchedFields });
    }
  };

  savePassword = (e) => {
    e.preventDefault();

    const {
      password,
      passwordsMatch,
      newPassword,
      confirmPassword
    } = this.state;

    if (passwordsMatch && password !== '' && password.length >= 8) {
      this.props.userActions.changePassword({
        password,
        newPassword,
        confirmNewPassword: confirmPassword
      });
      this.reset();
    }
  };

  render() {
    const {
      user,
      editName,
      editEmail,
      editPhoneNumber,
      editPassword,
      newPassword,
      confirmPassword,
      password,
      passwordsMatch,
      touchedFields
    } = this.state;

    return (
      <ContactInfoWrapper onClickAway={this.reset}>
        <H5 type="secondary">Basic Settings</H5>
        <br />
        <Setting cols={3} id="editName">
          <ContactText>Name</ContactText>
          {editName ? (
            <React.Fragment>
              <ContactSection>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={user.firstName}
                  valid={user.firstName.length >= 1 && touchedFields.firstName}
                  inValid={user.firstName.length < 1 && touchedFields.firstName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={user.lastName}
                  valid={user.lastName.length >= 1 && touchedFields.lastName}
                  inValid={user.lastName.length < 1 && touchedFields.lastName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </ContactSection>
              <SettingButtonGroup>
                <SettingBorderButton onClick={this.savePersonalInfo}>
                  Save
                </SettingBorderButton>
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactSection>
                <ContactText>
                  {titleCase(`${user.firstName} ${user.lastName}`)}
                </ContactText>
              </ContactSection>
              <SettingEditButton
                onClick={() => this.handleEditClick('editName')}
              />
            </React.Fragment>
          )}
        </Setting>
        <Spacing margin="1rem 0" />
        <Setting cols={3} id="editEmail">
          <ContactText>Contact Email</ContactText>
          {editEmail ? (
            <React.Fragment>
              <ContactSection>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.handleChange}
                  valid={validateEmail(user.email) && touchedFields.email}
                  inValid={!validateEmail(user.email) && touchedFields.email}
                  onBlur={this.handleBlur}
                />
                <HelpBlockDiv
                  type="alert-danger"
                  show={!validateEmail(user.email) && touchedFields.email}
                >
                  A valid Email is required
                </HelpBlockDiv>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handlePasswordChange}
                  valid={password.length >= 8}
                  inValid={password.length < 8 && touchedFields.password}
                  onBlur={this.handleBlur}
                />
                <HelpBlockDiv
                  type="alert-danger"
                  show={password.length < 8 && touchedFields.password}
                >
                  Password must be at least 8 characters
                </HelpBlockDiv>
              </ContactSection>
              <SettingButtonGroup>
                <SettingBorderButton onClick={this.saveEmail}>
                  Save
                </SettingBorderButton>
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactText>{user.email}</ContactText>
              <SettingEditButton
                onClick={() => this.handleEditClick('editEmail')}
              />
            </React.Fragment>
          )}
        </Setting>
        <Spacing margin="1rem 0" />
        <Setting cols={3} id="editPhoneNumber">
          <ContactText>Phone Number</ContactText>
          {editPhoneNumber ? (
            <React.Fragment>
              <ContactSection>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={user.phoneNumber || ''}
                  valid={
                    validatePhoneNumber(user.phoneNumber) &&
                    touchedFields.phoneNumber
                  }
                  inValid={
                    !validatePhoneNumber(user.phoneNumber) &&
                    touchedFields.phoneNumber
                  }
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <HelpBlockDiv
                  type="alert-danger"
                  show={
                    !validatePhoneNumber(user.phoneNumber) &&
                    touchedFields.phoneNumber
                  }
                >
                  Must be a valid U.S. Phone Number or Left Blank
                </HelpBlockDiv>
              </ContactSection>
              <SettingButtonGroup>
                <SettingBorderButton onClick={this.savePersonalInfo}>
                  Save
                </SettingBorderButton>
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactSection>
                <ContactText>{orDash(user.phoneNumber)}</ContactText>
              </ContactSection>
              <SettingEditButton
                onClick={() => this.handleEditClick('editPhoneNumber')}
              />
            </React.Fragment>
          )}
        </Setting>
        <Spacing margin="1rem 0" />
        <Setting cols={3} id="editPassword">
          <ContactText>Change Password</ContactText>
          {editPassword ? (
            <React.Fragment>
              <ContactSection>
                <Input
                  type="password"
                  name="password"
                  id="oldPassword"
                  placeholder="Old Password"
                  value={password}
                  onChange={this.handlePasswordChange}
                  valid={password.length >= 8}
                  inValid={password.length < 8 && touchedFields.password}
                  onBlur={this.handleBlur}
                />
                <HelpBlockDiv
                  type="alert-danger"
                  show={password.length < 8 && touchedFields.password}
                >
                  Password must be at least 8 characters
                </HelpBlockDiv>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={this.handleChange}
                  valid={
                    passwordsMatch &&
                    newPassword !== '' &&
                    touchedFields.confirmPassword
                  }
                  inValid={
                    (!passwordsMatch || newPassword === '') &&
                    touchedFields.confirmPassword
                  }
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  valid={
                    passwordsMatch &&
                    confirmPassword !== '' &&
                    touchedFields.confirmPassword
                  }
                  inValid={
                    (!passwordsMatch || confirmPassword === '') &&
                    touchedFields.confirmPassword
                  }
                  onBlur={this.handleBlur}
                />
                <HelpBlockDiv
                  type="alert-danger"
                  show={!passwordsMatch && touchedFields.confirmPassword}
                >
                  Passwords must match and be at least 8 characters
                </HelpBlockDiv>
              </ContactSection>
              <SettingButtonGroup>
                <SettingBorderButton onClick={this.savePassword}>
                  Save
                </SettingBorderButton>
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactSection>
                <ContactText>xxxxxxxxxx</ContactText>
              </ContactSection>
              <SettingEditButton
                onClick={() => this.handleEditClick('editPassword')}
              />
            </React.Fragment>
          )}
        </Setting>
      </ContactInfoWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    authState: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
