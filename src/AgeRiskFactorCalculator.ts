import RiskFactorCalculator from './RiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class AgeRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: RiskProfileCalculatorInput): number {
    if (input.age < 30) return -2;
    if (input.age <= 40) return -1;

    return 0;
  }
}
