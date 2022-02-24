import UserProfile from './UserProfile';

export default abstract class RiskFactorCalculator {
  private nextHandler?: RiskFactorCalculator;

  public setNext(next: RiskFactorCalculator): RiskFactorCalculator {
    this.nextHandler = next;

    return next;
  }

  protected abstract calculateRiskIncrement(input: UserProfile): number;

  public calculateRiskFactorScore(
    input: UserProfile,
    currentRiskScore: number,
  ): number {
    const increment = this.calculateRiskIncrement(input);
    const updatedRisk = currentRiskScore + increment;

    if (this.nextHandler) {

      return this.nextHandler.calculateRiskFactorScore(input, updatedRisk);
    }

    return updatedRisk;
  }
}
