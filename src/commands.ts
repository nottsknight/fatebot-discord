export class CommandData {}

export class ToasterCommandData extends CommandData {}

export class RollCommandData extends CommandData {
  modifier: number;

  constructor(mod: number | null) {
    super();
    this.modifier = mod ? mod : 0;
  }
}
