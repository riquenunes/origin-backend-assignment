import ValidationError from '../../src/domain/errors/ValidationError';
import UserProfile, { HouseInfo, VehicleInfo } from '../../src/domain/UserProfile';
import UserProfileDummy from '../doubles/UserProfileDummy';

describe('User profile', () => {
  describe('Required fields validation', () => {
    const requiredFields: Array<keyof UserProfile> = [
      'age',
      'dependents',
      'income',
      'maritalStatus',
      'riskQuestions',
    ];

    it.each(requiredFields)('throws a validation error when %s is not passed', (property: keyof UserProfile) => {
      expect(() => new UserProfileDummy({
        [property]: undefined,
      })).toThrow(ValidationError);
    });

    it('throws a validation error when house ownership status is not passed', () => {
      expect(() => new UserProfileDummy({
        house: new HouseInfo(undefined)
      })).toThrow(ValidationError);
    });

    it('throws a validation error when vehicle year is not passed', () => {
      expect(() => new UserProfileDummy({
        vehicle: new VehicleInfo(undefined)
      })).toThrow(ValidationError);
    });
  });

  describe('Minimum value validations', () => {
    const fieldsWithMinimumValueValidation: Array<keyof UserProfile> = [
      'age',
      'dependents',
      'income'
    ];

    it.each(fieldsWithMinimumValueValidation)('throws a validation error when %s is below 0', (property: keyof UserProfile) => {
      expect(() => new UserProfileDummy({
        [property]: -1,
      })).toThrow(ValidationError);
    });

    it('throws a validation error when vehicle year is below 0', () => {
      expect(() => new UserProfileDummy({
        vehicle: new VehicleInfo(-1)
      })).toThrow(ValidationError);
    });
  });

  it('throws a validation error when risk questions array does not have 3 elements', () => {
    expect(() => new UserProfileDummy({
      riskQuestions: [1, 1]
    })).toThrow(ValidationError);
  });

  it('throws a validation error when an invalid marital status is passed', () => {
    expect(() => new UserProfileDummy({
      maritalStatus: 'invalid' as any // need to cast to any otherwise typescript wouldn't let me pass an invalid value
    })).toThrow(ValidationError);
  });

  it('throws a validation error when an invalid house ownership status is passed', () => {
    expect(() => new UserProfileDummy({
      house: new HouseInfo('invalid' as any) // need to cast to any otherwise typescript wouldn't let me pass an invalid value
    })).toThrow(ValidationError);
  });
});
