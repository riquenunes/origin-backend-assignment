import UserProfile from '../../../UserProfile';
import RiskFactor from './RiskFactor';

export default class UnderThirtyRiskFactor extends RiskFactor {
  constructor(riskScoreIncrement: number = -2) {
    super(riskScoreIncrement);
  }

  protected isApplicable(profile: UserProfile): boolean {
    return profile.age < 30;
  }
}
