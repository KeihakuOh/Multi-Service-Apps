import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@wsbticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
