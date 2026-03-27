import { Identifier } from '../base/identifier.js';

export class UserId extends Identifier {
  static generate(): UserId {
    return new UserId({ value: Identifier.generateUUID() });
  }

  static fromString(id: string): UserId {
    return new UserId({ value: id });
  }
}
