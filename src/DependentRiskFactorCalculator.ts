import RiskFactorCalculator from './RiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class DependentRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: RiskProfileCalculatorInput): number {
    if (input.dependents > 0) return 1;

    return 0;
  }
}
