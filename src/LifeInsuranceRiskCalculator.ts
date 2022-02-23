import AgeRiskFactorCalculator from './AgeRiskFactorCalculator';
import DependentRiskFactorCalculator from './DependentRiskFactorCalculator';
import IncomeRiskFactorCalculator from './IncomeRiskFactorCalculator';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import MariageRiskFactorCalculator from './MariageRiskFactorCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class LifeInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactorCalculatorChain = new DependentRiskFactorCalculator()

    riskFactorCalculatorChain
      .setNext(new MariageRiskFactorCalculator(1))
      .setNext(new AgeRiskFactorCalculator())
      .setNext(new IncomeRiskFactorCalculator());

    super(riskFactorCalculatorChain);
  }

  protected isElegible(input: RiskProfileCalculatorInput): boolean {
    return input.age <= 60;
  }
}
