import { Identifier } from '../base/identifier.js';

export class WalletId extends Identifier {
  static generate(): WalletId {
    return new WalletId({ value: Identifier.generateUUID() });
  }

  static fromString(id: string): WalletId {
    return new WalletId({ value: id });
  }
}
