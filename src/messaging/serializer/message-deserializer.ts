import { Message } from "src/messages/message";
import { MessageRegistry } from "./message-registry";
import { Command } from "src/messages/command";

export abstract class MessageDeserializer<T = unknown> {
  abstract deserialize<P>(message: T): Message<P>;
}


export class JsonMessageDeserializer extends MessageDeserializer<string> {
  deserialize<P>(message: string): Message<P> {
    const jsonObject = JSON.parse(message);
    const messageType = jsonObject._name;
    const messageConstructor = MessageRegistry.get(messageType);

    if (!messageConstructor) {
      throw new Error(`Unknown message type: ${messageType}`);
    }

    // Assuming your message classes can be constructed from the deserialized JSON
    return new messageConstructor(jsonObject) as Message<P>;
  }
}
