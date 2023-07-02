import {Message} from "src/messages/message";
import {ClassSerializationRegistry} from "./serialization-class-registry";


export abstract class Deserializer<T = unknown> {
  abstract deserialize<P>(data: T): P;
}

export class JsonDeserializer extends Deserializer<string> {
  deserialize<P>(message: string): Message<P> {
    const jsonObject = JSON.parse(message);
    const messageType = jsonObject._name;
    const messageConstructor = ClassSerializationRegistry.get(messageType);

    if (!messageConstructor) {
      throw new Error(`Unknown message type: ${messageType}`);
    }

    // Assuming your message classes can be constructed from the deserialized JSON
    return new messageConstructor(jsonObject) as Message<P>;
  }
}
