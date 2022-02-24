import RiskFactorCalculator from './RiskFactorCalculator';
import UserProfile from './UserProfile';

export default class AgeRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: UserProfile): number {
    if (input.age < 30) return -2;
    if (input.age <= 40) return -1;

    return 0;
  }
}
