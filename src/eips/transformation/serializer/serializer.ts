export abstract class Serializer<T = unknown> {
  abstract serialize(message: any): T;
}

