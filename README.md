# 🚧 `escentia` 🚧

Escentia is a fully-featured library for designing rich domain models, event-driven architectures, command-query responsibility segregation, event sourcing, and sagas. It's designed to reduce the complexity of building scalable and reliable applications (especially microservices) by providing a simple and easy-to-use interface for complicated topics and architectural patterns.

What makes it different? Oxidation, I wish to keep focus on keeping TypeScript experience on highest possible level to avoid as much errors as it's possible - we can archive this by usage of Runtime Typings, `Option<T>` and `Result<T,E>` from `oxide.ts` and by usage of decorators to avoid boilerplate code. Additonally, I would like to abstract common processes in web dev such as mapping objects to DTOs, serialization, deserialization, validation and more...

## Planned Experience

There are plans for library experience.

### Messaging

In terms of messaging decorators allow for some pour of magic over there, I would like to register messages and it's handlers on the fly by usage of decorators, for example:

```typescript
@CommandHandler(UserCreated)
export class CreateUserHandler {
  @HandleMessage(UserCreated)
  execute(command: UserCreated) {
    // ...
  }
}
```

Library should automatically discover messages, their channels and handlers and register them in message bus or message broker.

### Domain

Domain is a core of every application, it's a place where business logic is stored. I would like to provide a set of decorators and abstract classes to make it easy to design domain models, entities, value objects and more...

```typescript
@Aggregate({
  singularNaming: 'User',
  pluralNaming: 'Users',
  events: [UsernameChanged],
  commands: [ChangeUsername],
})
export class User extends Aggregate {
  public username: Username
  public houses: House[]

  // This indicated for
  @OnCommand(ChangeUsername)
  changeUsername(username: Username | ChangeUsername) {
    if (username instanceof ChangeUsername) {
      username = username.username
    } else {
      username = new Username(username)
    }
    this.username = username
    this.addEvent(UsernameChanged.byAggregate(this)) // This would automatically increase version of aggregate.
  }

  @OnDomainEvent(UsernameChanged)
  onUsernameChanged(event: UsernameChanged) {
    this.username = event.username
  }
}

const user = new User({...}) { }
user.changeUsername(new Username('new-username'))
const events = user.commit()
```

Domain modeling do not end at aggregates, there I also would like to introduce some innovation into Entity, a lot of people say the Domain should not be related to persistance - I would aggre on that but not at all, the domain should not be based on persistance but must be persisted, and in this case I think we could easily prepare automappers for a entities to be later serialized and stored as models.

```typescript
@Entity(
  singularNaming: 'House',
  pluralNaming: 'Houses',
  serialize: (domain: House) => {
    return {
      id: domain.id,
      name: domain.name,
      address: domain.address,
      owner: domain.owner.id,
    }
  },
)
export class House extends Entity {
  public name: string

  create() {
    this.addEvent(HouseCreated.byEntity(this))
  }
}
```

## Data Modeling and Versioning

Data modeling may be not easiest piece of cake, as there may be a lot of different use cases, but I would like to introduce a simple way to design models and their versions, for example:

```typescript
// This approach should most likely allow fo representing database models inside codebase, in case of *split* typeorm models we can just add decorators there and in case of prisma we can implement interface and use it as a model.
@Model({
  singularNaming: 'User',
  pluralNaming: 'Users',
  schemaName: "user",
  modelOf: User,
})
export class UserModel extends Model {
  @Autogenerate()
  @FieldMapping((entity: User) => entity.id.toString())
  public id: string | number

  @FieldMapping((entity: Entity) => entity.username.toString())
  public username: string
}
```

## Motivation

I've worked with TypeScript since 2018, by all my road I think I know language good enough to contribute a bit to community, this is my first and last public library in this language as I cannot stand weak typings and JS pitfalls under the hood - I'm willing to continue my carrer in compiled languages (as now Go or Rust if I will not find a girlfriend up to end of this year).

Through all of the approaches I liked the Domain-Driven one the most, maybe it's not efficient but I was always into deep understanding of business needs and designing this that will last for long time without need for fundamentall rewrites. Behind of approach, there is a lot of missing thing in TypeScript ecosystem such as validation, serialization, deserialization, mapping, messaging, event sourcing and more... I would like to provide a library that will be easy to use and will provide a lot of features out of the box - I do not want to reinvent the wheel, I just want to make it easier to use. And it's not the only reason, I would like to attach a bit experiemental concept of runtime typing, I have everything that was touched by Nest.js framework which is so called "Enterprise-ready" yet everything is broken under the hood, also it promoted usage of `typeorm` which was in alpha for past few fucking years and I still do not get how migrations work in this shitty library.

I would like too maintain easy experience of managing resources in codebase like database connections, class instances and cyclic jobs like a cron for example.

## Planned Features

- Designing `Aggregate`, `Entity` and `Value Object` with a easy to use abstract classes and decorators.
- Complete set of `Message` data structures such as `Command`, `Event`, `Request`, `Reply`, `Query` and more... All of them will be supported in serialization framework based on decorators (like `@Serializable()`).
- Bare minimum message/service bus which will support different transports (Message Brokers) `EventEmitter`, `RabbitMQ`, `Kafka`, `NATS` and `SQS`.
- Support for long-running serivices by usage of `Workflow`s and `Saga`s to build asynchronic processes at glance.
- Automated discovery of message handlers by usage of decorators, like `@HandleMessage(UserCreated)`.

## Credits

- Library uses `Option<T>` and `Result<T,E>` from `oxide.ts`.
