import { Entity } from '../base/entity.js';
import type { UserId } from '../auth/user-id.js';
import { WalletId } from './wallet-id.js';
import { HoldingId } from './holding-id.js';
import { Holding } from './holding.entity.js';
import { SpotOrder } from './spot-order.entity.js';
import { Money } from './value-objects/money.js';
import { Quantity } from './value-objects/quantity.js';
import type { AssetSymbol } from './value-objects/asset-symbol.js';
import { InsufficientBalanceError } from './errors/insufficient-balance.error.js';
import { InsufficientHoldingsError } from './errors/insufficient-holdings.error.js';
import { InvalidOrderError } from './errors/invalid-order.error.js';

const DEFAULT_BALANCE = 100_000;

export interface PaperWalletProps {
  id: WalletId;
  userId: UserId;
  balance: Money;
  holdings: Holding[];
  createdAt: Date;
  updatedAt: Date;
}

export class PaperWallet extends Entity<WalletId> {
  private readonly _userId: UserId;
  private _balance: Money;
  private readonly _holdings: Map<string, Holding>;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: PaperWalletProps) {
    super(props.id);
    this._userId = props.userId;
    this._balance = props.balance;
    this._holdings = new Map(
      props.holdings.map((h) => [h.symbol.value, h]),
    );
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  static create(props: { id: WalletId; userId: UserId }): PaperWallet {
    const now = new Date();
    return new PaperWallet({
      ...props,
      balance: Money.create(DEFAULT_BALANCE),
      holdings: [],
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: PaperWalletProps): PaperWallet {
    return new PaperWallet(props);
  }

  executeBuy(symbol: AssetSymbol, quantity: Quantity, price: Money): SpotOrder {
    if (quantity.isZero()) {
      throw new InvalidOrderError('Quantity must be greater than zero');
    }

    const total = price.multiply(quantity.value);

    if (!this._balance.isGreaterThanOrEqual(total)) {
      throw new InsufficientBalanceError();
    }

    this._balance = this._balance.subtract(total);

    const existing = this._holdings.get(symbol.value);
    if (existing) {
      existing.addQuantity(quantity);
    } else {
      const holding = Holding.create({
        id: HoldingId.generate(),
        walletId: this.id,
        symbol,
        quantity,
      });
      this._holdings.set(symbol.value, holding);
    }

    this._updatedAt = new Date();

    return SpotOrder.create({
      walletId: this.id,
      symbol,
      side: 'buy',
      quantity,
      price,
      total,
    });
  }

  executeSell(symbol: AssetSymbol, quantity: Quantity, price: Money): SpotOrder {
    if (quantity.isZero()) {
      throw new InvalidOrderError('Quantity must be greater than zero');
    }

    const holding = this._holdings.get(symbol.value);
    if (!holding || !holding.quantity.isGreaterThanOrEqual(quantity)) {
      throw new InsufficientHoldingsError(symbol.value);
    }

    const total = price.multiply(quantity.value);

    holding.subtractQuantity(quantity);
    this._balance = this._balance.add(total);
    this._updatedAt = new Date();

    return SpotOrder.create({
      walletId: this.id,
      symbol,
      side: 'sell',
      quantity,
      price,
      total,
    });
  }

  get userId(): UserId { return this._userId; }
  get balance(): Money { return this._balance; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  get holdings(): Holding[] {
    return [...this._holdings.values()];
  }

  getHolding(symbol: string): Holding | null {
    return this._holdings.get(symbol) ?? null;
  }
}
