import AgeRiskFactorCalculator from './AgeRiskFactorCalculator';
import IncomeRiskFactorCalculator from './IncomeRiskFactorCalculator';
import InsuranceRiskCalculator from './InsuranceRiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';
import VehicleRiskFactorCalculator from './VehicleRiskFactorCalculator';

export default class AutoInsuranceRiskCalculator extends InsuranceRiskCalculator {
  constructor() {
    const riskFactorCalculatorChain = new VehicleRiskFactorCalculator()

    riskFactorCalculatorChain
      .setNext(new AgeRiskFactorCalculator())
      .setNext(new IncomeRiskFactorCalculator());

    super(riskFactorCalculatorChain);
  }

  protected isElegible(input: RiskProfileCalculatorInput): boolean {
    return !!input.vehicle;
  }
}
