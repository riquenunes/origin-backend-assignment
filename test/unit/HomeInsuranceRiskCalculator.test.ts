import HomeInsuranceRiskCalculator from '../../src/HomeInsuranceRiskCalculator';
import { InsurancePlan } from '../../src/InsuranceRiskCalculator';
import { stub } from '../doubles/stubs/RiskProfileCalculatorInput';

describe('Home insurance risk calculator', () => {
  it('returns that the user is inelegible for an home insurance plan when the user does not have a house', () => {
    const insuranceRiskCalculator = new HomeInsuranceRiskCalculator();
    const input = stub({ house: undefined })

    expect(insuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Inelegible);
  });

  it('deducts 2 risk points from the home insurance score when the user is under 30 years old', () => {
    const insuranceRiskCalculator = new HomeInsuranceRiskCalculator();
    const input = stub({
      age: 29,
      riskQuestions: [1, 1, 1],
      house: undefined,
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(1);
  });

  it('deducts 1 risk point from the home insurance score when the user is between 30 and 40 years old', () => {
    const insuranceRiskCalculator = new HomeInsuranceRiskCalculator();
    const input = stub({
      age: 35,
      riskQuestions: [1, 1, 1],
      house: undefined,
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('deducts 1 risk point from the home insurance score when the user income is above $200k', () => {
    const insuranceRiskCalculator = new HomeInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      house: undefined,
      income: 200001,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('adds 1 risk point to the home insurance score when the user\'s house is mortgaged', () => {
    const insuranceRiskCalculator = new HomeInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      house: { ownershipStatus: 'mortgaged' },
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(4);
  });
});
