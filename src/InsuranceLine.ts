import RiskCalculator from './RiskCalculator';
import RiskProfileCalculatorInput from './RiskProfileCalculatorInput';

export enum InsurancePlan {
  Economic = 'economic',
  Regular = 'regular',
  Responsible = 'responsible',
  Inelegible = 'inelegible',
}

export default abstract class InsuranceLine {
  constructor(
    protected readonly input: RiskProfileCalculatorInput,
    private readonly riskCalculator: RiskCalculator,
  ) {
  }

  public abstract get isElegible(): boolean;

  public get finalScore(): number {
    const finalScore = this.riskCalculator.calculateRisk(this.input, this.initialScore);

    return finalScore;
  }

  public get plan(): InsurancePlan {
    if (!this.isElegible) return InsurancePlan.Inelegible;
    if (this.finalScore <= 0) return InsurancePlan.Economic;
    if (this.finalScore <= 2) return InsurancePlan.Regular;

    return InsurancePlan.Responsible;
  }

  private get initialScore(): number {
    return this.input.riskQuestions.reduce(
      (score, question) => score + question, 0
    );
  }
}
