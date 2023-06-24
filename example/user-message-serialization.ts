import "reflect-metadata";
import { EventEmitter } from "node:events"
import { Model, ModelProperties } from "src/data-modeling/model"
import { DomainEvent } from "src/domain-modeling/domain-event";
import { Broker } from "src/infrastructure/broker";
import { InMemoryQueue } from "src/messaging/channels/point-to-point/point-to-point-channel";
import { Handler } from "src/messaging/handler";
import { Subscriber } from "src/messaging/subscriber";
import { AggregateRoot } from "../src/domain-modeling/aggregate-root";
import { EntityProperties } from "../src/domain-modeling/entity";
import { SequentialId } from "../src/identifiers/sequential-id/sequential-id";
import { FirstInFirstOut } from "../src/messaging/scheduling/first-in-first-out";
import { JSONMessageSerializer } from "src/messaging/serializer/message-serializer";
import { JsonMessageDeserializer } from "src/messaging/serializer/message-deserializer";
import { RegisterMessage } from "src/messaging/serializer/message-registry";

interface UserModelProperties extends ModelProperties<string> {
  email: string
}

export class UserModel extends Model<string> implements UserModelProperties {
  public email: string

  constructor(properties: UserModelProperties) {
    super(properties)
    this.email = properties.email
  }
}

const userModel = new UserModel({ id: "1", email: "asdf" })

console.log(userModel)

@RegisterMessage('email-changed')
export class EmailChanged extends DomainEvent<User> {
}

export interface UserProperties {
  email: string
}

export class User extends AggregateRoot<SequentialId, UserProperties> implements UserProperties {
  public email: string

  constructor(properties: EntityProperties<SequentialId, UserProperties>) {
    super(properties)
    this.email = properties.email
  }

  public changeEmail(email: string) {
    this.email = email
    this.addEvent(new EmailChanged({ aggregate: this }))
    return this
  }
}

const userAggregate = new User({ email: "keinsel@protonmail.com" })

export class EventEmitterBroker extends Broker<EmailChangedChannel> {
  private broker = new EventEmitter()
  private registry = new Map<string, Subscriber>()

  override publish(message: unknown): void | Promise<void> {
    this.broker.emit("message", message)
  }

  override acknowledge(message: unknown): void | Promise<void> {
    this.broker.emit("acknowledge", message)
  }

  override subscribe(channel: EmailChangedChannel, subscriber: Subscriber): void | Promise<void> {
    this.registry.set(channel.constructor.name, subscriber)
    this.broker.on("message", (message: unknown) => {
      subscriber.handle(message)
    })
  }

  override unsubscribe(channel: EmailChangedChannel, _subscriber: Subscriber): void | Promise<void> {
    this.registry.delete(channel.constructor.name)
  }
}

export class EmailChangedChannel extends InMemoryQueue<EmailChanged> {
  constructor() {
    super(new EventEmitterBroker(), {
      scheduling: new FirstInFirstOut(),
    })
  }
}

export class EmailChangedHandler extends Handler<EmailChanged> {
  public override handle(input: EmailChanged): void | Promise<void> {
    console.log(input)
  }
}

const emailChangedSubscriber = new Subscriber(
  new EmailChangedHandler()
)

const channel = new EmailChangedChannel()
await channel.subscribe(emailChangedSubscriber)



// for (let i = 0; i < 100; i++) {
//   userAggregate.changeEmail("keinell@protonmail.com")
//   for await (const event of userAggregate._events) {
//     channel.enqueue(event)
//   }
// }

userAggregate.changeEmail("keinell@protonmail.com")
const event = await userAggregate._events[0] as EmailChanged
const serialized = new JSONMessageSerializer().serialize(event)
console.log(serialized)
const deserialized = new JsonMessageDeserializer().deserialize(serialized)
console.log(deserialized)
