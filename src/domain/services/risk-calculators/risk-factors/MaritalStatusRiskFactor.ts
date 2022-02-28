import UserProfile from '../../../UserProfile';
import RiskFactor from './RiskFactor';

export default class MaritalStatusRiskFactor extends RiskFactor {
  constructor(riskScoreIncrement: number = -1) {
    super(riskScoreIncrement);
  }

  protected isApplicable(profile: UserProfile): boolean {
    return profile.maritalStatus === 'married';
  }
}
