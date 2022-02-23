import RiskFactorCalculator from './RiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class VehicleRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: RiskProfileCalculatorInput): number {
    let increment = 0;
    const currentYear = new Date().getFullYear();

    if (input.vehicle && (currentYear - input.vehicle.year) <= 5) {
      increment = 1;
    }

    return increment;
  }
}
