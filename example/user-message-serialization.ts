import "reflect-metadata";
import {Model, ModelProperties} from "src/data-modeling/model"
import {DomainEvent} from "src/domain-modeling/domain-event";
import {Handler} from "src/messaging/handler";
import {JsonMessageDeserializer} from "src/messaging/serializer/message-deserializer";
import {JSONMessageSerializer} from "src/messaging/serializer/message-serializer";
import {Subscriber} from "src/messaging/subscriber";
import {SerializableMessage} from "../src/__metadata/message-registry";
import {AggregateRoot} from "../src/domain-modeling/aggregate-root";
import {EntityProperties} from "../src/domain-modeling/entity";
import {SequentialId} from "../src/identifiers/sequential-id/sequential-id";
import {EmailChangedChannel} from "./user/infrastructure/email-changed-channel";

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

@SerializableMessage()
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
console.log(event)
const serialized = new JSONMessageSerializer().serialize(event)
console.log(serialized)
const deserialized = new JsonMessageDeserializer().deserialize(serialized)
console.log(deserialized)
