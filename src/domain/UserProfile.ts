interface HouseInfo {
  ownershipStatus: 'owned' | 'mortgaged';
}

interface VehicleInfo {
  year: number;
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
  ) { }
}
