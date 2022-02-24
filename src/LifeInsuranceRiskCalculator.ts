import AgeRiskFactorCalculator from './AgeRiskFactorCalculator';
import DependentRiskFactorCalculator from './DependentRiskFactorCalculator';
import IncomeRiskFactorCalculator from './IncomeRiskFactorCalculator';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import MariageRiskFactorCalculator from './MariageRiskFactorCalculator';
import UserProfile from './UserProfile';

export default class LifeInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactorCalculatorChain = new DependentRiskFactorCalculator()

    riskFactorCalculatorChain
      .setNext(new MariageRiskFactorCalculator(1))
      .setNext(new AgeRiskFactorCalculator())
      .setNext(new IncomeRiskFactorCalculator());

    super(riskFactorCalculatorChain);
  }

  protected isElegible(input: UserProfile): boolean {
    return input.age <= 60;
  }
}
