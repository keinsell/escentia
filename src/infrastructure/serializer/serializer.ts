import {Message} from "src/messages/message";
import {SerializablePropertyKey} from "./serializable-property";

export abstract class Serializer<T = unknown> {
  abstract serialize(message: any): T;
}

export class JSONSerializer extends Serializer<string> {
  serialize(message: Message): string {
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
        return { ...obj, [propertyKey]: (message as any)[propertyKey] };
      }
      return obj;
    }, {});

    return JSON.stringify(serializedObject, replacer);
  }
}
