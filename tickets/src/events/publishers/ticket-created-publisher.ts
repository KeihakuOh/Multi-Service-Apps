import { Publisher, Subjects, TicketCreatedEvent } from '@wsbticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
