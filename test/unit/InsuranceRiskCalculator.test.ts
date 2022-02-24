import InsuranceRiskCalculator, { InsurancePlan } from '../../src/InsuranceRiskCalculator';
import RiskFactorCalculator from '../../src/RiskFactorCalculator';
import UserProfile from '../../src/UserProfile';
import { stub } from '../doubles/stubs/RiskProfileCalculatorInput';

class DummyInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor(
    private readonly scoreOverride: number,
    private readonly elegibilityOverride: boolean,
  ) {
    super(new DummyRiskFactorCalculator());
  }

  public isElegible(): boolean {
    return this.elegibilityOverride;
  }

  protected calculateRiskScore(): number {
    return this.scoreOverride;
  }
}

class DummyRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: UserProfile): number {
    return 0;
  }
}

describe('Insurance risk calculator', () => {
  const input = stub();

  describe('when the user is elegible for a plan in a given insurance line', () => {
    it('returns an economic plan when the score is 0 and below', () => {
      const insuranceRiskCalculator = new DummyInsuranceRiskCalculator(0, true);

      expect(insuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Economic);
    });

    it('returns an regular plan when the score is 1 or 2', () => {
      const firstInsuranceRiskCalculator = new DummyInsuranceRiskCalculator(1, true);
      const secondInsuranceRiskCalculator = new DummyInsuranceRiskCalculator(2, true);

      expect(firstInsuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Regular);
      expect(secondInsuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Regular);
    });

    it('returns an responsible plan when the score is 3 or above', () => {
      const firstInsuranceRiskCalculator = new DummyInsuranceRiskCalculator(3, true);
      const secondInsuranceRiskCalculator = new DummyInsuranceRiskCalculator(10, true);

      expect(firstInsuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Responsible);
      expect(secondInsuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Responsible);
    });
  });

  it('returns inelegible when the user is inelegible for a plan in a given insurance line', () => {
    const insuranceRiskCalculator = new DummyInsuranceRiskCalculator(0, false);

    expect(insuranceRiskCalculator.calculate(input).plan).toBe(InsurancePlan.Inelegible);
  });
});
