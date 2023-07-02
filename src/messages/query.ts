import {Serializable} from "src/__metadata/serializable-property"
import {DigestCalculator} from "src/checksum/digest-calculator"
import {EmptyObject, Jsonifiable} from "type-fest";
import {DigestAlogorithm} from "../checksum"
import {Message, MessagePayload, MessageType} from "./message"

export type QueryPayload<T extends Jsonifiable = EmptyObject> = MessagePayload<T>

export abstract class Query<REQUEST extends Jsonifiable = EmptyObject, RESPONSE extends Jsonifiable = EmptyObject> extends Message<REQUEST> {
	public readonly _response: RESPONSE = null as unknown as RESPONSE
	public readonly _request: REQUEST = null as unknown as REQUEST

	private readonly digestCalculator: DigestCalculator = DigestAlogorithm.MD5

	constructor(readonly properties: QueryPayload<REQUEST>) {
		super(properties, MessageType.REQUEST)
	}

	@Serializable()
	get checksum(): string {
		const compositeKey = `${this.name}|${JSON.stringify(this._request)}`
		return this.digestCalculator.checksum(Buffer.from(compositeKey))
	}
}
