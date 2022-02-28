import RiskProfile from '../../RiskProfile';
import UserProfile from '../../UserProfile';
import RiskFactor from './risk-factors/RiskFactor';

export default abstract class InsuranceRiskCalculator {
  constructor(
    protected readonly riskFactors: RiskFactor,
  ) { }

  protected abstract isElegible(profile: UserProfile): boolean;

  private calculateBaseScore(profile: UserProfile): number {
    return profile.riskQuestions.reduce(
      (score, question) => score + question, 0
    );
  }

  private calculateRiskScore(profile: UserProfile, baseScore: number): number {
    return this.riskFactors.getScore(
      profile,
      baseScore,
    );
  }

  public calculate(profile: UserProfile): RiskProfile {
    const baseScore = this.calculateBaseScore(profile);
    const riskScore = this.calculateRiskScore(profile, baseScore);
    const isElegible = this.isElegible(profile);

    return {
      isElegible,
      riskScore,
    }
  }
}
