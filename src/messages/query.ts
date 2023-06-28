import { Serializable } from "src/__metadata/serializable-property"
import { DigestCalculator } from "src/checksum/digest-calculator"
import { DigestAlogorithm } from "../checksum"
import { Message, MessagePayload, MessageType } from "./message"

export type QueryPayload<T> = MessagePayload<T>

export abstract class Query<REQUEST, RESPONSE> extends Message<REQUEST> {
	public readonly _response: RESPONSE = null as unknown as RESPONSE
	public readonly _request: REQUEST = null as unknown as REQUEST

	private readonly digestCalculator: DigestCalculator = DigestAlogorithm.MD5

	constructor(readonly properties: QueryPayload<REQUEST>) {
		super(properties, MessageType.REQUEST)
	}

	@Serializable()
	get checksum(): string {
		const compositeKey = `${this._name}|${JSON.stringify(this._request)}`
		return this.digestCalculator.checksum(Buffer.from(compositeKey))
	}
}
