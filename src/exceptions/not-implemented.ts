import { Exception } from "./exception";

export class NotImplemented extends Exception {
  constructor(message: any) {
    super({
      statusCode: 500,
      message: `Requested feature is not implemented: ${message}`
    })
  }
}
