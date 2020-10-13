export class DiceRoll {
  constructor(public score: number, public rolls: string[]) {}

  get message(): string {
    return `You rolled a ${this.score}! ${this.rolls}`;
  }
}

export class DiceRoller {
  roll(mod = 0): DiceRoll {
    const rolls = [
      this.fateDie(),
      this.fateDie(),
      this.fateDie(),
      this.fateDie(),
    ];

    return new DiceRoll(
      rolls.reduce((sum, n) => sum + n, 0) + mod,
      rolls.map(r => this.mapDieToFace(r))
    );
  }

  private fateDie(): number {
    return Math.floor(Math.random() * 3) - 1;
  }

  private mapDieToFace(die: number): string {
    switch (die) {
      case -1:
        return '-';
      case 0:
        return 'O';
      case 1:
        return '+';
      default:
        return '';
    }
  }
}
