import InsuranceRiskCalculator from '../../src/domain/services/risk-calculators/InsuranceRiskCalculator';
import UserProfile from '../../src/domain/UserProfile';

export default class InsuranceRiskCalculatorMock extends InsuranceRiskCalculator {
  constructor(
    private readonly calculationResult: any,
  ) {
    super(null);
  }

  protected isElegible(profile: UserProfile): boolean {
    return true;
  }

  calculate = jest.fn().mockReturnValue(this.calculationResult);
}
