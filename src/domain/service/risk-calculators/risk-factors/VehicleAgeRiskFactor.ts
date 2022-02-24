import UserProfile from '../../../UserProfile';
import RiskFactor from './RiskFactor';

export default class VehicleRiskFactor extends RiskFactor {
  constructor(riskScoreIncrement: number = 1) {
    super(riskScoreIncrement);
  }

  protected isApplicable(profile: UserProfile): boolean {
    // It would probably be better to have this somehow injected in the constructor
    // so we can better test this logic by always having a known date instead of
    // relying on the system date, but to keep this assignment simpler I've decided
    // to simply use the system date and write my tests subtracting 5 years from
    // the current system date instead
    const currentYear = new Date().getFullYear();

    return profile.vehicle && (currentYear - profile.vehicle.year) <= 5
  }
}
