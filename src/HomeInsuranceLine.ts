import AgeRiskCalculator from './AgeRiskCalculator';
import HouseRiskCalculator from './HouseRiskCalculator';
import IncomeRiskCalculator from './IncomeRiskCalculator';
import InsuranceLine from './InsuranceLine';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class HomeInsuranceLine extends InsuranceLine {
  constructor(
    input: RiskProfileCalculatorInput
  ) {
    const riskCalculator = new HouseRiskCalculator()

    riskCalculator
      .setNext(new AgeRiskCalculator())
      .setNext(new IncomeRiskCalculator());

    super(input, riskCalculator);
  }

  public get isElegible(): boolean {
    return !!this.input.house;
  }
}
