import DisabilityInsuranceRiskCalculator from '../../src/domain/service/risk-calculators/DisabilityInsuranceRiskCalculator';
import { stub } from '../doubles/stubs/UserProfile';

describe('Disability insurance risk calculator', () => {
  it('returns that the user is inelegible for a disability insurance plan when the user does not have an income', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({ age: 30, income: 0 })

    expect(insuranceRiskCalculator.calculate(input).isElegible).toBe(false);
  });

  it('returns that the user is inelegible for a disability insurance plan when the user is over 60 years old', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({ age: 61, income: 1000 })

    expect(insuranceRiskCalculator.calculate(input).isElegible).toBe(false);
  });

  it('deducts 2 risk points from the disability insurance score when the user is under 30 years old', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({
      age: 29,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'single',
      house: undefined,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(1);
  });

  it('deducts 1 risk point from the disability insurance score when the user is between 30 and 40 years old', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({
      age: 35,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'single',
      house: undefined,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('deducts 1 risk point from the disability insurance score when the user income is above $200k', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 200001,
      dependents: 0,
      maritalStatus: 'single',
      house: undefined,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('adds 1 risk point to the disability insurance score when the user\'s house is mortgaged', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'single',
      house: { ownershipStatus: 'mortgaged' },
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(4);
  });

  it('adds 1 risk point to the disability insurance score when the user has dependents', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 2,
      maritalStatus: 'single',
      house: undefined,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(4);
  });

  it('deducts 1 risk point from the disability insurance score when the user is married', () => {
    const insuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'married',
      house: undefined,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });
});
