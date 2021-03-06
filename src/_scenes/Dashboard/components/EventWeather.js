import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';

import clearDayIcon from '_images/clearDay.svg';
import clearNightIcon from '_images/clearNight.svg';
import cloudyIcon from '_images/cloudy.svg';
import fogIcon from '_images/fog.svg';
import partlyCloudyDayIcon from '_images/partlyCloudyDay.svg';
import partlyCloudyNightIcon from '_images/partlyCloudyNight.svg';
import rainIcon from '_images/rain.svg';
import sleetIcon from '_images/sleet.svg';
import snowIcon from '_images/snow.svg';
import windIcon from '_images/wind.svg';
import { Flex } from '_components';

const weatherIcons = [
  { icon: clearDayIcon, key: 'clear-day' },
  { icon: clearNightIcon, key: 'clear-night' },
  { icon: cloudyIcon, key: 'cloudy' },
  { icon: fogIcon, key: 'fog' },
  { icon: partlyCloudyDayIcon, key: 'partly-cloudy-day' },
  { icon: partlyCloudyNightIcon, key: 'partly-cloudy-night' },
  { icon: rainIcon, key: 'rain' },
  { icon: sleetIcon, key: 'sleet' },
  { icon: snowIcon, key: 'snow' },
  { icon: windIcon, key: 'wind' },
];

const FarenheitSymbol = styled.span`
  font-size: 8px;
  padding-left: 1px;
  text-transform: capitalize;
`;

const WeatherIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const WeatherSummary = styled.div`
  font-size: 13px;
  margin: 0;
  padding-left: 5px;
  display: flex;
  align-items: center;
  text-transform: lowercase;
`;

const WeatherDataPoint = styled.div`
  display: flex;
  align-items: flex-start;
  &:not(:last-of-type) {
    margin-right: 5px;
  }
`;

const EventWeather = ({
  gameDayWeather: {
    updatedAt,
    icon,
    summary,
    temperatureHigh,
    temperatureLow,
    precipitationProbability,
    precipitationType,
  },
}) => {
  const [now, setNow] = useState(new Date());
  const weatherIcon = weatherIcons.find(
    (weatherIcon) => weatherIcon.key === icon
  );
  const formattedSummary =
    summary && summary[summary.length - 1] === '.'
      ? summary.slice(0, -1)
      : summary;

  return (
    <Flex
      align="center"
      title={`Updated ${formatDistance(
        now,
        new Date(parseInt(`${updatedAt}000`)),
        { includeSeconds: true }
      )} ago`}
      onMouseOver={() => setNow(new Date())}
    >
      <WeatherIcon src={weatherIcon && weatherIcon.icon} />
      <WeatherSummary>
        <WeatherDataPoint>
          {parseInt(temperatureHigh)}°<FarenheitSymbol>F</FarenheitSymbol>/
          {parseInt(temperatureLow)}°<FarenheitSymbol>F</FarenheitSymbol>
        </WeatherDataPoint>
        <WeatherDataPoint>{formattedSummary},</WeatherDataPoint>
        <WeatherDataPoint>
          {parseInt(precipitationProbability * 100)}%
        </WeatherDataPoint>
        <WeatherDataPoint>
          Chance of {precipitationType || 'precipitation'}
        </WeatherDataPoint>
      </WeatherSummary>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  gameDayWeather: state.event.event.gameDayWeather,
});

export default connect(mapStateToProps, null)(EventWeather);
