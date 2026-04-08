import { Entity } from '../base/entity.js';
import { HoldingId } from './holding-id.js';
import { WalletId } from './wallet-id.js';
import { AssetSymbol } from './value-objects/asset-symbol.js';
import { Quantity } from './value-objects/quantity.js';

export interface HoldingProps {
  id: HoldingId;
  walletId: WalletId;
  symbol: AssetSymbol;
  quantity: Quantity;
}

export class Holding extends Entity<HoldingId> {
  private _walletId: WalletId;
  private _symbol: AssetSymbol;
  private _quantity: Quantity;

  private constructor(props: HoldingProps) {
    super(props.id);
    this._walletId = props.walletId;
    this._symbol = props.symbol;
    this._quantity = props.quantity;
  }

  static create(props: HoldingProps): Holding {
    return new Holding(props);
  }

  static reconstitute(props: HoldingProps): Holding {
    return new Holding(props);
  }

  addQuantity(amount: Quantity): void {
    this._quantity = this._quantity.add(amount);
  }

  subtractQuantity(amount: Quantity): void {
    this._quantity = this._quantity.subtract(amount);
  }

  get walletId(): WalletId {
    return this._walletId;
  }

  get symbol(): AssetSymbol {
    return this._symbol;
  }

  get quantity(): Quantity {
    return this._quantity;
  }
}
