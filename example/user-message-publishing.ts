import "reflect-metadata";
import {InMemoryPointToPointChannel} from "src/eips/channels/point-to-point/point-to-point-channel";
import {Handler} from "src/infrastructure/handler";
import {Subscriber} from "src/infrastructure/subscriber";
import {eventEmitterBroker} from "../src/eips/routing/broker/event-emitter-broker";
import {sequentialId} from "../src/identifiers/sequential-id/sequential-id";
import {EmailChanged} from "./user/email-changed";
import {User} from "./user/user";
import {UserModel} from "./user/user-model";

const userModel = new UserModel({ id: "1", email: "asdf" })

console.log(userModel)




export interface UserProperties {
  email: string
}

const userAggregate = new User({ email: "keinsel@protonmail.com", id: sequentialId(1) })


export class EmailChangedChannel extends InMemoryPointToPointChannel<EmailChanged> {
  constructor() {
    super(eventEmitterBroker)
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



for (let i = 0; i < 100; i++) {
  userAggregate.changeEmail("keinell@protonmail.com")
  for await (const event of userAggregate._events) {
    channel.publish(event as EmailChanged)
  }
}
