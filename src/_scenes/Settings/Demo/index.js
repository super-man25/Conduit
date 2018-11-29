// @flow
import React from 'react';
import {
  Flex,
  H3,
  PageWrapper,
  PrimaryContent,
  S1,
  Spacing
} from '_components';
import { connect } from 'react-redux';
import {
  actions as demoPriceActions,
  type State as DemoState
} from '_state/demo';
import { DemoPriceContext, DemoPriceExample } from '_models';

type State = {
  demoState: DemoState,
  context: DemoPriceContext,
  examples: Array<DemoPriceExample>
};

type Props = {
  fetch: (context: DemoPriceContext, examples: Array<DemoPriceExample>) => void
};

const DemoWrapper = Flex.extend`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;

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

  handleContextChange() {
    this.props.fetch(this.state.context, this.state.examples);
  }

  render() {
    return (
      <PageWrapper>
        <PrimaryContent padding="2rem">
          <DemoWrapper>
            <H3 type="secondary">Model Demo</H3>
            <S1 weight="300">
              <i>Pricing model demo.</i>
            </S1>
            <button onClick={this.handleContextChange()}>Press me.</button>
          </DemoWrapper>
        </PrimaryContent>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetch: (context, examples) =>
    dispatch(demoPriceActions.fetch({ context, examples }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemoRoute);
