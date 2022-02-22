export enum InsurancePlan {
  Economic = 'economic',
  Regular = 'regular',
  Responsible = 'responsible',
  Inelegible = 'inelegible',
}

export default class InsuranceLine {
  constructor(
    private readonly score: number,
    private readonly isElegible: boolean,
  ) { }

  public get plan(): InsurancePlan {
    if (!this.isElegible) return InsurancePlan.Inelegible;
    if (this.score <= 0) return InsurancePlan.Economic;
    if (this.score === 1 || this.score === 2) return InsurancePlan.Regular;

    return InsurancePlan.Responsible;
  }
}
