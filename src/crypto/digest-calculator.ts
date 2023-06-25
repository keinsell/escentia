export abstract class DigestCalculator {
  abstract checksum(buffer: Buffer): string

  static {
    // This is a static initializer block
    // It is executed once when the class is loaded
    console.log("DigestCalculator loaded")
    console.log(this.constructor.name)
  }
}
