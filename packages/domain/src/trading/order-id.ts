import { Identifier } from '../base/identifier.js';

export class OrderId extends Identifier {
  static generate(): OrderId {
    return new OrderId({ value: Identifier.generateUUID() });
  }

  static fromString(id: string): OrderId {
    return new OrderId({ value: id });
  }
}
