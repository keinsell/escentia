import "reflect-metadata";
import {Model, ModelProperties} from "src/data-modeling/model"
import {DomainEvent} from "src/domain-modeling/domain-event";
import {Handler} from "src/infrastructure/handler";
import {JsonDeserializer} from "src/infrastructure/serializer/deserializer";
import {JSONSerializer} from "src/infrastructure/serializer/serializer";
import {Subscriber} from "src/infrastructure/subscriber";
import {AggregateRoot} from "../src/domain-modeling/aggregate-root";
import {EntityProperties} from "../src/domain-modeling/entity";
import {SequentialId} from "../src/identifiers/sequential-id/sequential-id";
import {SerializableMessage} from "../src/infrastructure/serializer/serialization-class-registry";
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
const serialized = new JSONSerializer().serialize(event)
console.log(serialized)
const deserialized = new JsonDeserializer().deserialize(serialized)
console.log(deserialized)
