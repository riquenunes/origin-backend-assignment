import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default abstract class RiskFactorCalculator {
  private nextHandler?: RiskFactorCalculator;

  public setNext(next: RiskFactorCalculator): RiskFactorCalculator {
    this.nextHandler = next;

    return next;
  }

  protected abstract calculateRiskIncrement(input: RiskProfileCalculatorInput): number;

  public calculateRiskFactor(
    input: RiskProfileCalculatorInput,
    currentRisk: number,
  ): number {
    const increment = this.calculateRiskIncrement(input);
    const updatedRisk = currentRisk + increment;

    if (this.nextHandler) {

      return this.nextHandler.calculateRiskFactor(input, updatedRisk);
    }

    return updatedRisk;
  }
}
