import RiskFactorCalculator from './RiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class IncomeRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: RiskProfileCalculatorInput): number {
    if (input.income > 200000) return -1;

    return 0;
  }
}
