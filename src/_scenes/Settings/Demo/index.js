// @flow
// TODO: Adding this eslint rule to get build passing for now. Need to write case conversion function for all these snakes and camels.
/* eslint-disable camelcase */
import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { Box, H3, H4, PageWrapper, PrimaryContent, S1 } from '_components';
import { connect } from 'react-redux';
import {
  actions as demoPriceActions,
  type State as DemoState,
} from '_state/demo';
import { DemoPriceContext, DemoPriceExample } from '_models';
import {
  MONTHS,
  DAYS_OF_WEEK,
  WEATHER_CONDITIONS,
  LIMITED_SECTIONS,
  OPPONENTS,
} from './constants';
import {
  DemoWrapper,
  DataWrapper,
  SectionWrapper,
  SectionData,
  SectionText,
  RowWrapper,
} from './styled';
import { DateFeatureGroup } from './DateFeatureGroup';
import { OpponentFeatureGroup } from './OpponentFeatureGroup';
import { PerformanceFeatureGroup } from './PerformanceFeatureGroup';
import { WeatherFeatureGroup } from './WeatherFeatureGroup';

type State = {
  context: DemoPriceContext,
  examples: Array<DemoPriceExample>,
};

type Props = {
  demoState: DemoState,
  fetch: (context: DemoPriceContext, examples: Array<DemoPriceExample>) => void,
};

const parseOption = (option) => option.title;
const getSelectedOption = (options, key) => options.find((o) => o.key === key);
const calculateExamples = () => {
  return Object.keys(LIMITED_SECTIONS).reduce((examples, sec_num) => {
    const section = LIMITED_SECTIONS[sec_num];
    const section_rows = section.row_numbers.map((row) => ({
      section: sec_num,
      degrees: section.degrees,
      distance: section.distance,
      row_number: row,
    }));

    return examples.concat(section_rows);
  }, []);
};

class DemoRoute extends React.Component<Props, State> {
  state = {
    demoState: {
      loading: false,
      prices: [],
      error: null,
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
      home_opener: false,
    },
    examples: calculateExamples(),
  };

  componentDidMount() {
    this.fetchPrices();
  }

  onCheckboxChange = (feature) => (event) => {
    let context = { ...this.state.context };
    context[feature] = event.target.checked;
    this.setState({ context }, this.debounceFetchPrices);
  };

  onDropdownChange = (feature) => (option) => {
    let context = { ...this.state.context };
    context[feature] = option.key;
    this.setState({ context }, this.debounceFetchPrices);
  };

  onSliderChange = (feature) => (event) => {
    let context = { ...this.state.context };
    context[feature] = Number(event.target.value);
    this.setState({ context }, this.debounceFetchPrices);
  };

  fetchPrices = () => {
    this.props.fetch(this.state.context, this.state.examples);
  };

  updateTemperature = (feature) => (event) => {
    let context = { ...this.state.context };
    context['temp'] = event.temperature;
    this.setState({ context }, () => this.onDropdownChange(feature)(event));
  };

  debounceFetchPrices = AwesomeDebouncePromise(
    this.fetchPrices.bind(this),
    500
  );

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
      opponent_heuristic,
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
          rows: [],
        };
      }

      const sectionData = agg[data[1].section];
      sectionData.min = Math.min(sectionData.min, data[0]);
      sectionData.max = Math.max(sectionData.max, data[0]);
      sectionData.rows.push({
        row_number: data[1].row_number,
        price: data[0],
      });

      return agg;
    }, {});

    return (
      <PageWrapper>
        <PrimaryContent padding="2rem" overflowY="visible">
          <DemoWrapper>
            <H3 type="secondary" size="28px" weight="heavy">
              Model Demo
            </H3>
            <S1 weight="300">
              <i>Pricing model demo.</i>
            </S1>
            <DataWrapper>
              <Box width="48%">
                <DateFeatureGroup
                  selectedMonth={getSelectedOption(MONTHS, event_month)}
                  selectedDay={getSelectedOption(
                    DAYS_OF_WEEK,
                    event_day_of_week
                  )}
                  optionsMonth={MONTHS}
                  optionsDay={DAYS_OF_WEEK}
                  onMonthDropdownChange={this.updateTemperature('event_month')}
                  onDayDropdownChange={this.onDropdownChange(
                    'event_day_of_week'
                  )}
                  parseOption={parseOption}
                  homeOpenerIsChecked={home_opener}
                  onHomeOpenerChanged={this.onCheckboxChange('home_opener')}
                  minutesBeforeValue={minutes_before}
                  onMinutesBeforeChange={this.onSliderChange('minutes_before')}
                />

                <OpponentFeatureGroup
                  selectedOpponentType={getSelectedOption(
                    OPPONENTS,
                    opponent_heuristic
                  )}
                  onOpponentTypeChange={this.onDropdownChange(
                    'opponent_heuristic'
                  )}
                  optionsOpponentType={OPPONENTS}
                  parseOption={parseOption}
                />

                <PerformanceFeatureGroup
                  gamesAhead={games_ahead}
                  onGamesAheadChange={this.onSliderChange('games_ahead')}
                  winLossRatio={win_loss_ratio}
                  onWinLossRatioChange={this.onSliderChange('win_loss_ratio')}
                />

                <WeatherFeatureGroup
                  selectedWeatherCondition={getSelectedOption(
                    WEATHER_CONDITIONS,
                    weather_condition
                  )}
                  onWeatherConditionChange={this.onDropdownChange(
                    'weather_condition'
                  )}
                  optionsWeatherCondition={WEATHER_CONDITIONS}
                  parseOption={parseOption}
                  temp={temp}
                  onTempChange={this.onSliderChange('temp')}
                />
              </Box>
              <Box width="48%">
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
  demoState: state.demoPrice,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetch: (context, examples) =>
    dispatch(demoPriceActions.fetch({ context, examples })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoRoute);
