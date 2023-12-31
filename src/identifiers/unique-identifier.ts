import { CUID } from "./cuid/cuid"
import { SequentialId } from "./sequential-id/sequential-id"

export type UniqueIdentifier = string | number | bigint | SequentialId | CUID
