import {createHash} from "node:crypto";
import {MD5} from "../checksum";
import {DigestCalculator} from "../digest-calculator";


export class Md5Checksum extends DigestCalculator {
  checksum(buffer: Buffer): MD5 {
    return createHash("md5").update(buffer).digest("hex") as MD5
  }
}
