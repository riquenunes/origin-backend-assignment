import UserProfile from '../../../UserProfile';
import RiskFactor from './RiskFactor';

export default class DependentNumberRiskFactor extends RiskFactor {
  constructor(riskScoreIncrement: number = 1) {
    super(riskScoreIncrement);
  }

  protected isApplicable(profile: UserProfile): boolean {
    return profile.dependents > 0;
  }
}
