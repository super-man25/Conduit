// @flow

import {
  Setting,
  H5,
  Flex,
  EDText,
  SelectBox,
  SettingBorderButton
} from '_components';
import { toggleEditing } from '../stateChanges';
import React from 'react';
import { titleCase, orDash } from '_helpers/string-utils';
import { withClickAway } from '_hoc';

const TeamInfoWrapper = Flex.extend`
  flex-direction: column;
  justify-content: left;
  margin: 0;
  width: 85%;
`;

const SettingButtonGroup = Flex.extend`
  justify-content: space-evenly;
  align-items: center;
`;

const TeamSetting = withClickAway(Setting.extend``);

type Props = {
  name: string,
  pricingInterval: number,
  dirtyPricingInterval: number,
  resetDirtyPricingInterval: () => void,
  setPricingInterval: (number) => void,
  update: ({ pricingInterval: number }) => void
};

type State = {
  isEditing: boolean
};

type Interval = {
  label: string,
  value: number
};

const intervals: Array<Interval> = [
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '6 hours', value: 360 },
  { label: 'Daily', value: 1440 }
];

export class TeamInfo extends React.Component<Props, State> {
  state = {
    isEditing: false
  };

  toggleEditButton = (event: SyntheticMouseEvent<HTMLElement>) => {
    this.setState(toggleEditing);
    this.props.resetDirtyPricingInterval();
  };

  clickAway = () => {
    this.setState({ isEditing: false });
  };

  handlePricingIntervalChange = (
    event: SyntheticInputEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    const pricingInterval = parseInt(value, 10);
    this.props.setPricingInterval(pricingInterval);
  };

  handlePricingIntervalSave = (event: SyntheticMouseEvent<HTMLElement>) => {
    const { dirtyPricingInterval } = this.props;
    this.props.update({ pricingInterval: dirtyPricingInterval });
    this.setState(toggleEditing);
  };

  get pricingDescription() {
    const { pricingInterval } = this.props;

    if (!pricingInterval) {
      return `--`;
    }

    const interval = intervals.find(
      (interval) => interval.value === pricingInterval
    );

    if (interval) {
      return titleCase(interval.label);
    }

    return titleCase(`${pricingInterval} minutes`);
  }

  render() {
    const { isEditing } = this.state;
    const { name, dirtyPricingInterval } = this.props;

    const textProps = {
      size: 'large',
      margin: '1rem 0'
    };

    return (
      <TeamInfoWrapper>
        <H5 type="secondary">Basic Settings</H5>
        <Setting cols={3}>
          <EDText {...textProps}>Team</EDText>
          <EDText {...textProps}>{titleCase(orDash(name))}</EDText>
          <EDText {...textProps} />
        </Setting>
        <TeamSetting cols={3} onClickAway={this.clickAway}>
          <EDText {...textProps}>Generate pricing updates every</EDText>
          {isEditing ? (
            <React.Fragment>
              <SelectBox
                noBg
                size="large"
                onChange={this.handlePricingIntervalChange}
                value={dirtyPricingInterval}
              >
                {intervals.map((o, key) => (
                  <option key={key} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </SelectBox>
              <SettingButtonGroup>
                <SettingBorderButton onClick={this.handlePricingIntervalSave}>
                  Save
                </SettingBorderButton>
              </SettingButtonGroup>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <EDText {...textProps}>{this.pricingDescription}</EDText>
            </React.Fragment>
          )}
        </TeamSetting>
      </TeamInfoWrapper>
    );
  }
}

export default TeamInfo;
