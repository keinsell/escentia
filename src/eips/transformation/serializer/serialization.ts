import {EmptyObject} from "type-fest";
import {Deserializer} from "./deserializer";
import {Serializer} from "./serializer";

export class Serialization<SERIALIZED_FORMAT = Int8Array[], UNSERIALIZED_FORMAT = EmptyObject> {
    constructor(
        public readonly serializer: Serializer<SERIALIZED_FORMAT>,
        public readonly deserializer: Deserializer<SERIALIZED_FORMAT>
    ) {
    }

    public serialize(input: UNSERIALIZED_FORMAT): SERIALIZED_FORMAT {
        return this.serializer.serialize(input);
    }

    public deserialize(input: SERIALIZED_FORMAT): UNSERIALIZED_FORMAT {
        return this.deserializer.deserialize(input);
    }
}
