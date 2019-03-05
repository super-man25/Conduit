// @flow

import React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { rgba } from 'polished';
import { Toggle, Flex, EDText } from '_components';
import { readableDuration, sentenceCase } from '_helpers/string-utils';
import { SecondaryPricingRule } from '../_scenes/Settings/TeamSettings/components/SecondaryPricingRule';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${rgba(196, 210, 225, 0.5)};
  width: 20rem;
  box-shadow: 0 4px 4px 0 ${cssConstants.PRIMARY_LIGHT_GRAY};
  padding: 1rem 2rem;
`;

const Details = Flex.extend`
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 0;
`;

const Img = styled.img`
  max-width: 12.6rem;
  height: 5rem;
  object-fit: contain;
`;

export const ToggleContainer = styled.div`
  margin: 0;
`;

type Props = {
  img: String,
  modifiedAt: Date,
  onChange: () => void,
  isActive: boolean,
  isPrimary: boolean,
  logoUrl: string,
  name: string,
  percent: number,
  constant: number
};

export function Integration(props: Props) {
  const { modifiedAt, isActive, isPrimary, onChange, logoUrl, name } = props;

  return (
    <Card>
      <EDText size="small" type="tertiary">
        {sentenceCase(`last updated ${readableDuration(modifiedAt)} ago`)}
      </EDText>
      <Details>
        <Img src={logoUrl} alt={name} />
        <ToggleContainer>
          <Toggle isChecked={isActive} isDisabled onChange={onChange} />
        </ToggleContainer>
      </Details>
    </Card>
  );
}
