// @flow
import React from 'react';
import {
  Flex,
  H3,
  H4,
  Label,
  PageWrapper,
  PrimaryContent,
  S1,
  Dropdown
} from '_components';
import { connect } from 'react-redux';
import {
  actions as demoPriceActions,
  type State as DemoState
} from '_state/demo';
import { DemoPriceContext, DemoPriceExample } from '_models';
import { MONTHS, DAYS_OF_WEEK, WEATHER_CONDITIONS } from './constants';

type State = {
  context: DemoPriceContext,
  examples: Array<DemoPriceExample>
};

type Props = {
  demoState: DemoState,
  fetch: (context: DemoPriceContext, examples: Array<DemoPriceExample>) => void
};

const DemoWrapper = Flex.extend`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;

const DataWrapper = Flex.extend`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const parseOption = (option) => option.title;
const getSelectedOption = (options, key) => options.find((o) => o.key === key);

class DemoRoute extends React.Component<Props, State> {
  state = {
    demoState: {
      loading: false,
      prices: [],
      error: null
    },
    context: {
      event_month: 4,
      event_day_of_week: 5,
      weather_condition: 'clear',
      opponent_heuristic: 10,
      minutes_before: 1000,
      temp: 80,
      games_ahead: 2,
      win_loss_ratio: 0.6,
      is_wheelchair: false,
      home_opener: false
    },
    examples: [
      {
        degrees: 1,
        distance: 1,
        row_number: 1
      },
      {
        degrees: 1,
        distance: 1,
        row_number: 2
      },
      {
        degrees: 1,
        distance: 1,
        row_number: 3
      }
    ]
  };

  componentDidMount() {
    this.fetchPrices();
  }

  onCheckboxChange = (feature) => (event) => {
    let context = { ...this.state.context };
    context[feature] = event.target.checked;
    this.setState({ context }, this.fetchPrices);
  };

  onDropdownChange = (feature) => (option) => {
    let context = { ...this.state.context };
    context[feature] = option.key;
    this.setState({ context }, this.fetchPrices);
  };

  fetchPrices = () => {
    this.props.fetch(this.state.context, this.state.examples);
  };

  render() {
    const {
      event_month,
      event_day_of_week,
      home_opener,
      games_ahead,
      win_loss_ratio,
      weather_condition,
      temp
    } = this.state.context;

    const prices = this.props.demoState.prices;
    const examples = this.state.examples;

    return (
      <PageWrapper>
        <PrimaryContent padding="2rem">
          <DemoWrapper>
            <H3 type="secondary">Model Demo</H3>
            <S1 weight="300">
              <i>Pricing model demo.</i>
            </S1>
            <DataWrapper>
              <div>
                <H4>Event Date</H4>

                <Label htmlFor="monthDrop">Month</Label>
                <Dropdown
                  id="monthDrop"
                  selected={getSelectedOption(MONTHS, event_month)}
                  onChange={this.onDropdownChange('event_month')}
                  options={MONTHS}
                  parseOption={parseOption}
                />

                <Label htmlFor="dayDrop">Day of week</Label>
                <Dropdown
                  id="dayDrop"
                  selected={getSelectedOption(DAYS_OF_WEEK, event_day_of_week)}
                  onChange={this.onDropdownChange('event_day_of_week')}
                  options={DAYS_OF_WEEK}
                  parseOption={parseOption}
                />

                <Label htmlFor="homeOpener">Home Opener</Label>
                <input
                  type="checkbox"
                  name="homeOpener"
                  value={this.state.context.home_opener}
                  onChange={this.onCheckboxChange('home_opener')}
                />

                <H4>Performance</H4>

                <Label>Games Ahead</Label>

                <Label>Win Loss Ratio</Label>

                <H4>Weather</H4>

                <Label htmlFor="condDrop">Weather Condition</Label>
                <Dropdown
                  id="condDrop"
                  selected={getSelectedOption(
                    WEATHER_CONDITIONS,
                    weather_condition
                  )}
                  onChange={this.onDropdownChange('weather_condition')}
                  options={WEATHER_CONDITIONS}
                  parseOption={parseOption}
                />
              </div>
              <div>
                <ul>
                  {examples.map((example, idx) => (
                    <li key={idx}>
                      {example.degrees} - {example.distance} -{' '}
                      {example.row_number} {prices ? '- $' + prices[idx] : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </DataWrapper>
          </DemoWrapper>
        </PrimaryContent>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  demoState: state.demoPrice
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetch: (context, examples) =>
    dispatch(demoPriceActions.fetch({ context, examples }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemoRoute);
