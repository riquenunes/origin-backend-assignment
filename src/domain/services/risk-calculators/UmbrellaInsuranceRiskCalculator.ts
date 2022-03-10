import UnderThirtyRiskFactor from './risk-factors/UnderThirtyRiskFactor';
import ThirtiesRiskFactor from './risk-factors/ThirtiesRiskFactor';
import IncomeAmountRiskFactor from './risk-factors/IncomeAmountRiskFactor';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import UserProfile from '../../UserProfile';
import { InsurancePlan } from '../InsurancePlanChooser';

export default class UmbrellaInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactors = new UnderThirtyRiskFactor()

    riskFactors
      .setNext(new ThirtiesRiskFactor())
      .setNext(new IncomeAmountRiskFactor());

    super(riskFactors);
  }

  protected isElegible(profile: UserProfile, previousInsurancePlans: InsurancePlan[]): boolean {
    return previousInsurancePlans.some(plan => plan === InsurancePlan.Economic);
  }
}
