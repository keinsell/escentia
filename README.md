# 🚧 `escentia` 🚧

Escentia is a fully-featured library for designing rich domain models, event-driven architectures, command-query responsibility segregation, event sourcing, and sagas. It's designed to reduce the complexity of building scalable and reliable applications (especially microservices) by providing a simple and easy-to-use interface for complicated topics and architectural patterns.

## Motivation

I'm pissed off on ecosystem, especially dumb fucks who made `nestjs`.

## Planned Features

- Designing `Aggregate`, `Entity` and `Value Object` with a easy to use abstract classes and decorators.
- Complete set of `Message` data structures such as `Command`, `Event`, `Request`, `Reply`, `Query` and more... All of them will be supported in serialization framework based on decorators (like `@Serializable()`).
- Bare minimum message/service bus which will support different transports (Message Brokers) `EventEmitter`, `RabbitMQ`, `Kafka`, `NATS` and `SQS`.
- Support for long-running serivices by usage of `Workflow`s and `Saga`s to build asynchronic processes at glance.
- Automated discovery of message handlers by usage of decorators, like `@HandleMessage(UserCreated)`.
