import InsurancePlanChooser from '../domain/services/InsurancePlanChooser';
import AutoInsuranceRiskCalculator from '../domain/services/risk-calculators/AutoInsuranceRiskCalculator';
import DisabilityInsuranceRiskCalculator from '../domain/services/risk-calculators/DisabilityInsuranceRiskCalculator';
import HomeInsuranceRiskCalculator from '../domain/services/risk-calculators/HomeInsuranceRiskCalculator';
import LifeInsuranceRiskCalculator from '../domain/services/risk-calculators/LifeInsuranceRiskCalculator';
import InsurancePlanAdvisor from '../application/InsurancePlanAdvisor';
import RentersInsuranceRiskCalculator from '../domain/services/risk-calculators/RentersInsuranceRiskCalculator';
import UmbrellaInsuranceRiskCalculator from '../domain/services/risk-calculators/UmbrellaInsuranceRiskCalculator';

/**
 * This can be replaced by some DI library, but I didn't feel like it was necessary for this exercise
 */
export const autoInsuranceRiskCalculator = new AutoInsuranceRiskCalculator();
export const homeInsuranceRiskCalculator = new HomeInsuranceRiskCalculator();
export const lifeInsuranceRiskCalculator = new LifeInsuranceRiskCalculator();
export const disabilityInsuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
export const rentersInsuranceRiskCalculator = new RentersInsuranceRiskCalculator();
export const umbrellaInsuranceRiskCalculator = new UmbrellaInsuranceRiskCalculator()
export const riskCalculationResultProcessor = new InsurancePlanChooser();
export const riskCalculatorUseCase = new InsurancePlanAdvisor(
  autoInsuranceRiskCalculator,
  homeInsuranceRiskCalculator,
  lifeInsuranceRiskCalculator,
  disabilityInsuranceRiskCalculator,
  rentersInsuranceRiskCalculator,
  umbrellaInsuranceRiskCalculator,
  riskCalculationResultProcessor
);
