import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Client as ClientModel } from '../_models';
import { cssConstants } from '../_constants';
import { clientActions } from '../_actions'; // client = team
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
      teamName: '',
      editpricingInterval: false,
      pricingInterval: 30,
      intervalName: '',
      editIntegrations: false,
      integrationsValue: [1, 2, 3, 4, 5, 6, 7] // just ids here - we'd getAll integrations like { id: [int], name: [str], on: [bool] }
    };

    // This binding is necessary to make `this` work in the callback
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(clientActions.getClient(localStorage.getItem('user').clientId))
      .then(() => { // set field values to data retrieved from api
        // this.setState({ teamName: this.props.client.name });
        this.setState({ pricingInterval: this.props.client.pricingInterval });
        this.setState({ intervalName: TeamSettings.intervalNameFromSelect() });
        return true;
      });
  }

  handleIntervalChange() {
    this.setState({ pricingInterval: document.getElementById('pricingInterval').value },
      () => { this.setState({ intervalName: TeamSettings.intervalNameFromSelect() }); }
    );
  }

  handleButtonClick(e) {
    e.preventDefault();
    const editFlagName = e.target.parentElement.id;
    if (e.target.tagName === 'DIV') { // the 'SAVE' button was clicked
      const attrName = editFlagName.substr(4); // derive name of state attribute from editFlagName
      this.props.dispatch(clientActions.updateClient(attrName, this.state[attrName]));
      this.setState({ [editFlagName]: false });
    } else { // the 'EDIT' link was clicked
      this.setState({ [editFlagName]: true });
    }
  }

  render() {
    const { client } = this.props;
    const { editTeam, editpricingInterval, pricingInterval, editIntegrations, intervalName } = this.state;
    return (
      <TeamSettingsDiv>
        Team Settings
        <br />
        <Setting edit={editTeam} id='editTeam'>
          Team
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton onClick={this.handleButtonClick} />
          <SettingReadonlyValue>
            {client.name}
          </SettingReadonlyValue>
          <SettingEditableValue>
            Team (name?) Input would go here
          </SettingEditableValue>
        </Setting>
        <Setting edit={editpricingInterval} id='editpricingInterval'>
          Generate pricing updates every
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton onClick={this.handleButtonClick} />
          <SettingReadonlyValue>
            {intervalName}
          </SettingReadonlyValue>
          <SettingEditableValue>
            <SelectBox noBg id="pricingInterval" value={pricingInterval} onChange={this.handleIntervalChange}>
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

TeamSettings.propTypes = {
  client: ClientModel, // some attributes of the client are undefined initially, that is a problem
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const { client } = state;
  return {
    client
  };
}

const connectedTeamSettings = connect(mapStateToProps)(TeamSettings);
export { connectedTeamSettings as TeamSettings };
