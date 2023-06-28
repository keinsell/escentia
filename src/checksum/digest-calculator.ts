import { Checksum } from "./checksum"

export abstract class DigestCalculator {
	abstract checksum(buffer: Buffer): Checksum

	// static {
	// 	// This is a static initializer block
	// 	// It is executed once when the class is loaded
	// 	console.log("DigestCalculator loaded")
	// 	console.log(this.constructor.name)
	// }
}
