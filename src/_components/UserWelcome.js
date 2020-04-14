// @flow
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { shadows, zIndexes, navigationHeight, colors } from '_constants';
import type { EDClient, EDClientList } from '_models';
import { isMobileDevice } from '_helpers';
import { Flex, FlexItem, Icon, Loader, Text, TextButton } from '_components';
import { useClickAway } from '_hooks';

const Overlay = styled.div`
  background: #000;
  height: 100vh;
  opacity: 0.4;
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.OVERLAY};
  top: ${(props) => props.top || 0};
  left: 0;
`;

const UserWelcomeDropdown = styled.div`
  position: relative;
  margin-right: 5px;
`;

const ClientDropDown = styled.div`
  position: absolute;
  background: ${colors.white};
  width: 280px;
  right: 0;
  box-shadow: ${shadows.MEDIUM};
  z-index: ${zIndexes.DROPDOWN_CLIENT_HEADER};
  max-height: calc(100vh - ${navigationHeight}px);
  overflow: scroll;
`;

const ClientMenuItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid black;
  overflow: hidden;

  :last-child {
    border: none;
  }

  :hover {
    background: rgba(75, 152, 207, 0.2);
    cursor: pointer;
  }
`;

const ClientLogoContainer = styled.div`
  background-color: white;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ClientLogo = styled.img`
  width: auto;
  height: 36px;
`;

const EmptyLogo = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid ${colors.gray};
  background-color: ${colors.lightGray};
  border-radius: 50%;
`;

const DropdownArrow = styled(Icon)`
  margin-left: 10px;
`;

type Props = {
  firstName: string,
  lastName: string,
  client: EDClient,
  clientList: EDClientList,
  updateClient: (client: EDClient) => void,
};

export const UserWelcome = (props: Props) => {
  const { firstName, lastName, client, clientList, updateClient } = props;
  const { loading } = clientList;
  const { name = '', id } = client;

  const team = name.replace(/primary|secondary/gi, '').trim();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();

  useClickAway({
    ref: dropdownRef,
    handleClickAway: () => setIsOpen(false),
  });

  const toggleDropdown = function() {
    setIsOpen(!isOpen);
  };

  const handleClientChange = (client) => () => {
    setIsOpen(false);
    if (client.id !== props.client.id) {
      updateClient(client);
    }
  };

  const renderClientMenuItem = (client, chosenClientID) => {
    const { name, logoUrl } = client;

    return (
      <ClientMenuItem key={client.id} onClick={handleClientChange(client)}>
        <Flex align="center">
          <FlexItem flex="0 1 20%">
            {logoUrl ? <ClientLogo src={logoUrl} /> : <EmptyLogo />}
          </FlexItem>
          <FlexItem flex="0 1 70%" overflow="hidden">
            <Text
              ellipsis
              textTransform="capitalize"
              size="16"
              margin="0 0 4px 0"
            >
              {name}
            </Text>
          </FlexItem>
          <FlexItem flex="0 1 10%">
            {client.id === chosenClientID && (
              <Icon size={24} name="check" color={colors.blue} />
            )}
          </FlexItem>
        </Flex>
      </ClientMenuItem>
    );
  };

  return (
    <>
      <UserWelcomeDropdown ref={dropdownRef}>
        <TextButton onClick={toggleDropdown} padding="8px">
          <Flex align="center" maxWidth="300px">
            {isMobileDevice ? (
              <ClientLogoContainer>
                <ClientLogo src={client.logoUrl} />
              </ClientLogoContainer>
            ) : (
              <FlexItem flex="0 1 auto" overflow="hidden">
                <Text
                  ellipsis
                  color={colors.white}
                  textTransform="none"
                  textAlign="right"
                  size="14"
                  margin="0 0 4px 0"
                  weight="heavy"
                >
                  Welcome, {firstName} {lastName}
                </Text>
                <Text
                  ellipsis
                  color={colors.white}
                  textTransform="capitalize"
                  textAlign="right"
                >{`${team}`}</Text>
              </FlexItem>
            )}

            <FlexItem>
              <DropdownArrow
                size={12}
                name={isOpen ? 'caretUp' : 'caretDown'}
                color={colors.white}
              />
            </FlexItem>
          </Flex>
        </TextButton>

        {isOpen && (
          <ClientDropDown>
            {loading ? (
              <Loader centered />
            ) : (
              clientList.clients.map((client) =>
                renderClientMenuItem(client, id)
              )
            )}
          </ClientDropDown>
        )}
      </UserWelcomeDropdown>
      {isOpen && <Overlay top="70px" />}
    </>
  );
};
