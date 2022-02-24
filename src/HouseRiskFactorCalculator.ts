import RiskFactorCalculator from './RiskFactorCalculator';
import UserProfile from './UserProfile';

export default class HouseRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: UserProfile): number {
    if (input.house?.ownershipStatus === 'mortgaged') return 1;

    return 0;
  }
}
