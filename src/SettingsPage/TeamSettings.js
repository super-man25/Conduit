import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { cssConstants } from '../_constants';
// import { clientActions } from '../_actions';   // client = team
import { Setting, SettingEditButton, SettingSaveButton, SettingReadonlyValue, SettingEditableValue, SelectBox } from '../_components';

/* eslint react/no-did-mount-set-state: "off" */

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

  static intervalNameFromSelect() {
    const intervalSelect = document.getElementById('pricingInterval');
    return intervalSelect.options[intervalSelect.selectedIndex].innerHTML;
  }

  constructor(props) {
    super(props);

    this.state = {
      editTeam: false, // what do we expect to do here? Allow the client to change the team name, or... ? Client cannot change team?
      teamValue: 'fakeTeam',
      editInterval: false,
      intervalValue: 30,
      intervalName: '',
      editIntegrations: false,
      integrationsValue: [1, 2, 3, 4, 5, 6, 7] // just ids here - we'd getAll integrations like { id: [int], name: [str], on: [bool] }
    };

    // This binding is necessary to make `this` work in the callback
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
  }

  componentDidMount() {
    // maybe fetch some client data?
    this.setState({ intervalName: TeamSettings.intervalNameFromSelect() });
  }

  handleIntervalChange() {
    this.setState({ intervalValue: document.getElementById('pricingInterval').value },
      () => { this.setState({ intervalName: TeamSettings.intervalNameFromSelect() }); }
    );
  }

  handleButtonClick(e) {
    e.preventDefault();
    const editFlagName = e.target.parentElement.id;
    if (e.target.tagName === 'DIV') { // the 'SAVE' button was clicked
      // derive the name of the associated state attribute from editFlagName
      const attrName = `${editFlagName.substr(4).toLowerCase()}Value`;
      const saveData = this.state[attrName];
      // create the string to use for SAVE action
      const saveAction = `CLIENT_SAVE_${editFlagName.toUpperCase().substr(4)}`;
      console.log(`~~~~~ we would have dispatched a ${saveAction} action with data = ${saveData} ~~~~~`);
      // this.props.dispatch(saveAction, saveData);
      this.setState({ [editFlagName]: false });
    } else { // the 'EDIT' link was clicked
      this.setState({ [editFlagName]: true });
    }
  }

  render() {
    // const { user, users } = this.props;
    const { editTeam, editInterval, editIntegrations, intervalValue, intervalName } = this.state;
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
            Team (name?) Input would go here
          </SettingEditableValue>
        </Setting>
        <Setting edit={editInterval} id='editInterval'>
          Generate pricing updates every
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton onClick={this.handleButtonClick} />
          <SettingReadonlyValue>
            {intervalName}
          </SettingReadonlyValue>
          <SettingEditableValue>
            <SelectBox noBg id="pricingInterval" value={intervalValue} onChange={this.handleIntervalChange}>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="360">6 hours</option>
              <option value="1440">daily</option>
            </SelectBox>
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
            Tickets.com - On
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
            Integrations Input(s) would go here
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
