import { InsurancePlan } from '../domain/services/InsurancePlanChooser';
import InsuranceRiskCalculator from '../domain/services/risk-calculators/InsuranceRiskCalculator';
import RiskProfileProcessor from '../domain/services/RiskProfileProcessor';
import UserProfile from '../domain/UserProfile';

export default class InsurancePlanAdvisor {
  constructor(
    private readonly autoInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly homeInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly lifeInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly disabilityInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly rentersInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly umbrellaInsuranceRiskCalculator: InsuranceRiskCalculator,
    private readonly riskProfileProcessor: RiskProfileProcessor,
  ) { }

  public getIdealInsurancePlans(profile: UserProfile): Record<string, InsurancePlan> {
    /**
     * This could have been implemented in a more dynamic fashion
     * by receiving an array of calculators in the constructor
     * and dynamically building the result object. But I've made
     * the assumption that the number of insurance lines is somewhat
     * stable and we wouldn't be really changing this class too much
     * to add new insurance risk calculators, so I felt like that for
     * for now, making it dynamic would only add a needless complexity
     * and hurt readability a bit.
     */
    const autoInsuranceRiskProfile = this.autoInsuranceRiskCalculator.calculate(profile);
    const homeInsuranceRiskProfile = this.homeInsuranceRiskCalculator.calculate(profile);
    const lifeInsuranceRiskProfile = this.lifeInsuranceRiskCalculator.calculate(profile);
    const disabilityInsuranceRiskProfile = this.disabilityInsuranceRiskCalculator.calculate(profile);
    const rentersInsuranceRiskProfile = this.rentersInsuranceRiskCalculator.calculate(profile);

    const autoInsurancePlan = this.riskProfileProcessor.process(autoInsuranceRiskProfile);
    const homeInsurancePlan = this.riskProfileProcessor.process(homeInsuranceRiskProfile);
    const lifeInsurancePlan = this.riskProfileProcessor.process(lifeInsuranceRiskProfile);
    const disabilityInsurancePlan = this.riskProfileProcessor.process(disabilityInsuranceRiskProfile);
    const rentersInsurancePlan = this.riskProfileProcessor.process(rentersInsuranceRiskProfile);

    const umbrellaRiskProfile = this.umbrellaInsuranceRiskCalculator.calculate(profile, [
      autoInsurancePlan,
      homeInsurancePlan,
      lifeInsurancePlan,
      disabilityInsurancePlan,
      rentersInsurancePlan
    ]);

    const umbrellaInsurancePlan = this.riskProfileProcessor.process(umbrellaRiskProfile);

    return {
      auto: autoInsurancePlan,
      home: homeInsurancePlan,
      life: lifeInsurancePlan,
      disability: disabilityInsurancePlan,
      renters: rentersInsurancePlan,
      umbrella: umbrellaInsurancePlan,
    };
  }
}
