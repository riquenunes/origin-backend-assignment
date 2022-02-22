interface HouseInfo {
  ownershipStatus: 'owned' | 'mortgaged';
}

interface VehicleInfo {
  year: number;
}

export default interface RiskProfileCalculatorInput {
  age: number;
  dependents: number;
  income: number;
  maritalStatus: 'married' | 'single';
  riskQuestions: number[];
  house?: HouseInfo;
  vehicle?: VehicleInfo;
}
