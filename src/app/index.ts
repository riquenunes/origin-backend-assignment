import InsurancePlanChooser from '../domain/service/InsurancePlanChooser';
import AutoInsuranceRiskCalculator from '../domain/service/risk-calculators/AutoInsuranceRiskCalculator';
import DisabilityInsuranceRiskCalculator from '../domain/service/risk-calculators/DisabilityInsuranceRiskCalculator';
import HomeInsuranceRiskCalculator from '../domain/service/risk-calculators/HomeInsuranceRiskCalculator';
import LifeInsuranceRiskCalculator from '../domain/service/risk-calculators/LifeInsuranceRiskCalculator';
import CalculateScoreUseCase from '../domain/use-cases/CalculateScoreUseCase';
import { buildRouter } from './router';
import { buildServer } from './server';

/**
 * This file probably hurts the SRP principle (as it is both responsible for
 * creating all instances and starting the server) but as I've made the
 * assumption that we are only going to have a single entrypoint for this
 * application I feel like the only reason this file will ever need to change
 * is when adding new instances, so I thought it was a good trade-off hurting
 * SRP a bit to make things simpler for this exercise.
 */
const autoInsuranceRiskCalculator = new AutoInsuranceRiskCalculator();
const homeInsuranceRiskCalculator = new HomeInsuranceRiskCalculator();
const lifeInsuranceRiskCalculator = new LifeInsuranceRiskCalculator();
const disabilityInsuranceRiskCalculator = new DisabilityInsuranceRiskCalculator();
const riskCalculationResultProcessor = new InsurancePlanChooser();
const riskCalculatorUseCase = new CalculateScoreUseCase(
  autoInsuranceRiskCalculator,
  homeInsuranceRiskCalculator,
  lifeInsuranceRiskCalculator,
  disabilityInsuranceRiskCalculator,
  riskCalculationResultProcessor
);

const routerPlugin = buildRouter(riskCalculatorUseCase);
const server = buildServer(routerPlugin);

server.listen(1337, '0.0.0.0');
process.on('SIGINT', () => server.close());
