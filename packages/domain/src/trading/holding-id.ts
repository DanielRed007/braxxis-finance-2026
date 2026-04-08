import { Identifier } from '../base/identifier.js';

export class HoldingId extends Identifier {
  static generate(): HoldingId {
    return new HoldingId({ value: Identifier.generateUUID() });
  }

  static fromString(id: string): HoldingId {
    return new HoldingId({ value: id });
  }
}
