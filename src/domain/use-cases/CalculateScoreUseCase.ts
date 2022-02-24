import InsuranceRiskCalculator from '../service/risk-calculators/InsuranceRiskCalculator';
import RiskCalculatorResultProcessor from '../service/RiskCalculationResultProcessor';
import UserProfile from '../UserProfile';

export default class CalculateScoreUseCase {
  constructor(
    private readonly autoInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly homeInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly lifeInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly disabilityInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly riskCalculationResultProcessor: RiskCalculatorResultProcessor,
  ) { }

  public execute(profile: UserProfile) {
    /**
     * This could have been implemented in a more dynamic fashion
     * by receiving an array of calculators in the constructor
     * and dynamically building the result object. But I've made
     * the assumption that the number of insurance lines is somewhat
     * stable and we wouldn't be really changing this class too much
     * to add new insurance calculators, so I felt like that, for now,
     * making it dynamic would only add a needless complexity and also
     * hurt readability a bit.
     */
    const autoInsuranceCalculationResult = this.autoInsuranceRiskCalculator.calculate(profile);
    const homeInsuranceCalculationResult = this.homeInsuranceRiskCalculator.calculate(profile);
    const lifeInsuranceCalculationResult = this.lifeInsuranceRiskCalculator.calculate(profile);
    const disabilityInsuranceCalculationResult = this.disabilityInsuranceRiskCalculator.calculate(profile);

    return {
      auto: this.riskCalculationResultProcessor.process(autoInsuranceCalculationResult),
      home: this.riskCalculationResultProcessor.process(homeInsuranceCalculationResult),
      life: this.riskCalculationResultProcessor.process(lifeInsuranceCalculationResult),
      disability: this.riskCalculationResultProcessor.process(disabilityInsuranceCalculationResult),
    };
  }
}
