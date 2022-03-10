import UmbrellaInsuranceRiskCalculator from '../../src/domain/services/risk-calculators/UmbrellaInsuranceRiskCalculator';
import UserProfileDummy from '../doubles/UserProfileDummy';
import { VehicleInfo } from '../../src/domain/UserProfile';
import { InsurancePlan } from '../../src/domain/services/InsurancePlanChooser';

describe('Umbrella risk calculator', () => {
  it('returns that the user is elegible for an umbrella insurance when any of the other insurance plans is economic', () => {
    const insuranceRiskCalculator = new UmbrellaInsuranceRiskCalculator();
    const input = new UserProfileDummy();
    const previousInsurancePlansWithEconomic = [InsurancePlan.Regular, InsurancePlan.Economic];
    const previousInsurancePlansWithoutEconomic = [InsurancePlan.Regular, InsurancePlan.Responsible];

    expect(
      insuranceRiskCalculator.calculate(input, previousInsurancePlansWithEconomic).isElegible
    ).toBe(true);

    expect(
      insuranceRiskCalculator.calculate(input, previousInsurancePlansWithoutEconomic).isElegible
    ).toBe(false);
  });

  it('deducts 2 risk points from the umbrella insurance score when the user is under 30 years old', () => {
    const insuranceRiskCalculator = new UmbrellaInsuranceRiskCalculator();
    const input = new UserProfileDummy({
      age: 29,
      riskQuestions: [1, 1, 1],
      vehicle: undefined,
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(1);
  });

  it('deducts 1 risk point from the umbrella insurance score when the user is between 30 and 40 years old', () => {
    const insuranceRiskCalculator = new UmbrellaInsuranceRiskCalculator();
    const input = new UserProfileDummy({
      age: 35,
      riskQuestions: [1, 1, 1],
      vehicle: undefined,
      income: 1000,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });

  it('deducts 1 risk point from the umbrella insurance score when the user income is above $200k', () => {
    const insuranceRiskCalculator = new UmbrellaInsuranceRiskCalculator();
    const input = new UserProfileDummy({
      age: 45,
      riskQuestions: [1, 1, 1],
      vehicle: undefined,
      income: 200001,
    });

    expect(insuranceRiskCalculator.calculate(input).riskScore).toBe(2);
  });
});
