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
  EDLink
} from '_components';
import EdLogoDark from '_images/logo_dark.svg';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import type { EDIntegrationStat } from '_models';
import { formatNumber } from '_helpers/string-utils';
import { sizes } from '_helpers/style-utils';

const percentFormatter = Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const UnpaddedPanelContent = styled(PanelContent)`
  padding: 0 !important;
`;

const LogoImg = styled.img`
  height: ${(props) => props.height || '100%'};
  width: auto;
`;

const HorizontalList = styled(Flex)`
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow-x: auto;
  flex-wrap: nowrap;
`;

const HorizontalListItem = styled(FlexItem)`
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
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

  return integration.name === 'Skybox' ? (
    <Flex direction="row" align="center" justify="space-between">
      <Box {...boxProps}>
        <LogoImg height="60%" src={EdLogoDark} />
      </Box>
    </Flex>
  ) : (
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

const getTicketShare = (sold: number, total: ?number): string => {
  if (!total) return '--';
  return percentFormatter.format(sold / total);
};

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
          <Text marginBottom=".33rem" size={22} align="center" weight="heavy">
            {formatNumber(integration.sold)}
          </Text>
          <Text size={12}>Tickets Sold</Text>
        </Box>
        {integrations.length > 1 && (
          <Box border={`1px solid ${cssConstants.PRIMARY_LIGHT_GRAY}`} />
        )}
        <Box>
          <Text marginBottom=".33rem" size={22} align="center" weight="heavy">
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
  id: number,
  showSettings: boolean
};

export const TicketIntegrations = (props: Props) => {
  const { ticketIntegrations, loading, error, showSettings } = props;

  const hasNoData = !ticketIntegrations.length;

  return (
    <Panel>
      <PanelHeader>
        <Flex height="100%" align="center" justify="space-between">
          {!loading && (
            <React.Fragment>
              <Flex>
                <H4 margin="0" marginRight="2.5rem" weight="bold">
                  INTEGRATIONS
                </H4>
              </Flex>
              {showSettings && (
                <EDLink to="/settings/team" weight="heavy">
                  MANAGE ALL
                </EDLink>
              )}
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
};
