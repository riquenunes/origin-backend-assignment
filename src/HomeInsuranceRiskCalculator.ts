import AgeRiskFactorCalculator from './AgeRiskFactorCalculator';
import HouseRiskFactorCalculator from './HouseRiskFactorCalculator';
import IncomeRiskFactorCalculator from './IncomeRiskFactorCalculator';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import UserProfile from './UserProfile';

export default class HomeInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactorCalculatorChain = new HouseRiskFactorCalculator()

    riskFactorCalculatorChain
      .setNext(new AgeRiskFactorCalculator())
      .setNext(new IncomeRiskFactorCalculator());

    super(riskFactorCalculatorChain);
  }

  protected isElegible(input: UserProfile): boolean {
    return !!input.house;
  }
}
