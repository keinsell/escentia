import {Serializable} from "src/__metadata/serializable-property"
import {DigestCalculator} from "src/checksum/digest-calculator"
import {DigestAlogorithm} from "../checksum";
import {Message, MessagePayload, MessageType} from "./message"

export type QueryPayload<T> = MessagePayload<T>

export abstract class Query<REQUEST, RESPONSE> extends Message<REQUEST> {
	@Serializable()
	public readonly _response: RESPONSE = null as unknown as RESPONSE
	@Serializable()
	public readonly _request: REQUEST = null as unknown as REQUEST
	@Serializable()
	override readonly _type = MessageType.QUERY
	private readonly digestCalculator: DigestCalculator = DigestAlogorithm.MD5

	constructor(readonly properties: QueryPayload<REQUEST>) {
		super(properties)
		this._request = properties
	}

	@Serializable()
	get checksum(): string {
		const compositeKey = `${this._name}|${JSON.stringify(this._request)}`
		const hash = this.digestCalculator.checksum(Buffer.from(compositeKey))
		return hash
	}
}
