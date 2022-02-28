import InsurancePlanChooser, { InsurancePlan } from '../../src/domain/services/InsurancePlanChooser';
import RiskProfile from '../../src/domain/RiskProfile';

describe('Insurance plan chooser', () => {
  const insurancePlanChooser = new InsurancePlanChooser();

  describe('when the user is elegible for a plan in a given insurance line', () => {
    it('returns an economic plan when the score is 0 and below', () => {
      const inputWithZeroedRiskScore: RiskProfile = { isElegible: true, riskScore: 0 };
      const inputWithNegativeRiskScore: RiskProfile = { isElegible: true, riskScore: -5 };

      expect(insurancePlanChooser.process(inputWithZeroedRiskScore)).toBe(InsurancePlan.Economic);
      expect(insurancePlanChooser.process(inputWithNegativeRiskScore)).toBe(InsurancePlan.Economic);
    });

    it('returns an regular plan when the score is 1 or 2', () => {
      const inputWithRiskScore1: RiskProfile = { isElegible: true, riskScore: 1 };
      const inputWithRiskScore2: RiskProfile = { isElegible: true, riskScore: 2 };

      expect(insurancePlanChooser.process(inputWithRiskScore1)).toBe(InsurancePlan.Regular);
      expect(insurancePlanChooser.process(inputWithRiskScore2)).toBe(InsurancePlan.Regular);
    });

    it('returns an responsible plan when the score is 3 or above', () => {
      const inputWithRiskScore3: RiskProfile = { isElegible: true, riskScore: 3 };
      const inputWithRiskScoreAbove3: RiskProfile = { isElegible: true, riskScore: 5 };

      expect(insurancePlanChooser.process(inputWithRiskScore3)).toBe(InsurancePlan.Responsible);
      expect(insurancePlanChooser.process(inputWithRiskScoreAbove3)).toBe(InsurancePlan.Responsible);
    });
  });

  it('returns inelegible when the user is inelegible for a plan in a given insurance line', () => {
    const input: RiskProfile = { isElegible: false, riskScore: 3 };

    expect(insurancePlanChooser.process(input)).toBe(InsurancePlan.Inelegible);
  });
});
