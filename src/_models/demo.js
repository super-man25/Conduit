// @flow

export type DemoPriceContext = {
  event_month: number,
  event_day_of_week: number,
  weather_condition: string,
  opponent_heuristic: number,
  minutes_before: number,
  temp: number,
  games_ahead: number,
  win_loss_ratio: number,
  is_wheelchair: boolean,
  home_opener: boolean,
};

export type DemoPriceExample = {
  degrees: number,
  distance: number,
  row_number: number,
};
