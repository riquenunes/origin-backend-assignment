import UserProfile from '../../../UserProfile';
import RiskFactor from './RiskFactor';

export default class ThirtiesRiskFactor extends RiskFactor {
  constructor(riskScoreIncrement: number = -1) {
    super(riskScoreIncrement);
  }

  protected isApplicable(profile: UserProfile): boolean {
    return profile.age >= 30 && profile.age <= 40;
  }
}
