import AgeRiskCalculator from './AgeRiskCalculator';
import DependentRiskCalculator from './DependentRiskCalculator';
import IncomeRiskCalculator from './IncomeRiskCalculator';
import InsuranceLine from './InsuranceLine';
import MariageRiskCalculator from './MariageRiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default class LifeInsuranceLine extends InsuranceLine {
  constructor(
    input: RiskProfileCalculatorInput
  ) {
    const riskCalculator = new DependentRiskCalculator()

    riskCalculator
      .setNext(new MariageRiskCalculator(1))
      .setNext(new AgeRiskCalculator())
      .setNext(new IncomeRiskCalculator());

    super(input, riskCalculator);
  }

  public get isElegible(): boolean {
    return this.input.age <= 60;
  }
}
