import {createHash} from "node:crypto";
import {DigestCalculator} from "../digest-calculator";


export class Sha512Checksum extends DigestCalculator {
  checksum(buffer: Buffer): string {
    return createHash("sha512").update(buffer).digest("hex");
  }
}
