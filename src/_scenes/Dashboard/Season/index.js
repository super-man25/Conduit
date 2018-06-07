import { H1, Spacing, PageWrapper, Flex, Button } from '_components';
import SeasonRevenuePanel from '_scenes/Dashboard/Season/containers/SeasonRevenuePanel';
import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as uiActions } from '_state/ui';

const ContentMock = styled.div`
  margin: 64px 0;
  width: 100%;
  height: 720px;
  background-color: #ddd;
`;

const SeasonOverviewTitle = H1.extend`
  margin: ${(props) => (props.sidebarIsOpen ? '0' : '0 0 0 1rem')};
`;

const ToggleButton = Button.extend`
  margin: 0;
`;

const Season = ({
  uiState: { sidebarIsOpen },
  uiActions: { toggleSidebar }
}) => (
  <PageWrapper>
    <Spacing padding="1.5rem 2rem">
      <Flex align="center" margin="0 0 1.5rem">
        {!sidebarIsOpen && (
          <ToggleButton small expand onClick={toggleSidebar} />
        )}
        <SeasonOverviewTitle weight="400" sidebarIsOpen={sidebarIsOpen}>
          Season Overview
        </SeasonOverviewTitle>
      </Flex>
      <SeasonRevenuePanel />
      <ContentMock />
      <ContentMock />
      <ContentMock />
      <ContentMock />
    </Spacing>
  </PageWrapper>
);

function mapStateToProps(state) {
  return {
    uiState: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Season);