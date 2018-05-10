import {
  HelpBlockDiv,
  Input,
  LinkButton,
  Setting,
  SettingCancelButton,
  SettingEditableValue,
  SettingReadonlyValue,
  SettingSaveButton,
  Spacing
} from '_components';
import { cssConstants } from '_constants';
import { validateEmail, validatePhoneNumber } from '_helpers/string-utils';
import { actions as userActions } from '_state/auth';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

const ContactInfoContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  color: ${cssConstants.PRIMARY_GRAY};
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.4px;
  > * {
    color: ${cssConstants.PRIMARY_DARKEST_GRAY};
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.4px;
    line-height: 30px;
  }
  background: transparent;
`;

class ContactInfoSettings extends React.Component {
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

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.matchingPasswordCheck = this.matchingPasswordCheck.bind(this);
    this.reset = this.reset.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.savePersonalInfo = this.savePersonalInfo.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }

  reset() {
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
  }

  handleEditClick(e) {
    const editFlagName = e.target.parentElement.id;
    this.reset();
    this.setState({ [editFlagName]: true });
  }

  handlePasswordChange(event) {
    const { value } = event.target;
    this.setState({ password: value });
  }

  handleChange(event) {
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
  }

  handleBlur(e) {
    const touchedFields = Object.assign({}, this.state.touchedFields);
    touchedFields[e.target.name] = true;
    this.setState({ touchedFields });
  }

  matchingPasswordCheck(name, value) {
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
  }

  savePersonalInfo(e) {
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
  }

  saveEmail(e) {
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
  }

  savePassword(e) {
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
  }

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
      <ContactInfoContainer>
        Basic Contact Information
        <br />
        <Setting edit={editName} id="editName">
          Name
          <LinkButton
            onClick={this.handleEditClick}
            content="EDIT"
            right
            settings
          />
          <SettingCancelButton onClick={this.reset} />
          <SettingSaveButton onClick={this.savePersonalInfo} />
          <SettingReadonlyValue>
            {user.firstName} {user.lastName}
          </SettingReadonlyValue>
          <SettingEditableValue>
            <Spacing margin="-10px 0px 0px 0px">
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
            </Spacing>
          </SettingEditableValue>
        </Setting>
        <Setting edit={editEmail} id="editEmail">
          Contact Email
          <LinkButton
            onClick={this.handleEditClick}
            content="EDIT"
            right
            settings
          />
          <SettingCancelButton onClick={this.reset} />
          <SettingSaveButton onClick={this.saveEmail} />
          <SettingReadonlyValue>{user.email}</SettingReadonlyValue>
          <SettingEditableValue>
            <Spacing margin="-10px 0px 0px 0px">
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
              <Spacing margin="30px 0px 0px 0px">
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
              </Spacing>
            </Spacing>
          </SettingEditableValue>
        </Setting>
        <Setting edit={editPhoneNumber} id="editPhoneNumber">
          Phone Number
          <LinkButton
            onClick={this.handleEditClick}
            content="EDIT"
            right
            settings
          />
          <SettingCancelButton onClick={this.reset} />
          <SettingSaveButton onClick={this.savePersonalInfo} />
          <SettingReadonlyValue>{user.phoneNumber || '-'}</SettingReadonlyValue>
          <SettingEditableValue>
            <Spacing margin="-10px 0px 0px 0px">
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
            </Spacing>
          </SettingEditableValue>
        </Setting>
        <Setting edit={editPassword} id="editPassword">
          Change Password
          <LinkButton
            onClick={this.handleEditClick}
            content="EDIT"
            right
            settings
          />
          <SettingCancelButton onClick={this.reset} />
          <SettingSaveButton onClick={this.savePassword} />
          <SettingReadonlyValue>********</SettingReadonlyValue>
          <SettingEditableValue>
            <Spacing margin="-10px 0px 0px 0px">
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
              <Spacing margin="30px 0px 0px 0px">
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
              </Spacing>
            </Spacing>
          </SettingEditableValue>
        </Setting>
      </ContactInfoContainer>
    );
  }
}

ContactInfoSettings.propTypes = {
  userActions: PropTypes.shape(),
  authState: PropTypes.shape({
    model: PropTypes.shape()
  })
};

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

export default connect(mapStateToProps, mapDispatchToProps)(
  ContactInfoSettings
);
