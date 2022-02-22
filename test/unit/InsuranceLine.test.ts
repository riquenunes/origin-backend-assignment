import InsuranceLine, { InsurancePlan } from '../../src/InsuranceLine';
import RiskCalculator from '../../src/RiskCalculator';
import RiskProfileCalculatorInput from '../../src/RiskProfileCalculatorInput';

class DummyInsuranceLine extends InsuranceLine {
  constructor(
    private readonly scoreOverride: number,
    private readonly elegibilityOverride: boolean,
  ) {
    super({} as any, new DummyRiskCalculator());
  }

  public get isElegible(): boolean {
    return this.elegibilityOverride;
  }

  public get finalScore(): number {
    return this.scoreOverride;
  }
}

class DummyRiskCalculator extends RiskCalculator {
  public calculateRisk(input: RiskProfileCalculatorInput, currentRisk: number): number {
    return 0;
  }
}

describe('Insurance line', () => {
  describe('when the user is elegible for a plan in a given insurance line', () => {
    it('returns an economic plan when the score is 0 and below', () => {
      const insuranceLine = new DummyInsuranceLine(0, true);

      expect(insuranceLine.plan).toBe(InsurancePlan.Economic);
    });

    it('returns an regular plan when the score is 1 or 2', () => {
      const firstInsuranceLine = new DummyInsuranceLine(1, true);
      const secondInsuranceLine = new DummyInsuranceLine(2, true);

      expect(firstInsuranceLine.plan).toBe(InsurancePlan.Regular);
      expect(secondInsuranceLine.plan).toBe(InsurancePlan.Regular);
    });

    it('returns an responsible plan when the score is 3 or above', () => {
      const firstInsuranceLine = new DummyInsuranceLine(3, true);
      const secondInsuranceLine = new DummyInsuranceLine(10, true);

      expect(firstInsuranceLine.plan).toBe(InsurancePlan.Responsible);
      expect(secondInsuranceLine.plan).toBe(InsurancePlan.Responsible);
    });
  });

  it('returns inelegible when the user is inelegible for a plan in a given insurance line', () => {
    const insuranceLine = new DummyInsuranceLine(0, false);

    expect(insuranceLine.plan).toBe(InsurancePlan.Inelegible);
  });
});
