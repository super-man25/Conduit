// @flow

import React from 'react';
import {
  H3,
  S1,
  PageWrapper,
  PrimaryContent,
  Spacing,
  Breadcrumbs,
  Flex,
  Loader
} from '_components';
import type { EDBuyerType } from '_models';

import { buyerTypeService } from '_services';

const buyerTypeRulesCrumbs = [
  {
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    title: 'Buyer Type Rules',
    path: '/settings/buyer-type-rules'
  }
];

type Props = {
  alertActions: {
    error: Function
  }
};

type State = {
  buyerTypes: Array<EDBuyerType>,
  loading: boolean
};

export default class BuyerTypeRulesPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      buyerTypes: []
    };
  }

  componentDidMount() {
    buyerTypeService
      .getAll()
      .then((buyerTypes) => {
        this.setState({
          buyerTypes,
          loading: false
        });
      })
      .catch((err) => {
        this.props.alertActions.error('Error fetching buyer types');
        this.setState({
          loading: false,
          buyerTypes: []
        });
      });
  }

  render() {
    return (
      <PageWrapper>
        <PrimaryContent padding="2rem">
          <Flex direction="column">
            <Spacing margin="2rem 0">
              <Breadcrumbs crumbs={buyerTypeRulesCrumbs} />
            </Spacing>
            <H3 type="secondary">Buyer Type Rules</H3>
            <S1 weight="300">
              <i>Set rules for pushing prices to different buyer types</i>
            </S1>
            <Spacing margin="4rem 0">
              {this.state.loading && <Loader />}
              {!this.state.loading &&
                this.state.buyerTypes.map((bt) => (
                  <div>
                    <S1>
                      {bt.id} -- {bt.code} -- {bt.publicDescription}
                    </S1>
                  </div>
                ))}
            </Spacing>
          </Flex>
        </PrimaryContent>
      </PageWrapper>
    );
  }
}
