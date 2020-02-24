import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectors as seasonSelectors } from '_state/season';
import {
  Panel,
  PanelHeader,
  PanelContent,
  H4,
  PrimaryButton,
} from '_components';
import { seasonService } from '_services';

const PriceAllButton = styled(PrimaryButton)``;

export const PriceAllSection = () => {
  const seasonId = useSelector(seasonSelectors.selectActiveSeasonId);
  const handleClick = () => seasonService.priceAllEvents(seasonId);

  return (
    <Panel>
      <PanelHeader>
        <H4 margin="0" weight="bold">
          Pricing
        </H4>
      </PanelHeader>
      <PanelContent>
        <PriceAllButton onClick={handleClick}>Price All Events</PriceAllButton>
      </PanelContent>
    </Panel>
  );
};
