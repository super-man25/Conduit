// @flow

import styled from 'styled-components';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  EDText,
  Flex,
  Input,
  Setting,
  SettingEditButton,
  SettingSaveButton,
  H5,
  HelpBlockDiv,
  Spacing,
} from '_components';
import {
  validateEmail,
  validatePhoneNumber,
  orDash,
} from '_helpers/string-utils';
import { actions as userActions } from '_state/user';
import type { EDUser } from '_models';
import { withClickAway } from '_hoc';

const ContactInfoWrapper = withClickAway(styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin: 2rem 0;
  padding: 0;
`);

const SettingButtonGroup = styled(Flex)`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ContactSection = styled(Flex)`
  align-items: start;
  flex-direction: column;
`;

const ContactText = styled(EDText)`
  font-size: 1rem;
  margin: '1rem 0';
`;

type Props = {
  userActions: {
    changePassword: (e: any) => void,
    update: (e: any) => void,
    updateEmail: (e: any) => void,
  },
  authState: {
    model: {},
  },
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
  touchedFields: Object,
};

export class ContactInfo extends React.Component<Props, State> {
  constructor(props: Props) {
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
      touchedFields: {},
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
      touchedFields: {},
    });
  };

  handleEditClick = (editFlagName: string) => {
    this.reset();
    this.setState({ [editFlagName]: true });
  };

  handlePasswordChange = (event: SyntheticInputEvent<Input>) => {
    const { value } = event.target;
    this.setState({ password: value });
  };

  handleChange = (event: SyntheticInputEvent<Input>) => {
    const { name, value } = event.target;
    const { user } = this.state;

    if (name === 'confirmPassword' || name === 'newPassword') {
      this.setState({ [name]: value });
      this.matchingPasswordCheck(name, value);
    } else {
      this.setState({
        user: {
          ...user,
          [name]: value,
        },
      });
    }
  };

  handleBlur = (e: SyntheticInputEvent<Input>) => {
    const touchedFields = Object.assign({}, this.state.touchedFields);
    touchedFields[e.target.name] = true;
    this.setState({ touchedFields });
  };

  matchingPasswordCheck = (name: string, value: string) => {
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

  saveName = (e: SyntheticInputEvent<SettingSaveButton>) => {
    e.preventDefault();

    const { user } = this.state;

    if (user.firstName.length >= 1 && user.lastName.length >= 1) {
      this.props.userActions.update(user);
      this.reset();
    }
  };

  savePhoneNumber = (e: SyntheticInputEvent<SettingSaveButton>) => {
    e.preventDefault();

    const { user } = this.state;

    if (validatePhoneNumber(user.phoneNumber)) {
      this.props.userActions.update(user);
      this.reset();
    }
  };

  saveEmail = (e: SyntheticInputEvent<SettingSaveButton>) => {
    e.preventDefault();

    const { user, password } = this.state;

    if (validateEmail(user.email) && password !== '' && password.length >= 8) {
      this.props.userActions.updateEmail({
        email: user.email,
        password,
      });
      this.reset();
    } else {
      const touchedFields = Object.assign({}, this.state.touchedFields);
      touchedFields.password = true;
      this.setState({ touchedFields });
    }
  };

  savePassword = (e: SyntheticInputEvent<SettingSaveButton>) => {
    e.preventDefault();

    const {
      password,
      passwordsMatch,
      newPassword,
      confirmPassword,
    } = this.state;

    if (passwordsMatch && password !== '' && password.length >= 8) {
      this.props.userActions.changePassword({
        password,
        newPassword,
        confirmNewPassword: confirmPassword,
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
      touchedFields,
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
                  data-test-id="first-name-input"
                  placeholder="First Name"
                  value={user.firstName}
                  valid={user.firstName.length >= 1 && touchedFields.firstName}
                  invalid={user.firstName.length < 1 && touchedFields.firstName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  data-test-id="last-name-input"
                  placeholder="Last Name"
                  value={user.lastName}
                  valid={user.lastName.length >= 1 && touchedFields.lastName}
                  invalid={user.lastName.length < 1 && touchedFields.lastName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </ContactSection>
              <SettingButtonGroup>
                <SettingSaveButton
                  onClick={this.saveName}
                  data-test-id="save-name-button"
                />
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactSection>
                <ContactText data-test-id="full-name-text">
                  {user.firstName} {user.lastName}
                </ContactText>
              </ContactSection>
              <SettingEditButton
                weight="bold"
                onClick={() => this.handleEditClick('editName')}
                data-test-id="edit-name-button"
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
                  invalid={!validateEmail(user.email) && touchedFields.email}
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
                  invalid={password.length < 8 && touchedFields.password}
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
                <SettingSaveButton onClick={this.saveEmail} />
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactText>{user.email}</ContactText>
              <SettingEditButton
                weight="bold"
                onClick={() => this.handleEditClick('editEmail')}
              />
            </React.Fragment>
          )}
        </Setting>
        <Spacing margin="1rem 0" />
        <Setting cols={3} id="editPhoneNumber">
          <ContactText data-test-id="phone-number-text">
            Phone Number
          </ContactText>
          {editPhoneNumber ? (
            <React.Fragment>
              <ContactSection>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  data-test-id="phone-number-input"
                  placeholder="Phone Number"
                  value={user.phoneNumber || ''}
                  valid={
                    validatePhoneNumber(user.phoneNumber) &&
                    touchedFields.phoneNumber
                  }
                  invalid={
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
                <SettingSaveButton
                  onClick={this.savePhoneNumber}
                  data-test-id="save-phone-number-button"
                />
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactSection>
                <ContactText>{orDash(user.phoneNumber)}</ContactText>
              </ContactSection>
              <SettingEditButton
                weight="bold"
                onClick={() => this.handleEditClick('editPhoneNumber')}
                data-test-id="edit-phone-number-button"
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
                  invalid={password.length < 8 && touchedFields.password}
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
                  invalid={
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
                  invalid={
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
                <SettingSaveButton onClick={this.savePassword} />
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ContactSection>
                <ContactText>xxxxxxxxxx</ContactText>
              </ContactSection>
              <SettingEditButton
                weight="bold"
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
    authState: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
