import * as t from 'io-ts'
import { IsSequentialID } from './is-sequential-id'


const SequentialIdCodec = t.brand(
  t.number,
  (s: number): s is t.Branded<number, { readonly SequentialID: unique symbol }> => new IsSequentialID().satisfy(s),
  'SequentialID',
)

/**
 * Sequential ID is a unique identifier assigned to data records in a sequential order, typically incrementing by
 * one. It is commonly used in databases and systems where maintaining a consistent order of records is important. Sequential IDs are used to ensure data integrity, enable efficient indexing, and facilitate chronological sorting of records in applications such as transactional systems, logging systems, or content management systems.
 */
export type SequentialId = t.TypeOf<typeof SequentialIdCodec>

let lastId = 1

/**
 * Sequential ID is a unique identifier assigned to data records in a sequential order, typically incrementing by
 * one. It is commonly used in databases and systems where maintaining a consistent order of records is important. Sequential IDs are used to ensure data integrity, enable efficient indexing, and facilitate chronological sorting of records in applications such as transactional systems, logging systems, or content management systems.
 *
 * @param {string} id - The id to validate
 * @returns {SequentialId} - The validated id
 */
export function sequentialId(id?: number): SequentialId {
  const validationResult = SequentialIdCodec.decode(id || lastId++)
  if (validationResult._tag === 'Left') {
    // TODO: Throw library-wide exception
    throw new Error("Invalid sequential id")
  }
  else {
    return validationResult.right
  }
}
