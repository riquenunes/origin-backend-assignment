import LifeInsuranceRiskCalculator from '../../src/domain/services/risk-calculators/LifeInsuranceRiskCalculator';
import UserProfileDummy from '../doubles/UserProfileDummy';

describe('Life insurance risk calculator', () => {
  it('returns that the user is inelegible for a life insurance plan when the user is over 60 years old', () => {
    const insuranceRiskCalculator = new LifeInsuranceRiskCalculator();
    const input = new UserProfileDummy({ age: 61 })

    expect(insuranceRiskCalculator.calculate(input).isElegible).toBe(false);
  });

  it('deducts 2 risk points from the life insurance score when the user is under 30 years old', () => {
    const insuranceRiskCalculator = new LifeInsuranceRiskCalculator();
    const input = new UserProfileDummy({
      riskQuestions: [1, 1, 1],
      age: 29,
      dependents: 0,
      maritalStatus: 'single',
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(1);
  });

  it('deducts 1 risk point from the life insurance score when the user is between 30 and 40 years old', () => {
    const insuranceRiskCalculator = new LifeInsuranceRiskCalculator();
    const input = new UserProfileDummy({
      age: 35,
      riskQuestions: [1, 1, 1],
      dependents: 0,
      maritalStatus: 'single',
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('deducts 1 risk point from the life insurance score when the user income is above $200k', () => {
    const insuranceRiskCalculator = new LifeInsuranceRiskCalculator();
    const input = new UserProfileDummy({
      age: 45,
      riskQuestions: [1, 1, 1],
      dependents: 0,
      maritalStatus: 'single',
      income: 200001,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });
});
