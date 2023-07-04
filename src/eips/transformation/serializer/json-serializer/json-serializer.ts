import {Message} from "../../../messages/message";
import {SerializablePropertyKey} from "../registry/serializable-property";
import {Serializer} from "../serializer";

export class JsonSerializer extends Serializer<Uint8Array[]> {
    serialize(message: Message): Uint8Array[] {
        const propertiesToSerialize = [...Reflect.getMetadata(SerializablePropertyKey, message) || [], "_type"];
        const visited = new WeakSet();

        // Fix for circular references
        const replacer = (_key: string, value: any) => {
            if (typeof value === 'object' && value !== null) {
                if (visited.has(value)) {
                    return;
                }
                visited.add(value);
            }
            return value;
        };

        const serializedObject = propertiesToSerialize.reduce((obj: Record<string, unknown>, propertyKey: any) => {
            if (typeof propertyKey === "string" && propertyKey in message) {
                return {
                    ...obj,
                    [propertyKey]: (message as any)[propertyKey]
                };
            }
            return obj;
        }, {});

        const serializedString = JSON.stringify(serializedObject, replacer);

        return [new TextEncoder().encode(serializedString)];
    }
}
