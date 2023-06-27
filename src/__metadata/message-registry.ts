import {Constructor} from "type-fest";
import {Message} from "../messages";
import {MessageUtilities} from "../messages/message";

type MessageConstructor<T = unknown> = Constructor<Message<T>>

export const MessageRegistryStorage = new Map<string | symbol, MessageConstructor>();

export function SerializableMessage() {
    return function(constructor: MessageConstructor) {
        const name = MessageUtilities.createMessageName(constructor.name)

        if (MessageRegistryStorage.has(name)) {
            throw new Error(`${name} "${name}" is already registered.`);
        }

        MessageRegistryStorage.set(name, constructor);

        console.log(`Registered message "${name}"`);
    };
}
