import {Deserializer} from "../deserializer";
import {ClassSerializationRegistry} from "../registry/serialization-class-registry";

export class JsonDeserializer extends Deserializer<Uint8Array[]> {
    deserialize<P = unknown>(message: Uint8Array[]): P {
        const messageString = message.map((chunk) => new TextDecoder().decode(chunk)).join("");
        const jsonObject = JSON.parse(messageString);
        const messageType = jsonObject._name;
        const messageConstructor = ClassSerializationRegistry.get(messageType);

        if (!messageConstructor) {
            throw new Error(`Unknown message type: ${messageType}`);
        }

        // Assuming your message classes can be constructed from the deserialized JSON
        return new messageConstructor(jsonObject) as P;
    }
}
