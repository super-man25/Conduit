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
  CenteredLoader
} from '_components';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { connect } from 'react-redux';
import type { EDIntegrationStat } from '_models';
import { selectors, actions } from '_state/ticketIntegrations';
import { formatNumber } from '_helpers/string-utils';
import { sizes } from '_helpers/style-utils';
import { selectors as seasonSelectors } from '_state/season';
import { createStructuredSelector } from 'reselect';

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

// To prevent division by zero
const getTicketShare = (sold: number, total: number): string => {
  if (total === 0) {
    return '0%';
  }

  return percentFormatter.format(sold / total);
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
            {getTicketShare(integration.sold, integration.total)}
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
  error: ?Error,
  seasonId: number,
  fetchTicketIntegrations: ({ seasonId: number }) => void
};

export class TicketIntegrationsPresenter extends React.Component<Props> {
  componentDidMount() {
    const { seasonId } = this.props;
    this.props.fetchTicketIntegrations({ seasonId });
  }

  componentDidUpdate(prevProps: Props) {
    const { seasonId } = this.props;
    if (seasonId !== prevProps.seasonId) {
      this.props.fetchTicketIntegrations({ seasonId });
    }
  }

  render() {
    const { ticketIntegrations, loading, error } = this.props;
    const hasNoData = !ticketIntegrations.length;

    return (
      <Panel>
        <PanelHeader>
          <Flex height="100%" align="center">
            <H4>Ticket Integrations</H4>
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
  ticketIntegrations: selectors.selectTicketIntegrations,
  loading: selectors.selectTicketIntegrationsLoading,
  error: selectors.selectTicketIntegrationsError,
  seasonId: seasonSelectors.selectActiveSeasonId
});

const mapDispatchToProps = {
  fetchTicketIntegrations: actions.fetchTicketIntegrations
};

export const TicketIntegrations = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketIntegrationsPresenter);
