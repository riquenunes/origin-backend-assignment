import ValidationError from './errors/ValidationError';

export class HouseInfo {
  constructor(
    public readonly ownershipStatus: 'owned' | 'mortgaged',
  ) {
    if (ownershipStatus === undefined) throw new ValidationError('House ownership status is required');
    if (ownershipStatus !== 'owned' && ownershipStatus !== 'mortgaged') throw new ValidationError('House ownership status must be either owned or mortgaged');
  }
}

export class VehicleInfo {
  constructor(
    public readonly year: number,
  ) {
    if (year < 0) throw new ValidationError('Vehicle year must be greater or equal 0');
    if (year === undefined) throw new ValidationError('Vehicle year is required');
  }
}

export default class UserProfile {
  constructor(
    public readonly age: number,
    public readonly dependents: number,
    public readonly income: number,
    public readonly maritalStatus: 'married' | 'single',
    public readonly riskQuestions: number[],
    public readonly house: HouseInfo | undefined,
    public readonly vehicle: VehicleInfo | undefined,
  ) {
    if (age === undefined) throw new ValidationError('Age is required');
    if (dependents === undefined) throw new ValidationError('Dependents is required');
    if (income === undefined) throw new ValidationError('Income is required');
    if (maritalStatus === undefined) throw new ValidationError('Marital status is required');
    if (riskQuestions === undefined) throw new ValidationError('Risk questions are required');

    if (age < 0) throw new ValidationError('Age must be greater or equal 0');
    if (dependents < 0) throw new ValidationError('Dependents must be greater or equal 0');
    if (income < 0) throw new ValidationError('Income must be greater or equal 0');

    if (riskQuestions.length !== 3) throw new ValidationError('Risk questions must have 3 elements');
    if (maritalStatus !== 'married' && maritalStatus !== 'single') throw new ValidationError('Marital status must be either married or single');
  }
}
