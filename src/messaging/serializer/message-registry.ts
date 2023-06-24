import "reflect-metadata";
import { Message, MessagePayload } from "src/messages/message";

export type MessageConstructor<T> = new (properties: MessagePayload<T>) => Message<unknown>;

export const MessageRegistry = new Map<string | symbol, MessageConstructor<unknown>>();

export function RegisterMessage(message: string) {
  return function(constructor: MessageConstructor<unknown>) {
    if (MessageRegistry.has(message)) {
      throw new Error(`Message "${message}" is already registered.`);
    }

    MessageRegistry.set(message, constructor);
  };
}
