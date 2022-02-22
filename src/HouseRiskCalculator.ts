import RiskCalculator from './RiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class HouseRiskCalculator extends RiskCalculator {
  public calculateRisk(input: RiskProfileCalculatorInput, currentRisk: number): number {
    let increment = 0;

    if (input.house?.ownershipStatus === 'mortgaged') {
      increment = 1;
    }

    return super.calculateRisk(input, currentRisk + increment);
  }
}
