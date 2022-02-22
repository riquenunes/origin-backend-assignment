import RiskCalculator from './RiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class IncomeRiskCalculator extends RiskCalculator {
  public calculateRisk(input: RiskProfileCalculatorInput, currentRisk: number): number {
    let increment = 0;

    if (input.income > 200000) {
      increment = -1;
    }

    return super.calculateRisk(input, currentRisk + increment);
  }
}
