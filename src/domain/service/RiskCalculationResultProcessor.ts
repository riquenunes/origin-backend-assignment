import RiskCalculationResult from '../RiskCalculationResult';

export default interface RiskCalculationResultProcessor<TOutput = any> {
  process(calculationResult: RiskCalculationResult): TOutput;
}
