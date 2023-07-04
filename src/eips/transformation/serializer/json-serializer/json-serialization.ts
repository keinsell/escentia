import {Serialization} from "../serialization";
import {JsonDeserializer} from "./json-deserializer";
import {JsonSerializer} from "./json-serializer";

export class JsonSerialization extends Serialization<Uint8Array[]> {
    constructor() {
        super(
            new JsonSerializer(),
            new JsonDeserializer(),
        );
    }
}
