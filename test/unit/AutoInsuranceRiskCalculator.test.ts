import AutoInsuranceRiskCalculator from '../../src/AutoInsuranceRiskCalculator';
import { InsurancePlan } from '../../src/InsuranceRiskCalculator';
import { stub } from '../doubles/stubs/RiskProfileCalculatorInput';

describe('Auto insurance risk calculator', () => {
  it('returns that the user is inelegible for an auto plan when the user does not have a vehicle', () => {
    const insuranceRiskCalculator = new AutoInsuranceRiskCalculator();
    const input = stub({ vehicle: undefined });

    expect(insuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Inelegible);
  });

  it('deducts 2 risk points from the auto insurance score when the user is under 30 years old', () => {
    const insuranceRiskCalculator = new AutoInsuranceRiskCalculator();
    const input = stub({
      age: 29,
      riskQuestions: [1, 1, 1],
      vehicle: undefined,
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(1);
  });

  it('deducts 1 risk point from the auto insurance score when the user is between 30 and 40 years old', () => {
    const insuranceRiskCalculator = new AutoInsuranceRiskCalculator();
    const input = stub({
      age: 35,
      riskQuestions: [1, 1, 1],
      vehicle: undefined,
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('deducts 1 risk point from the auto insurance score when the user income is above $200k', () => {
    const insuranceRiskCalculator = new AutoInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      vehicle: undefined,
      income: 200001,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('adds 1 risk point to the auto insurance score if the user\'s vehicle was produced in the last 5 years', () => {
    const insuranceRiskCalculator = new AutoInsuranceRiskCalculator();
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      vehicle: { year: new Date().getFullYear() - 3 },
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(4);
  });
});
