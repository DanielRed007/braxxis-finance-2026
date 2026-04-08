import { Entity } from '../base/entity.js';
import { OrderId } from './order-id.js';
import { WalletId } from './wallet-id.js';
import { AssetSymbol } from './value-objects/asset-symbol.js';
import { Quantity } from './value-objects/quantity.js';
import { Money } from './value-objects/money.js';

export type OrderSide = 'buy' | 'sell';

export interface SpotOrderProps {
  id: OrderId;
  walletId: WalletId;
  symbol: AssetSymbol;
  side: OrderSide;
  quantity: Quantity;
  price: Money;
  total: Money;
  executedAt: Date;
}

export class SpotOrder extends Entity<OrderId> {
  private readonly _walletId: WalletId;
  private readonly _symbol: AssetSymbol;
  private readonly _side: OrderSide;
  private readonly _quantity: Quantity;
  private readonly _price: Money;
  private readonly _total: Money;
  private readonly _executedAt: Date;

  private constructor(props: SpotOrderProps) {
    super(props.id);
    this._walletId = props.walletId;
    this._symbol = props.symbol;
    this._side = props.side;
    this._quantity = props.quantity;
    this._price = props.price;
    this._total = props.total;
    this._executedAt = props.executedAt;
  }

  static create(props: Omit<SpotOrderProps, 'id' | 'executedAt'>): SpotOrder {
    return new SpotOrder({
      ...props,
      id: OrderId.generate(),
      executedAt: new Date(),
    });
  }

  static reconstitute(props: SpotOrderProps): SpotOrder {
    return new SpotOrder(props);
  }

  get walletId(): WalletId { return this._walletId; }
  get symbol(): AssetSymbol { return this._symbol; }
  get side(): OrderSide { return this._side; }
  get quantity(): Quantity { return this._quantity; }
  get price(): Money { return this._price; }
  get total(): Money { return this._total; }
  get executedAt(): Date { return this._executedAt; }
}
