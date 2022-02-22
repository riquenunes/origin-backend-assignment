import DisabilityInsuranceLine from '../../src/DisabilityInsuranceLine';
import { InsurancePlan } from '../../src/InsuranceLine';
import { stub } from '../doubles/stubs/RiskProfileCalculatorInput';

describe('Disability insurance', () => {
  it('returns that the user is inelegible for a disability insurance plan when the user does not have an income', () => {
    const input = stub({ age: 30, income: 0 })
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.plan).toBe(InsurancePlan.Inelegible);
  });

  it('returns that the user is inelegible for a disability insurance plan when the user is over 60 years old', () => {
    const input = stub({ age: 61, income: 1000 })
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.plan).toBe(InsurancePlan.Inelegible);
  });

  it('deducts 2 risk points from the disability insurance score when the user is under 30 years old', () => {
    const input = stub({
      age: 29,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'single',
      house: undefined,
    });
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(1);
  });

  it('deducts 1 risk point from the disability insurance score when the user is between 30 and 40 years old', () => {
    const input = stub({
      age: 35,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'single',
      house: undefined,
    });
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(2);
  });

  it('deducts 1 risk point from the disability insurance score when the user income is above $200k', () => {
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 200001,
      dependents: 0,
      maritalStatus: 'single',
      house: undefined,
    });
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(2);
  });

  it('adds 1 risk point to the disability insurance score when the user\'s house is mortgaged', () => {
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'single',
      house: { ownershipStatus: 'mortgaged' },
    });
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(4);
  });

  it('adds 1 risk point to the disability insurance score when the user has dependents', () => {
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 2,
      maritalStatus: 'single',
      house: undefined,
    });
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(4);
  });

  it('deducts 1 risk point from the disability insurance score when the user is married', () => {
    const input = stub({
      age: 45,
      riskQuestions: [1, 1, 1],
      income: 1000,
      dependents: 0,
      maritalStatus: 'married',
      house: undefined,
    });
    const insuranceLine = new DisabilityInsuranceLine(input);

    expect(insuranceLine.finalScore).toBe(2);
  });
});
