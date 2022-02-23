interface HouseInfo {
  ownershipStatus: 'owned' | 'mortgaged';
}

interface VehicleInfo {
  year: number;
}

export default class RiskProfileCalculatorInput {
  constructor(
    public readonly age: number,
    public readonly dependents: number,
    public readonly income: number,
    public readonly maritalStatus: 'married' | 'single',
    public readonly riskQuestions: number[],
    public readonly house: HouseInfo | undefined,
    public readonly vehicle: VehicleInfo | undefined,
  ) { }

  public get initialScore(): number {
    return this.riskQuestions.reduce(
      (score, question) => score + question, 0
    );
  }
}

// export default interface RiskProfileCalculatorInput {
//   age: number;
//   dependents: number;
//   income: number;
//   maritalStatus: 'married' | 'single';
//   riskQuestions: number[];
//   house?: HouseInfo;
//   vehicle?: VehicleInfo;
// }
