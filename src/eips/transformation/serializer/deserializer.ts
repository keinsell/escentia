export abstract class Deserializer<T = unknown> {
  abstract deserialize<P>(data: T): P;
}

