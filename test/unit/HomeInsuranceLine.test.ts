import HomeInsuranceLine from '../../src/HomeInsuranceLine';
import { InsurancePlan } from '../../src/InsuranceLine';
import { stub } from '../doubles/stubs/RiskProfileCalculatorInput';

describe('home insurance line', () => {
  it('returns that the user is inelegible for an home insurance plan when the user does not have a house', () => {
    const input = stub({ house: undefined })
    const insuranceLine = new HomeInsuranceLine(input);

    expect(insuranceLine.plan).toBe(InsurancePlan.Inelegible);
  });

  it('deducts 2 risk points from the home insurance score when the user is under 30 years old', () => {
    const input = stub({
      age: 29,
      riskQuestions: [1, 1, 1],
      house: undefined,
      income: 1000,
    });
    const insuranceLine = new HomeInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(1);
  });

  it('deducts 1 risk point from the home insurance score when the user is between 30 and 40 years old', () => {
    const input = stub({
      age: 35,
      riskQuestions: [1, 1, 1],
      house: undefined,
      income: 1000,
    });
    const insuranceLine = new HomeInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(2);
  });

  it('deducts 1 risk point from the home insurance score when the user income is above $200k', () => {
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      house: undefined,
      income: 200001,
    });
    const insuranceLine = new HomeInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(2);
  });

  it('adds 1 risk point to the home insurance score when the user\'s house is mortgaged', () => {
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      house: { ownershipStatus: 'mortgaged' },
      income: 1000,
    });

    const insuranceLine = new HomeInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(4);
  });
});
