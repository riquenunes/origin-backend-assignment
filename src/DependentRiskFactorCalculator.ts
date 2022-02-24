import RiskFactorCalculator from './RiskFactorCalculator';
import UserProfile from './UserProfile';

export default class DependentRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: UserProfile): number {
    if (input.dependents > 0) return 1;

    return 0;
  }
}
