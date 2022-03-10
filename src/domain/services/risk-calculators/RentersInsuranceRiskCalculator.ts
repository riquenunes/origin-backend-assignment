import UserProfile from '../../UserProfile';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import HouseOwnershipStatusRiskFactor from './risk-factors/HouseOwnershipStatusRiskFactor';
import IncomeAmountRiskFactor from './risk-factors/IncomeAmountRiskFactor';
import ThirtiesRiskFactor from './risk-factors/ThirtiesRiskFactor';
import UnderThirtyRiskFactor from './risk-factors/UnderThirtyRiskFactor';

export default class RentersInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactors = new HouseOwnershipStatusRiskFactor()

    riskFactors
      .setNext(new UnderThirtyRiskFactor())
      .setNext(new ThirtiesRiskFactor())
      .setNext(new IncomeAmountRiskFactor());

    super(riskFactors);
  }

  protected isElegible(profile: UserProfile): boolean {
    return profile.house?.ownershipStatus === 'rented';
  }
}
