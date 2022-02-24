import UserProfile from '../../../src/UserProfile';
import chance from 'chance';

export const stub = (
  overrides: Partial<UserProfile> = {}
): UserProfile => new UserProfile(
  'age' in overrides ? overrides.age : chance().age(),
  'dependents' in overrides ? overrides.dependents : chance().integer({ min: 0, max: 5 }),
  'income' in overrides ? overrides.income : chance().integer({ min: 0, max: 1000000 }),
  'maritalStatus' in overrides ? overrides.maritalStatus : chance().pickone(['married', 'single']),
  'riskQuestions' in overrides ? overrides.riskQuestions : [1, 1, 1],
  'house' in overrides ? overrides.house : { ownershipStatus: chance().pickone(['owned', 'mortgaged']) },
  'vehicle' in overrides ? overrides.vehicle : { year: chance().integer({ min: 1960, max: 2020 }) }
);
