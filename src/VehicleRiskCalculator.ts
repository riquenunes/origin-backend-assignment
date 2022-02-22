import RiskCalculator from './RiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class VehicleRiskCalculator extends RiskCalculator {
  public calculateRisk(input: RiskProfileCalculatorInput, currentRisk: number): number {
    let increment = 0;
    const currentYear = new Date().getFullYear();

    if (input.vehicle && (currentYear - input.vehicle.year) <= 5) {
      increment = 1;
    }

    return super.calculateRisk(input, currentRisk + increment);
  }
}
