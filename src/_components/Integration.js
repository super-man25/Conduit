// @flow

import React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { rgba } from 'polished';
import { Toggle, Flex, EDText } from '_components';
import { readableDuration, titleCase } from '_helpers/string-utils';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${rgba(196, 210, 225, 0.5)};
  height: 7.5rem;
  width: 20rem;
  box-shadow: 0 4px 4px 0 ${cssConstants.PRIMARY_LIGHT_GRAY};
  padding: 1rem 2rem;
`;

const Details = Flex.extend`
  position: relative;
  justify-content: space-between;
  margin: 1rem 0 0;
`;

const Img = styled.img`
  max-width: 12.6rem;
  height: 5rem;
  object-fit: contain;
`;

export const ToggleContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 30%;
  left: 70%;
`;

type Props = {
  img: String,
  modifiedAt: Date,
  onChange: () => void,
  isActive: boolean,
  isPrimary: boolean,
  logoUrl: string,
  name: string
};

export function Integration(props: Props) {
  const { modifiedAt, isActive, isPrimary, onChange, logoUrl, name } = props;

  return (
    <Card>
      <EDText size="small" type="tertiary">
        {titleCase(`Last Updated ${readableDuration(modifiedAt)}`)}
      </EDText>
      <Details>
        <Img src={logoUrl} alt={name} />
        <ToggleContainer>
          <Toggle
            isChecked={isActive}
            isDisabled={isPrimary}
            onChange={onChange}
          />
        </ToggleContainer>
      </Details>
    </Card>
  );
}
