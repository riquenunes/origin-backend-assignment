import RiskCalculator from './RiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class AgeRiskCalculator extends RiskCalculator {
  public calculateRisk(
    input: RiskProfileCalculatorInput,
    currentRisk: number
  ): number {
    let increment = 0;

    if (input.age < 30) {
      increment = -2;
    } else if (input.age <= 40) {
      increment = -1;
    }

    return super.calculateRisk(input, currentRisk + increment);
  }
}
