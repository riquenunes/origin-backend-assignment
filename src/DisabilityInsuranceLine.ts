import AgeRiskCalculator from './AgeRiskCalculator';
import DependentRiskCalculator from './DependentRiskCalculator';
import HouseRiskCalculator from './HouseRiskCalculator';
import IncomeRiskCalculator from './IncomeRiskCalculator';
import InsuranceLine from './InsuranceLine';
import MariageRiskCalculator from './MariageRiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class DisabilityInsuranceLine extends InsuranceLine {
  constructor(
    input: RiskProfileCalculatorInput
  ) {
    const riskCalculator = new HouseRiskCalculator()

    riskCalculator.setNext(new DependentRiskCalculator())
      .setNext(new MariageRiskCalculator(-1))
      .setNext(new AgeRiskCalculator())
      .setNext(new IncomeRiskCalculator());

    super(input, riskCalculator);
  }

  public get isElegible(): boolean {
    return this.input.income > 0
      && this.input.age <= 60;
  }
}
