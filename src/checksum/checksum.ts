import {Nominal} from "../utilities/nominal";

export type CRC32 = Nominal<string, "CRC32">
export type MD5 = Nominal<string, "MD5">

export type Checksum = CRC32 | MD5
