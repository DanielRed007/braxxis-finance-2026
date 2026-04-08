import { ValueObject } from '../../base/value-object.js';
import { InvalidOrderError } from '../errors/invalid-order.error.js';

const ALLOWED_SYMBOLS = [
  'BTC', 'ETH', 'SOL', 'AAPL', 'NVDA',
  'TSLA', 'MSFT', 'XRP', 'BNB', 'ADA',
] as const;

export class AssetSymbol extends ValueObject<{ value: string }> {
  static create(symbol: string): AssetSymbol {
    const upper = symbol.toUpperCase().trim();
    if (!ALLOWED_SYMBOLS.includes(upper as typeof ALLOWED_SYMBOLS[number])) {
      throw new InvalidOrderError(`Unknown asset symbol: ${symbol}`);
    }
    return new AssetSymbol({ value: upper });
  }

  get value(): string {
    return this.props.value;
  }
}
