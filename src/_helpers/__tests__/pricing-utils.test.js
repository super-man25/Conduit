import {
  velocityScore,
  finalEventScore,
  finalSpringValue
} from '_helpers/pricing-utils';

it('display the correct velocity score', () => {
  expect(parseFloat(velocityScore(10, 1))).toBeCloseTo(0);
  expect(parseFloat(velocityScore(10, 0.5))).toBeCloseTo(-5);
  expect(parseFloat(velocityScore(10, 0.8))).toBeCloseTo(-2);
  expect(parseFloat(velocityScore(10, -0.8))).toBeCloseTo(-18);
  // Pass in fix
  expect(parseFloat(velocityScore(10, -0.8, 4))).toBeCloseTo(-18);
});

it('display the correct final event score', () => {
  expect(parseFloat(finalEventScore(10, 1.0, 1.5))).toBeCloseTo(11.5);
  expect(parseFloat(finalEventScore(10, 0.5, 1.5))).toBeCloseTo(6.5);
  expect(parseFloat(finalEventScore(10, -0.5, 1.5))).toBeCloseTo(-3.5);
  // Pass in fix
  expect(parseFloat(finalEventScore(10, -0.5, 1.5, 4))).toBeCloseTo(-3.5);
});

it('displays the correct final spring value', () => {
  expect(parseFloat(finalSpringValue(10, 1.0))).toBeCloseTo(11.0);
  expect(parseFloat(finalSpringValue(10, -5.0))).toBeCloseTo(5.0);
  // Pass in fix
  expect(parseFloat(finalSpringValue(10, -5.0, 2))).toBeCloseTo(5.0);
});
