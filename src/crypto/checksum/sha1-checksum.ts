import {createHash} from "node:crypto";
import {DigestCalculator} from "../digest-calculator";


export class Sha1Checksum extends DigestCalculator {
  checksum(buffer: Buffer): string {
    return createHash("sha1").update(buffer).digest("hex");
  }
}
