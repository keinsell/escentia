import {crc32} from "@node-rs/crc32";
import {CRC32} from "../checksum";
import {DigestCalculator} from "../digest-calculator";

export class Crc32Checksum extends DigestCalculator {
  checksum(buffer: Buffer): CRC32 {
    return crc32(buffer).toString(32) as CRC32
  }
}
