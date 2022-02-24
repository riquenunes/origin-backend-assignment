import UnderThirtyRiskFactor from './risk-factors/UnderThirtyRiskFactor';
import ThirtiesRiskFactor from './risk-factors/ThirtiesRiskFactor';
import HouseOwnershipStatusRiskFactor from './risk-factors/HouseOwnershipStatusRiskFactor';
import IncomeAmountRiskFactor from './risk-factors/IncomeAmountRiskFactor';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import UserProfile from '../../UserProfile';

export default class HomeInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactors = new HouseOwnershipStatusRiskFactor()

    riskFactors
      .setNext(new UnderThirtyRiskFactor())
      .setNext(new ThirtiesRiskFactor())
      .setNext(new IncomeAmountRiskFactor());

    super(riskFactors);
  }

  protected isElegible(input: UserProfile): boolean {
    return !!input.house;
  }
}
