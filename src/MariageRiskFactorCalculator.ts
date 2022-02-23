import RiskFactorCalculator from './RiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class MariageRiskFactorCalculator extends RiskFactorCalculator {
  constructor(
    private readonly riskWeight: number,
  ) {
    super();
  }

  protected calculateRiskIncrement(input: RiskProfileCalculatorInput): number {
    if (input.maritalStatus === 'married') return this.riskWeight;

    return 0;
  }
}
