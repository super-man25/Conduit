import React from 'react';
import { SVGChart } from '_helpers/svg-utils';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectors, actions } from '_state/eventInventory';
import {
  actions as seatMapActions,
  selectors as seatMapSelectors
} from '_state/seatMap';
import { Flex } from '_components';
import { SeatMapLoader, SeatMapObject } from './styled';

export class SeatMapPresenter extends React.Component {
  seatmap = React.createRef();

  componentDidMount() {
    this.props.fetchSeatMap();
  }

  componentWillUnmount() {
    if (this.chart) this.chart.destroy();
    this.props.resetSeatMap();
  }

  onSeatmapLoaded = (e) => {
    const mapSvg = this.seatmap.current.contentDocument.querySelector('svg');
    this.chart = new SVGChart(mapSvg, this.props.seatMapping, {
      onInit: (chart) => {
        chart.highlightSelectedSectionFilters(this.props.sectionFilters);
      },
      onClick: (el) => {
        const { associatedMapping } = el;
        const { sectionFilters, setSelectedSectionFilters } = this.props;

        if (!associatedMapping) return;

        const updatedSectionFilters = sectionFilters.includes(associatedMapping)
          ? sectionFilters.filter((f) => f !== associatedMapping)
          : sectionFilters.concat(associatedMapping);

        setSelectedSectionFilters(updatedSectionFilters);
      },
      clickable: true,
      allSectionFilters: this.props.allSectionFilters
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.sectionFilters !== this.props.sectionFilters && this.chart) {
      this.chart.highlightSelectedSectionFilters(this.props.sectionFilters);
    }
  }

  render() {
    const {
      venue,
      loading,
      loadingEventInventory,
      venueMapBlob,
      error
    } = this.props;

    if (loading || loadingEventInventory) {
      return <SeatMapLoader />;
    }

    if (error) {
      return (
        <Flex justify="center" align="center" height="400px">
          {`There was an issue loading this venue's seat map`}
        </Flex>
      );
    }

    if (!venue || !venue.svgUrl) {
      return (
        <Flex justify="center" align="center" height="400px">
          A seat map was not found for this venue
        </Flex>
      );
    }

    return (
      <React.Fragment>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <SeatMapObject
          role="search"
          ref={this.seatmap}
          onLoad={this.onSeatmapLoaded}
          data={venueMapBlob}
          type="image/svg+xml"
        >
          Sorry this browser does not support svg.
        </SeatMapObject>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allScaleFilters: selectors.selectScaleFilters,
  allSectionFilters: selectors.selectSectionFilters,
  scaleFilters: selectors.selectSelectedScaleFilters,
  seatMapping: seatMapSelectors.selectMapping,
  sectionFilters: selectors.selectSelectedSectionFilters,
  loading: seatMapSelectors.selectLoading,
  error: seatMapSelectors.selectError,
  venue: seatMapSelectors.selectVenue,
  venueMapBlob: seatMapSelectors.selectVenueMapBlob,
  loadingEventInventory: selectors.selectEventInventoryLoading
});

const mapDispatchToProps = {
  setSelectedScaleFilters: actions.setSelectedScaleFilters,
  setSelectedSectionFilters: actions.setSelectedSectionFilters,
  fetchSeatMap: seatMapActions.fetchSeatMap,
  resetSeatMap: seatMapActions.resetSeatMap
};

export const SeatMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeatMapPresenter);
