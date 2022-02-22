import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export default abstract class RiskCalculator {
  private nextHandler?: RiskCalculator;

  public setNext(next: RiskCalculator): RiskCalculator {
    this.nextHandler = next;

    return next;
  }

  public calculateRisk(
    input: RiskProfileCalculatorInput,
    currentRisk: number = 0,
  ): number {
    if (this.nextHandler) {
      return this.nextHandler.calculateRisk(input, currentRisk);
    }

    return currentRisk;
  }
}
