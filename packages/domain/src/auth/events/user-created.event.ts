import { DomainEvent } from '../../base/domain-event.js';

export class UserCreatedEvent extends DomainEvent {
  constructor(
    readonly userId: string,
    readonly email: string,
  ) {
    super();
  }

  get eventName(): string {
    return 'user.created';
  }
}
