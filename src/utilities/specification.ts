/**
 * A specification that determines whether an object of type T satisfies a certain condition.
 *
 * @template T - The type of object to be checked.
 */
export abstract class Specification<T = unknown> {

  /**
   * Determines whether the given object satisfies the condition specified by this specification.
   *
   * @param i - The object to be checked.
   * @returns {boolean} - True if the object satisfies the condition, false otherwise.
   */
  abstract satisfy(i: T): boolean;
}
