import UnderThirtyRiskFactor from './risk-factors/UnderThirtyRiskFactor';
import ThirtiesRiskFactor from './risk-factors/ThirtiesRiskFactor';
import IncomeAmountRiskFactor from './risk-factors/IncomeAmountRiskFactor';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import VehicleAgeRiskFactor from './risk-factors/VehicleAgeRiskFactor';
import UserProfile from '../../UserProfile';

export default class AutoInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactors = new VehicleAgeRiskFactor()

    riskFactors
      .setNext(new UnderThirtyRiskFactor())
      .setNext(new ThirtiesRiskFactor())
      .setNext(new IncomeAmountRiskFactor());

    super(riskFactors);
  }

  protected isElegible(profile: UserProfile): boolean {
    return !!profile.vehicle;
  }
}
