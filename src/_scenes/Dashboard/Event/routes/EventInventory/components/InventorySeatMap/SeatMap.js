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
import { SeatMapLoader } from './styled';

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
        chart.highlightSelectedScaleFilters(this.props.scaleFilters);
      },
      onClick: (el) => {
        const { seatMapping } = this.props;
        const { sectionRef } = el;
        const elMappedToSeatMap = seatMapping.find(
          (item) => item.sectionRef === sectionRef
        );
        this.setSelectedScaleFilters(elMappedToSeatMap.priceScaleId);
      },
      // TODO: Add logic here to make SVG clickable by section rather than price scale
      clickable: false
    });
  };

  setSelectedScaleFilters(scaleFilterId) {
    const { allScaleFilters, scaleFilters } = this.props;
    let updatedScaleFilters;

    const scaleFilterObject = allScaleFilters.find(
      (item) => item.id === scaleFilterId
    );

    const includesScaleFilter = scaleFilters.find(
      (item) => item.id === scaleFilterId
    );

    updatedScaleFilters = includesScaleFilter
      ? scaleFilters.filter((s) => s.id !== includesScaleFilter.id)
      : scaleFilters.concat(scaleFilterObject);

    this.props.setSelectedScaleFilters(updatedScaleFilters);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scaleFilters !== this.props.scaleFilters && this.chart) {
      this.chart.highlightSelectedScaleFilters(this.props.scaleFilters);
    }
  }

  render() {
    const { venue, loading, venueMapBlob, error } = this.props;

    if (loading) {
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
        <object
          role="search"
          ref={this.seatmap}
          onLoad={this.onSeatmapLoaded}
          data={venueMapBlob}
          type="image/svg+xml"
        >
          Sorry this browser does not support svg.
        </object>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allScaleFilters: selectors.selectScaleFilters,
  scaleFilters: selectors.selectSelectedScaleFilters,
  seatMapping: seatMapSelectors.selectMapping,
  loading: seatMapSelectors.selectLoading,
  error: seatMapSelectors.selectError,
  venue: seatMapSelectors.selectVenue,
  venueMapBlob: seatMapSelectors.selectVenueMapBlob
});

const mapDispatchToProps = {
  setSelectedScaleFilters: actions.setSelectedScaleFilters,
  fetchSeatMap: seatMapActions.fetchSeatMap,
  resetSeatMap: seatMapActions.resetSeatMap
};

export const SeatMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeatMapPresenter);
