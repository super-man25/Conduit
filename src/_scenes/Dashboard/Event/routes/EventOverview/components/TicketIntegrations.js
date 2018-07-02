// @flow
import React from 'react';
import {
  Panel,
  PanelContent,
  PanelHeader,
  Flex,
  H4,
  Box,
  Text,
  FlexItem,
  CenteredLoader,
  Toggle
} from '_components';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { connect } from 'react-redux';
import type { EDIntegrationStat, EDEvent } from '_models';
import {
  selectors as ticketIntegrationSelectors,
  actions as ticketIntegrationActions
} from '_state/ticketIntegrations';
import { formatNumber } from '_helpers/string-utils';
import { sizes } from '_helpers/style-utils';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/event';

const percentFormatter = Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const UnpaddedPanelContent = PanelContent.extend`
  padding: 0 !important;
`;

const LogoImg = styled.img`
  height: 100%;
  width: auto;
`;

const HorizontalList = Flex.extend`
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const HorizontalListItem = FlexItem.extend`
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  box-sizing: border-box;
  flex: 1 0 auto;
  width: 50%;

  &:last-child {
    border-right: none;
  }

  @media (min-width: ${sizes.small}px) {
    width: 33%;
  }

  @media (min-width: ${sizes.large}px) {
    width: 25%;
  }
`;

const TicketIntegrationLogo = ({
  integration,
  large
}: {
  integration: EDIntegrationStat,
  large?: boolean
}) => {
  const boxProps = {
    height: large ? '50px' : '30px',
    marginBottom: large ? '0' : '1rem'
  };

  return (
    <Box {...boxProps}>
      <LogoImg src={integration.logoUrl} />
    </Box>
  );
};

const Loader = () => (
  <div style={{ position: 'relative', height: 100 }}>
    <CenteredLoader />
  </div>
);

type ListItemProps = {
  integration: EDIntegrationStat,
  integrations: EDIntegrationStat[]
};

export const TicketIntegrationListItem = ({
  integration,
  integrations
}: ListItemProps) => (
  <HorizontalListItem
    key={integration.id}
    fullWidth={integrations.length === 1}
  >
    <Box padding="1rem 10%">
      {integrations.length > 1 && (
        <TicketIntegrationLogo integration={integration} />
      )}
      <Flex
        justify="space-between"
        align={integrations.length === 1 ? 'center' : 'stretch'}
      >
        {integrations.length === 1 && (
          <TicketIntegrationLogo large integration={integration} />
        )}
        <Box>
          <Text marginBottom=".33rem" size={22} center>
            {formatNumber(integration.sold)}
          </Text>
          <Text size={12}>Tickets Sold</Text>
        </Box>
        {integrations.length > 1 && (
          <Box border={`1px solid ${cssConstants.PRIMARY_LIGHT_GRAY}`} />
        )}
        <Box>
          <Text marginBottom=".33rem" size={22} center>
            {percentFormatter.format(integration.sold / integration.total)}
          </Text>
          <Text size={12}>Ticket Share</Text>
        </Box>
      </Flex>
    </Box>
  </HorizontalListItem>
);

const NoData = () => (
  <Flex align="center" justify="center" height="100px">
    <Text size={14}>No Ticket Integrations to show</Text>
  </Flex>
);

const RenderError = () => (
  <Flex align="center" justify="center" height="100px">
    <Text size={14}>There was an error fetching Ticket Integrations</Text>
  </Flex>
);

type Props = {
  ticketIntegrations: EDIntegrationStat[],
  loading: boolean,
  event: EDEvent,
  fetchTicketIntegrations: ({ eventId: number }) => void,
  setBroadcasting: (eventId: number, isBroadcasting: boolean) => void,
  togglingBroadcasting: boolean,
  error: ?Error
};

export class TicketIntegrationsPresenter extends React.Component<Props> {
  componentDidMount() {
    const {
      event: { id }
    } = this.props;
    this.props.fetchTicketIntegrations({ eventId: id });
  }

  componentDidUpdate(prevProps: Props) {
    const {
      event: { id }
    } = this.props;

    if (id !== prevProps.event.id) {
      this.props.fetchTicketIntegrations({ eventId: id });
    }
  }

  toggleIsBroadcasting = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      setBroadcasting,
      event: { id }
    } = this.props;
    const { checked } = e.target;

    setBroadcasting(id, checked);
  };

  render() {
    const {
      ticketIntegrations,
      loading,
      error,
      event: { isBroadcast },
      togglingBroadcasting
    } = this.props;

    const hasNoData = !ticketIntegrations.length;

    return (
      <Panel>
        <PanelHeader>
          <Flex height="100%" align="center" justify="space-between">
            {!loading && (
              <React.Fragment>
                <Flex>
                  <H4 margin="0" marginRight="2.5rem">
                    Integrations
                  </H4>
                  <Toggle
                    isChecked={isBroadcast}
                    onChange={this.toggleIsBroadcasting}
                    isDisabled={false}
                    size="small"
                    title={`Toggle Integrations ${isBroadcast ? 'Off' : 'On'}`}
                  />
                  {togglingBroadcasting && (
                    <Text marginLeft="1.5rem">Toggling Broadcasting</Text>
                  )}
                </Flex>
                <Text marginLeft="2rem" size={12}>
                  MANAGE ALL
                </Text>
              </React.Fragment>
            )}
          </Flex>
        </PanelHeader>
        <UnpaddedPanelContent>
          {error ? (
            <RenderError />
          ) : loading ? (
            <Loader />
          ) : hasNoData ? (
            <NoData />
          ) : (
            <HorizontalList>
              {ticketIntegrations.map((integration) => (
                <TicketIntegrationListItem
                  key={integration.id}
                  integration={integration}
                  integrations={ticketIntegrations}
                />
              ))}
            </HorizontalList>
          )}
        </UnpaddedPanelContent>
      </Panel>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ticketIntegrations: ticketIntegrationSelectors.selectTicketIntegrations,
  loading: ticketIntegrationSelectors.selectTicketIntegrationsLoading,
  error: ticketIntegrationSelectors.selectTicketIntegrationsError,
  event: selectors.getActiveEvent,
  togglingBroadcasting: selectors.getTogglingBroadcasting
});

const mapDispatchToProps = {
  fetchTicketIntegrations: ticketIntegrationActions.fetchTicketIntegrations,
  setBroadcasting: actions.setBroadcasting
};

export const TicketIntegrations = connect(mapStateToProps, mapDispatchToProps)(
  TicketIntegrationsPresenter
);
