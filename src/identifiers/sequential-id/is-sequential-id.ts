import {Specification} from "src/utilities/specification";


export class IsSequentialID
  extends Specification<number> {
  public satisfy(i: number): boolean {
    return i >= 0
  }
}
