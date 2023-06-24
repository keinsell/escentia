import { crc32 } from "@node-rs/crc32";
import { DigestCalculator } from "../digest-calculator";

export class Crc32Checksum extends DigestCalculator {
  checksum(buffer: Buffer): string {
    return crc32(buffer).toString(32);
  }
}
