// @flow

import { safeAdd } from '_helpers/string-utils';

export const SPRING_DECIMALS = 4;
export const SCORE_DECIMALS = 2;

export const velocityScore = (
  eventScore: number,
  velocityFactor: number,
  fix: number = SCORE_DECIMALS
) => (eventScore * (velocityFactor - 1)).toFixed(fix);

export const finalEventScore = (
  eventScore: number,
  velocityFactor: number,
  eventScoreModifier: number,
  fix: number = SCORE_DECIMALS
) => {
  const velocityEventScore = eventScore * velocityFactor;
  return safeAdd(velocityEventScore, eventScoreModifier, fix);
};

export const finalSpringValue = (
  spring: number,
  springModifier: number,
  fix: number = SPRING_DECIMALS
) => {
  return safeAdd(spring, springModifier, fix);
};
