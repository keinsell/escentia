import {EventEmitter} from "node:events";
import {Broker} from "../../src/infrastructure/broker";
import {Channel} from "../../src/messaging/channel";
import {Subscriber} from "../../src/messaging/subscriber";
import {EmailChangedChannel} from "../user/infrastructure/email-changed-channel";

export class EventEmitterBroker<C extends Channel<any>> extends Broker<C> {
    private broker = new EventEmitter()
    private registry = new Map<string, Subscriber>()

    override publish(message: unknown): void | Promise<void> {
        this.broker.emit("message", message)
    }

    override acknowledge(message: unknown): void | Promise<void> {
        this.broker.emit("acknowledge", message)
    }

    override subscribe<X extends C>(channel: X, subscriber: Subscriber): void | Promise<void> {
        this.registry.set(channel.constructor.name, subscriber)
        this.broker.on("message", (message: unknown) => {
            subscriber.handle(message)
        })
    }

    override unsubscribe<X extends C>(channel: X, _subscriber: Subscriber): void | Promise<void> {
        this.registry.delete(channel.constructor.name)
    }
}

export const eventEmitterBroker = new EventEmitterBroker<EmailChangedChannel>()
