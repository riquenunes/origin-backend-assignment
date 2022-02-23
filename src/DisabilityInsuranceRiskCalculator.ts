import AgeRiskFactorCalculator from './AgeRiskFactorCalculator';
import DependentRiskFactorCalculator from './DependentRiskFactorCalculator';
import HouseRiskFactorCalculator from './HouseRiskFactorCalculator';
import IncomeRiskFactorCalculator from './IncomeRiskFactorCalculator';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import MariageRiskFactorCalculator from './MariageRiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class DisabilityInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactorCalculatorChain = new HouseRiskFactorCalculator()

    riskFactorCalculatorChain.setNext(new DependentRiskFactorCalculator())
      .setNext(new MariageRiskFactorCalculator(-1))
      .setNext(new AgeRiskFactorCalculator())
      .setNext(new IncomeRiskFactorCalculator());

    super(riskFactorCalculatorChain);
  }

  protected isElegible(input: RiskProfileCalculatorInput): boolean {
    return input.income > 0 && input.age <= 60;
  }
}
