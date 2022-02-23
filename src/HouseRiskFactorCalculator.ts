import RiskFactorCalculator from './RiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class HouseRiskFactorCalculator extends RiskFactorCalculator {
  protected calculateRiskIncrement(input: RiskProfileCalculatorInput): number {
    if (input.house?.ownershipStatus === 'mortgaged') return 1;

    return 0;
  }
}
