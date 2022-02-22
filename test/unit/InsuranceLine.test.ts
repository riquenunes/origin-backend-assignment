import InsuranceLine, { InsurancePlan } from '../../src/InsuranceLine';

describe('Insurance line', () => {
  describe('when the user is elegible for a plan in a given insurance line', () => {
    it('returns an economic plan when the score is 0 and below', () => {
      const insuranceLine = new InsuranceLine(0, true);

      expect(insuranceLine.plan).toBe(InsurancePlan.Economic);
    });

    it('returns an regular plan when the score is 1 or 2', () => {
      const firstInsuranceLine = new InsuranceLine(1, true);
      const secondInsuranceLine = new InsuranceLine(2, true);

      expect(firstInsuranceLine.plan).toBe(InsurancePlan.Regular);
      expect(secondInsuranceLine.plan).toBe(InsurancePlan.Regular);
    });

    it('returns an responsible plan when the score is 3 or above', () => {
      const firstInsuranceLine = new InsuranceLine(3, true);
      const secondInsuranceLine = new InsuranceLine(10, true);

      expect(firstInsuranceLine.plan).toBe(InsurancePlan.Responsible);
      expect(secondInsuranceLine.plan).toBe(InsurancePlan.Responsible);
    });
  });

  it('returns inelegible when the user is inelegible for a plan in a given insurance line', () => {
    const insuranceLine = new InsuranceLine(0, false);

    expect(insuranceLine.plan).toBe(InsurancePlan.Inelegible);
  });
});
