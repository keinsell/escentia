import {createHash} from "node:crypto";
import {DigestCalculator} from "../digest-calculator";

export class Sha256Checksum extends DigestCalculator {
  checksum(buffer: Buffer): string {
    return createHash("sha256").update(buffer).digest("hex");
  }
}
