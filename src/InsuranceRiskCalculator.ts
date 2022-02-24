import RiskFactorCalculator from './RiskFactorCalculator';
import UserProfile from './UserProfile';

export enum InsurancePlan {
  Economic = 'economic',
  Regular = 'regular',
  Responsible = 'responsible',
  Inelegible = 'inelegible',
}

export default abstract class InsuranceRiskCalculator {
  constructor(
    protected readonly riskFactorCalculatorChain: RiskFactorCalculator,
  ) { }

  protected abstract isElegible(input: UserProfile): boolean;

  /**
   * This function could have probably be moved to a separate class
   * but I felt like it would probably be always used together with
   * the InsuranceRiskCalculator class anyway, so I kept it here.
   * This way there is also the added benefit of being able to have
   * a different score => plan mapping for each class that inherits
   * from InsuranceRiskCalculator (even though this is not a requirement).
   */
  protected calculatePlan(finalScore: number, isElegible: boolean): InsurancePlan {
    if (!isElegible) return InsurancePlan.Inelegible;
    if (finalScore <= 0) return InsurancePlan.Economic;
    if (finalScore <= 2) return InsurancePlan.Regular;

    return InsurancePlan.Responsible;
  }

  private calculateBaseScore(input: UserProfile): number {
    return input.riskQuestions.reduce(
      (score, question) => score + question, 0
    );
  }

  protected calculateRiskScore(input: UserProfile, baseScore: number): number {
    return this.riskFactorCalculatorChain.calculateRiskFactorScore(
      input,
      baseScore,
    );
  }

  public calculate(input: UserProfile) {
    const baseScore = this.calculateBaseScore(input);
    const riskScore = this.calculateRiskScore(input, baseScore);
    const isElegible = this.isElegible(input);
    const plan = this.calculatePlan(riskScore, isElegible);

    return {
      isElegible,
      riskScore,
      plan,
    }
  }
}
