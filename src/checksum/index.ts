import { DigestAlgorithm as _DigestAlgorithm } from "./digest-algorithm"
import { DigestCalculator } from "./digest-calculator"
import { Crc32Checksum } from "./implementations/crc32-checksum"
import { Md5Checksum } from "./implementations/md5-checksum"

const DigestAlogorithm: {
	[key in _DigestAlgorithm]: DigestCalculator
} = {
	[_DigestAlgorithm.MD5]: new Md5Checksum(),
	[_DigestAlgorithm.CRC32]: new Crc32Checksum(),
}

export { DigestCalculator, DigestAlogorithm }
