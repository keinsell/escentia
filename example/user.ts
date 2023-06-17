import { Model, ModelProperties } from "src/data-modeling/model"
import { AggregateRoot } from "../src/domain-modeling/aggregate-root";
import { Entity } from "../src/domain-modeling/entity";
import { DomainEvent } from "src/domain-modeling/domain-event";
import { Channel } from "src/messaging/channel";
import { Subscriber } from "src/messaging/subscriber";
import { Handler } from "src/messaging/handler";
import { Broker } from "src/infrastructure/broker";
import { EventEmitter } from "events"

interface UserProperties extends ModelProperties<string> {
  email: string
}

export class UserModel extends Model<string> implements UserProperties {
  public email: string

  constructor(properties: UserProperties) {
    super(properties)
    this.email = properties.email
  }
}

const userModel = new UserModel({ id: "1", email: "asdf" })

// console.log(userModel)

export class UserAccount extends Entity<string> {
  public email: string

  constructor(properties: UserProperties) {
    super(properties.id)
    this.email = properties.email
  }

  public changeEmail(email: string) {
    this.email = email
    this.incrementVersion()
  }
}

const userEntity = new UserAccount({ id: userModel.id, email: userModel.email })

// console.log(userEntity)

export class EmailChanged extends DomainEvent<User> { }

export class User extends AggregateRoot<UserAccount> {
  constructor(root: UserAccount) {
    super(root)
  }

  public changeEmail(email: string) {
    this.root.changeEmail(email)
    this.incrementVersion()
    this.addEvent(new EmailChanged({ aggregate: this }))
    return this
  }
}

const userAggregate = new User(userEntity)

userAggregate.changeEmail("keinell@protonmail.com")

export class EventEmitterBroker extends Broker {
  private broker = new EventEmitter()
  private registry = new Map<string, Subscriber>()

  override publish(message: unknown): void | Promise<void> {
    console.log(`Publishing message... ${message}`)
    this.broker.emit("message", message)
  }

  override acknowledge(message: unknown): void | Promise<void> {
    this.broker.emit("acknowledge", message)
  }

  override subscribe(channel: Channel, subscriber: Subscriber): void | Promise<void> {
    this.registry.set(channel.constructor.name, subscriber)
    this.broker.on("message", (message: unknown) => {
      subscriber.handle(message)
    })
  }

  override unsubscribe(channel: Channel, _subscriber: Subscriber): void | Promise<void> {
    this.registry.delete(channel.constructor.name)
  }
}

export class EmailChangedChannel extends Channel {
  override MessageType = EmailChanged
}

export class EmailChangedHandler extends Handler<EmailChanged> {
  public override handle(input: EmailChanged): void | Promise<void> {
    console.log(input)
  }
}

const emailChangedSubscriber = new Subscriber(
  new EmailChangedHandler()
)

const channel = new EmailChangedChannel(new EventEmitterBroker())

channel.subscribe(emailChangedSubscriber)

for await (const event of userAggregate.events) {
  channel.publish(event)
}
