export abstract class DigestCalculator {
  abstract checksum(buffer: Buffer): string
}
