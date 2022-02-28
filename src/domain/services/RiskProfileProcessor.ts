import RiskProfile from '../RiskProfile';

export default interface RiskProfileProcessor<TOutput = any> {
  process(riskProfile: RiskProfile): TOutput;
}
