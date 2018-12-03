// @flow
import React from 'react';
import {
  Flex,
  Box,
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
import {
  MONTHS,
  DAYS_OF_WEEK,
  WEATHER_CONDITIONS,
  SECTIONS,
  OPPONENTS
} from './constants';

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

const InputWrapper = Box.extend`
  margin: 1em;
`;

const SectionWrapper = Box.extend`
  max-height: 75vh;
  overflow-y: auto;
`;

const SectionData = Box.extend`
  padding: 0.5em;
`;

const SectionText = S1.extend`
  font-size: 1rem;
  font-weight: bold;
`;

const RowWrapper = Box.extend`
  padding: 0.5em;
`;

const parseOption = (option) => option.title;
const getSelectedOption = (options, key) => options.find((o) => o.key === key);
const calculateExamples = () => {
  return Object.keys(SECTIONS).reduce((examples, sec_num) => {
    const section = SECTIONS[sec_num];
    const section_rows = section.row_numbers.map((row) => ({
      section: sec_num,
      degrees: section.degrees,
      distance: section.distance,
      row_number: row
    }));

    return examples.concat(section_rows);
  }, []);
};

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
      opponent_heuristic: 0,
      minutes_before: 1440,
      temp: 80,
      games_ahead: 2,
      win_loss_ratio: 0.6,
      is_wheelchair: false,
      home_opener: false
    },
    examples: calculateExamples()
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

  onSliderChange = (feature) => (event) => {
    let context = { ...this.state.context };
    context[feature] = Number(event.target.value);
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
      temp,
      minutes_before,
      opponent_heuristic
    } = this.state.context;

    const prices = this.props.demoState.prices;
    const examples = this.state.examples;
    const zippedData = prices.map((p, i) => [p, examples[i]]);

    // Group the examples by section
    const sections = zippedData.reduce((agg, data) => {
      if (agg[data[1].section] === undefined) {
        agg[data[1].section] = {
          min: 10000,
          max: 0,
          rows: []
        };
      }

      const sectionData = agg[data[1].section];
      sectionData.min = Math.min(sectionData.min, data[0]);
      sectionData.max = Math.max(sectionData.max, data[0]);
      sectionData.rows.push({
        row_number: data[1].row_number,
        price: data[0]
      });

      return agg;
    }, {});

    return (
      <PageWrapper>
        <PrimaryContent padding="2rem">
          <DemoWrapper>
            <H3 type="secondary">Model Demo</H3>
            <S1 weight="300">
              <i>Pricing model demo.</i>
            </S1>
            <DataWrapper>
              <Box width="50%">
                <H4>Date</H4>

                <InputWrapper>
                  <Label htmlFor="monthDrop">Month</Label>
                  <Dropdown
                    id="monthDrop"
                    selected={getSelectedOption(MONTHS, event_month)}
                    onChange={this.onDropdownChange('event_month')}
                    options={MONTHS}
                    parseOption={parseOption}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Label htmlFor="dayDrop">Day of week</Label>
                  <Dropdown
                    id="dayDrop"
                    selected={getSelectedOption(
                      DAYS_OF_WEEK,
                      event_day_of_week
                    )}
                    onChange={this.onDropdownChange('event_day_of_week')}
                    options={DAYS_OF_WEEK}
                    parseOption={parseOption}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Label htmlFor="homeOpener">Home Opener</Label>
                  <input
                    type="checkbox"
                    name="homeOpener"
                    value={home_opener}
                    onChange={this.onCheckboxChange('home_opener')}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Label htmlFor="minBefore">
                    Minutes Before ({minutes_before})
                  </Label>
                  <input
                    id="minBefore"
                    type="range"
                    min="0"
                    max="10080"
                    step="60"
                    value={minutes_before}
                    onChange={this.onSliderChange('minutes_before')}
                  />
                </InputWrapper>

                <H4>Opponent</H4>

                <InputWrapper>
                  <Label htmlFor="oppType">Type</Label>
                  <Dropdown
                    id="oppType"
                    selected={getSelectedOption(OPPONENTS, opponent_heuristic)}
                    onChange={this.onDropdownChange('opponent_heuristic')}
                    options={OPPONENTS}
                    parseOption={parseOption}
                  />
                </InputWrapper>

                <H4>Performance</H4>

                <InputWrapper>
                  <Label htmlFor="gamesAhead">
                    Games Ahead ({games_ahead})
                  </Label>
                  <input
                    id="gamesAhead"
                    type="range"
                    min="-20"
                    max="10"
                    step="1"
                    value={games_ahead}
                    onChange={this.onSliderChange('games_ahead')}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Label htmlFor="winLoss">
                    Win Loss Ratio ({win_loss_ratio})
                  </Label>
                  <input
                    id="winLoss"
                    type="range"
                    min="0"
                    max="1"
                    step=".05"
                    value={win_loss_ratio}
                    onChange={this.onSliderChange('win_loss_ratio')}
                  />
                </InputWrapper>

                <H4>Weather</H4>

                <InputWrapper>
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
                </InputWrapper>

                <InputWrapper>
                  <Label htmlFor="temp">Temperature ({temp}&deg;F)</Label>
                  <input
                    id="temp"
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={temp}
                    onChange={this.onSliderChange('temp')}
                  />
                </InputWrapper>
              </Box>
              <Box width="50%">
                <H4>Ticket Prices</H4>
                <SectionWrapper>
                  {Object.keys(sections).map((section) => (
                    <SectionData key={'section' + section}>
                      <SectionText>Section {section}</SectionText>
                      <RowWrapper>
                        {sections[section].rows.map((row) => (
                          <Box
                            key={'section' + section + 'row' + row.row_number}
                          >
                            Row {row.row_number} - ${row.price.toFixed(2)}
                          </Box>
                        ))}
                      </RowWrapper>
                    </SectionData>
                  ))}
                </SectionWrapper>
              </Box>
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
