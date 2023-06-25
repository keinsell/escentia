import { SerializableProperty } from "src/messaging/serializer/serializable-property"
import { Message, MessageType } from "./message"
import { DigestCalculator } from "src/crypto/digest-calculator"
import { Crc32Checksum } from "src/crypto/checksum/crc32-checksum"

export type QueryProperties<T> = {
	filters?: any
	sort?: any
	limit?: number
	skip?: number
} & T

export abstract class Query<REQUEST, RESPONSE> extends Message<REQUEST> {
	@SerializableProperty()
	public readonly _response: RESPONSE = null as unknown as RESPONSE
	@SerializableProperty()
	public readonly _request: REQUEST = null as unknown as REQUEST
	@SerializableProperty()
	override readonly _type = MessageType.QUERY
	private readonly digestCalculator: DigestCalculator = new Crc32Checksum()

	constructor(readonly properties: QueryProperties<REQUEST>) {
		super(properties)
		this._request = properties
	}

	@SerializableProperty()
	get checksum(): string {
		const compositeKey = `${this._name}|${JSON.stringify(this._request)}`
		const hash = this.digestCalculator.checksum(Buffer.from(compositeKey))
		return hash
	}
}
