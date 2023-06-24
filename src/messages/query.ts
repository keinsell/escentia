import { Message } from "./message";

export abstract class Query<REQUEST, RESPONSE> extends Message<REQUEST> {
  public readonly _response: RESPONSE = null as unknown as RESPONSE;
}
