import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { distanceInWords } from 'date-fns';

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

const StyledEventWeather = styled(Flex)`
  margin: 5px 0 15px;
`;

const WeatherIcon = styled.img`
  width: 25px;
  height: 25px;
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
    temperature,
    precipitationProbability,
    precipitationType,
  },
}) => {
  const [now, setNow] = useState(new Date());

  return (
    <StyledEventWeather
      align="center"
      title={`Updated ${distanceInWords(
        new Date(parseInt(`${updatedAt}000`)),
        now,
        { includeSeconds: true }
      )} ago`}
      onMouseOver={() => setNow(new Date())}
    >
      <WeatherIcon
        src={weatherIcons.find((weatherIcon) => weatherIcon.key === icon).icon}
      />
      <WeatherSummary>
        <WeatherDataPoint>
          {parseInt(temperature)}°<FarenheitSymbol>F</FarenheitSymbol>
        </WeatherDataPoint>
        <WeatherDataPoint>{summary},</WeatherDataPoint>
        <WeatherDataPoint>
          {parseInt(precipitationProbability * 100)}%
        </WeatherDataPoint>
        <WeatherDataPoint>
          Chance of {precipitationType || 'precipitation'}
        </WeatherDataPoint>
      </WeatherSummary>
    </StyledEventWeather>
  );
};

const mapStateToProps = (state) => ({
  gameDayWeather: state.event.event.gameDayWeather,
});

export default connect(
  mapStateToProps,
  null
)(EventWeather);
