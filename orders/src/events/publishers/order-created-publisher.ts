import { Publisher, OrderCreatedEvent, Subjects } from '@wsbticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
