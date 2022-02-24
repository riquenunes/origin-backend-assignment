import RiskFactorCalculator from './RiskFactorCalculator';
import UserProfile from './UserProfile';

export default class MariageRiskFactorCalculator extends RiskFactorCalculator {
  constructor(
    private readonly riskWeight: number,
  ) {
    super();
  }

  protected calculateRiskIncrement(input: UserProfile): number {
    if (input.maritalStatus === 'married') return this.riskWeight;

    return 0;
  }
}
