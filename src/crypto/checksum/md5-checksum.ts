import {createHash} from "node:crypto";
import {DigestCalculator} from "../digest-calculator";


export class Md5Checksum extends DigestCalculator {
  checksum(buffer: Buffer): string {
    return createHash("md5").update(buffer).digest("hex");
  }
}
