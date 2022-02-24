import RiskFactorCalculator from './RiskFactorCalculator';
import UserProfile from './UserProfile';

export default class IncomeRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: UserProfile): number {
    if (input.income > 200000) return -1;

    return 0;
  }
}
