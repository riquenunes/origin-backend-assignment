import RiskProfileCalculatorInput from '../../../src/RiskProfileCalculatorInput';
import chance from 'chance';

export const stub = (
  overrides: Partial<RiskProfileCalculatorInput> = {}
): RiskProfileCalculatorInput => ({
  age: chance().age(),
  dependents: chance().integer({ min: 0, max: 5 }),
  income: chance().integer({ min: 0, max: 1000000 }),
  maritalStatus: chance().pickone(['married', 'single']),
  riskQuestions: [1, 1, 1],
  house: { ownershipStatus: chance().pickone(['owned', 'mortgaged']) },
  vehicle: { year: chance().integer({ min: 1960, max: 2020 }) },
  ...overrides,
});
