import { DomainEvent } from './domain-event.js';

export abstract class Entity<TId> {
  private _domainEvents: DomainEvent[] = [];

  protected constructor(readonly id: TId) {}

  get domainEvents(): ReadonlyArray<DomainEvent> {
    return [...this._domainEvents];
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }

  equals(other: Entity<TId>): boolean {
    if (other === this) return true;
    return this.id === other.id;
  }
}
