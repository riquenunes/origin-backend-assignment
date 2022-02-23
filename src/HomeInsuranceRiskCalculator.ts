import AgeRiskFactorCalculator from './AgeRiskFactorCalculator';
import HouseRiskFactorCalculator from './HouseRiskFactorCalculator';
import IncomeRiskFactorCalculator from './IncomeRiskFactorCalculator';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class HomeInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactorCalculatorChain = new HouseRiskFactorCalculator()

    riskFactorCalculatorChain
      .setNext(new AgeRiskFactorCalculator())
      .setNext(new IncomeRiskFactorCalculator());

    super(riskFactorCalculatorChain);
  }

  protected isElegible(input: RiskProfileCalculatorInput): boolean {
    return !!input.house;
  }
}
