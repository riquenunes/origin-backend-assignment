import LifeInsuranceLine from '../../src/LifeInsuranceLine';
import { InsurancePlan } from '../../src/InsuranceLine';
import { stub } from '../doubles/stubs/RiskProfileCalculatorInput';

describe('Life insurance line', () => {
  it('returns that the user is inelegible for a life insurance plan when the user is over 60 years old', () => {
    const input = stub({ age: 61 })
    const insuranceLine = new LifeInsuranceLine(input);

    expect(insuranceLine.plan).toBe(InsurancePlan.Inelegible);
  });

  it('deducts 2 risk points from the life insurance score when the user is under 30 years old', () => {
    const input = stub({
      riskQuestions: [1, 1, 1],
      age: 29,
      dependents: 0,
      maritalStatus: 'single',
      income: 1000,
    });
    const insuranceLine = new LifeInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(1);
  });

  it('deducts 1 risk point from the life insurance score when the user is between 30 and 40 years old', () => {
    const input = stub({
      age: 35,
      riskQuestions: [1, 1, 1],
      dependents: 0,
      maritalStatus: 'single',
      income: 1000,
    });
    const insuranceLine = new LifeInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(2);
  });

  it('deducts 1 risk point from the life insurance score when the user income is above $200k', () => {
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      dependents: 0,
      maritalStatus: 'single',
      income: 200001,
    });
    const insuranceLine = new LifeInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(2);
  });
});
