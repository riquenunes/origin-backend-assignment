import RiskFactorCalculator from './RiskFactorCalculator';
import UserProfile from './UserProfile';

export default class VehicleRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: UserProfile): number {
    let increment = 0;
    const currentYear = new Date().getFullYear();

    if (input.vehicle && (currentYear - input.vehicle.year) <= 5) {
      increment = 1;
    }

    return increment;
  }
}
