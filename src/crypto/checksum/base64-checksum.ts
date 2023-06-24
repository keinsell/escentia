import { DigestCalculator } from "../digest-calculator";

export class Base64Checksum extends DigestCalculator {
  checksum(buffer: Buffer): string {
    return buffer.toString("base64");
  }
}
