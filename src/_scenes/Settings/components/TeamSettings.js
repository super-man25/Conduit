import {
  SelectBox,
  Setting,
  SettingEditButton,
  SettingEditableValue,
  SettingReadonlyValue,
  SettingSaveButton
} from '_components';
import { cssConstants } from '_constants';
import actions from '_state/clients/actions';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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

const intervals = [
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '6 hours', value: 360 },
  { label: 'daily', value: 1440 }
];

function findLabel(value) {
  const sO = intervals.find((obj) => {
    return obj.value === value;
  });
  return sO.label;
}

export class TeamSettingsPresenter extends React.Component {
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

    // These bindings are necessary to make `this` work in the callbacks
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
  }

  static getDerivedStateFromProps(props, current_state) {
    if (
      props.client.pricingInterval &&
      current_state.pricingInterval !== props.client.pricingInterval
    ) {
      return {
        teamName: props.client.name,
        pricingInterval: props.client.pricingInterval,
        intervalName: findLabel(props.client.pricingInterval)
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    this.props.dispatch(actions.getClient());
  }

  handleIntervalChange(e) {
    const sI = e.target.selectedIndex;
    this.setState({ pricingInterval: intervals[sI].value });
    this.setState({ intervalName: intervals[sI].label });
  }

  handleButtonClick(e) {
    e.preventDefault();
    const editFlagName = e.target.parentElement.id;
    if (e.target.tagName === 'DIV') {
      // the 'SAVE' button was clicked
      const attrName = editFlagName.substr(4); // derive name of state attribute from editFlagName
      this.props.dispatch(actions.updateClient(attrName, this.state[attrName]));
      this.setState({ [editFlagName]: false });
    } else {
      // the 'EDIT' link was clicked
      this.setState({ [editFlagName]: true });
    }
  }

  render() {
    const {
      editTeam,
      teamName,
      editpricingInterval,
      pricingInterval,
      editIntegrations,
      intervalName
    } = this.state;
    return (
      <TeamSettingsDiv>
        Team Settings
        <br />
        <Setting edit={editTeam} id="editTeam">
          Team
          <SettingEditButton noEdit />
          <SettingReadonlyValue>{teamName}</SettingReadonlyValue>
        </Setting>
        <Setting edit={editpricingInterval} id="editpricingInterval">
          Generate pricing updates every
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton team onClick={this.handleButtonClick} />
          <SettingReadonlyValue>{intervalName}</SettingReadonlyValue>
          <SettingEditableValue>
            <SelectBox
              noBg
              value={pricingInterval}
              onChange={this.handleIntervalChange}
            >
              {intervals.map((o, key) => (
                <option key={key} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectBox>
          </SettingEditableValue>
        </Setting>
        <Setting edit={editIntegrations} id="editIntegrations">
          Team ticket integrations
          <SettingEditButton onClick={this.handleButtonClick} />
          <SettingSaveButton team onClick={this.handleButtonClick} />
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

TeamSettingsPresenter.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const { client, auth } = state;
  return {
    client,
    auth
  };
}

export default connect(mapStateToProps)(TeamSettingsPresenter);
