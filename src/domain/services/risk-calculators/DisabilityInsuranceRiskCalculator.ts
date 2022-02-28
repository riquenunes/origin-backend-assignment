import UnderThirtyRiskFactor from './risk-factors/UnderThirtyRiskFactor';
import ThirtiesRiskFactor from './risk-factors/ThirtiesRiskFactor';
import DependentNumberRiskFactor from './risk-factors/DependentNumberRiskFactor';
import HouseOwnershipStatusRiskFactor from './risk-factors/HouseOwnershipStatusRiskFactor';
import IncomeAmountRiskFactor from './risk-factors/IncomeAmountRiskFactor';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import MaritalStatusRiskFactor from './risk-factors/MaritalStatusRiskFactor';
import UserProfile from '../../UserProfile';

export default class DisabilityInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactors = new HouseOwnershipStatusRiskFactor()

    riskFactors
      .setNext(new DependentNumberRiskFactor())
      .setNext(new MaritalStatusRiskFactor(-1))
      .setNext(new UnderThirtyRiskFactor())
      .setNext(new ThirtiesRiskFactor())
      .setNext(new IncomeAmountRiskFactor());

    super(riskFactors);
  }

  protected isElegible(profile: UserProfile): boolean {
    return profile.income > 0 && profile.age <= 60;
  }
}
