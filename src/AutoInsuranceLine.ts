import AgeRiskCalculator from './AgeRiskCalculator';
import IncomeRiskCalculator from './IncomeRiskCalculator';
import InsuranceLine from './InsuranceLine';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';
import VehicleRiskCalculator from './VehicleRiskCalculator';

export default class AutoInsuranceLine extends InsuranceLine {
  constructor(
    input: RiskProfileCalculatorInput
  ) {
    const riskCalculator = new VehicleRiskCalculator()

    riskCalculator
      .setNext(new AgeRiskCalculator())
      .setNext(new IncomeRiskCalculator());

    super(input, riskCalculator);
  }

  public get isElegible(): boolean {
    return !!this.input.vehicle;
  }
}
