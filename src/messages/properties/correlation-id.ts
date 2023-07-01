export type CorrelationIdentifier = {
  /** An application that performs a business task by sending a request and waiting for a reply. */
  requestor?: string
  /** Another application that receives the request, fulfills it, then sends the reply. It gets the request ID from the request and stores it as the correlation ID in the reply. */
  replier?: string
  /** A token in the request that uniquely identifies the request. */
  requestId?: string
  /** A token in the reply that has the same value as the request ID in the request. */
  correlationId?: string
}
