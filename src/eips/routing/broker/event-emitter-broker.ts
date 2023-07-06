import {EventEmitter} from "node:events";
import {EmailChangedChannel} from "../../../../example/user/infrastructure/email-changed-channel";
import {Subscriber} from "../../../infrastructure/subscriber";
import {Channel} from "../../channels/channel";
import {Broker} from "./broker";

export class EventEmitterBroker<C extends Channel<any>> extends Broker<C> {
    private broker = new EventEmitter()
    private registry = new Map<string, Subscriber>()

    override connect?(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    override disconnect?(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    override publish(message: unknown): void | Promise<void> {
        this.broker.emit("${channel.constructor.name}", message)
    }

    override acknowledge(message: unknown): void | Promise<void> {
        this.broker.emit("acknowledge", message)
    }

    override subscribe<X extends C>(channel: X, subscriber: Subscriber): void | Promise<void> {
        this.registry.set(channel.constructor.name, subscriber)
        this.broker.on(`${channel.constructor.name}`, (message: unknown) => {
            subscriber.handle(message)
        })
    }

    override unsubscribe<X extends C>(channel: X, _subscriber: Subscriber): void | Promise<void> {
        this.registry.delete(channel.constructor.name)
    }
}

export const eventEmitterBroker = new EventEmitterBroker<EmailChangedChannel>()
