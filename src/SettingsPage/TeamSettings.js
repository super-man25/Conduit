import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { cssConstants } from '../_constants';
// import { clientActions } from '../_actions';   // client = team
import { Setting, SettingEditButton, SettingSaveButton, SettingReadonlyValue, SettingEditableValue } from '../_components';

export const TeamSettingsDiv = styled.div`
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

class TeamSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editTeam: false,
      editColors: false,
      editInterval: false,
      editIntegrations: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
  }

  handleButtonClick(e) {
    e.preventDefault();
    const editFlagName = e.target.parentElement.id;
    if (e.target.tagName === 'DIV') { // the 'SAVE' button was clicked
      // here we would have a switch / case statement on editFlagName, where
      // we would retrieve the data to be saved from the input elements
      let saveData;
      switch (editFlagName) {
        case 'editTeam':
          saveData = 1;
          break;
        case 'editColors':
          saveData = 2;
          break;
        case 'editInterval':
          saveData = 3;
          break;
        case 'editIntegrations':
          saveData = 4;
          break;
        default:
          saveData = 0;
      }
      console.log(`~~~~~ saveData was: ${saveData} ~~~~~`);
      // create the string to use for SAVE action
      const saveAction = `CLIENT_SAVE_${editFlagName.toUpperCase().substr(4)}`;
      console.log(`~~~~~ we would have dispatched a ${saveAction} action ~~~~~`);
      this.setState({ [editFlagName]: false });
    } else { // the 'EDIT' link was clicked
      this.setState({ [editFlagName]: true });
    }
  }

  render() {
    // const { user, users } = this.props;
    const { editTeam, editColors, editInterval, editIntegrations } = this.state;
    return (
      <TeamSettingsDiv>
        Team Settings
        <br />
        <Setting edit={editTeam} id='editTeam'>
          Team
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton onClick={this.handleButtonClick} />
          <SettingReadonlyValue>
            New York Mets
          </SettingReadonlyValue>
          <SettingEditableValue>
            This is where the Input would go
          </SettingEditableValue>
        </Setting>
        <Setting edit={editColors} id='editColors'>
          Set team colors
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton onClick={this.handleButtonClick} />
          <SettingReadonlyValue>
            Blue - hex #002D72, Orange - hex #FC4C02
          </SettingReadonlyValue>
          <SettingEditableValue>
            This is where the Input would go
          </SettingEditableValue>
        </Setting>
        <Setting edit={editInterval} id='editInterval'>
          Generate pricing updates every
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton onClick={this.handleButtonClick} />
          <SettingReadonlyValue>
            15 minutes
          </SettingReadonlyValue>
          <SettingEditableValue>
            This is where the Input would go
          </SettingEditableValue>
        </Setting>
        <Setting edit={editIntegrations} id='editIntegrations'>
          Team ticket integrations
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton onClick={this.handleButtonClick} />
          <SettingReadonlyValue>
            Stubhub - On
            <br />
            VividSeats - On
            <br />
            Tickets.com
            <br />
            SeatGeek - On
            <br />
            Ticketmaster - On
            <br />
            EventBrite - On
            <br />
            TicketFly - On
          </SettingReadonlyValue>
          <SettingEditableValue>
            This is where the Input would go
          </SettingEditableValue>
        </Setting>
      </TeamSettingsDiv>
    );
  }
}

export { TeamSettings as TeamSettingsTest };

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedTeamSettings = connect(mapStateToProps)(TeamSettings);
export { connectedTeamSettings as TeamSettings };
