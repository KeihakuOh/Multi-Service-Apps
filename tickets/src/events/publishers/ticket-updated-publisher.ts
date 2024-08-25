import { Publisher, Subjects, TicketUpdatedEvent } from '@wsbticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
