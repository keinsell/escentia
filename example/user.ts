import { Model, ModelProperties } from "src/data-modeling/model"
import { AggregateRoot } from "../src/domain-modeling/aggregate-root";
import { Entity } from "../src/domain-modeling/entity";
import { DomainEvent } from "src/domain-modeling/domain-event";
import { Channel } from "src/messaging/channel";
import { Subscriber } from "src/messaging/subscriber";
import { Handler } from "src/messaging/handler";
import { Broker } from "src/infrastructure/broker";
import { EventEmitter } from "node:events"
import {Queue} from "../src/messaging/channels/queue";
import {FirstInFirstOut} from "../src/messaging/scheduling/first-in-first-out";

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

export class EmailChangedChannel extends Queue<EmailChanged> {
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

channel.subscribe(emailChangedSubscriber)

for (let i = 0; i < 100; i++) {
  userAggregate.changeEmail("keinell@protonmail.com")
  for await (const event of userAggregate.events) {
    channel.publish(event)
  }
}


