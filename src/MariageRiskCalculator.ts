import RiskCalculator from './RiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class MariageRiskCalculator extends RiskCalculator {
  constructor(
    private readonly riskWeight: number,
  ) {
    super();
  }

  public calculateRisk(input: RiskProfileCalculatorInput, currentRisk: number): number {
    let increment = 0;

    if (input.maritalStatus === 'married') {
      increment = this.riskWeight;
    }

    return super.calculateRisk(input, currentRisk + increment);
  }
}
