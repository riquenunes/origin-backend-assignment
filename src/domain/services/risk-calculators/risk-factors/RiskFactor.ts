import UserProfile from '../../../UserProfile';

export default abstract class RiskFactor {
  constructor(
    protected readonly riskScoreIncrement: number,
  ) { }

  private nextHandler?: RiskFactor;

  public setNext(next: RiskFactor): RiskFactor {
    this.nextHandler = next;

    return next;
  }

  protected abstract isApplicable(profile: UserProfile): boolean;

  public getScore(
    profile: UserProfile,
    currentRiskScore: number,
  ): number {
    const increment = this.isApplicable(profile) ? this.riskScoreIncrement : 0;
    const updatedRiskScore = currentRiskScore + increment;

    if (this.nextHandler) {
      return this.nextHandler.getScore(profile, updatedRiskScore);
    }

    return updatedRiskScore;
  }
}
