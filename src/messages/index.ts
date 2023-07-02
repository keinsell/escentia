import {SerializableMessage} from "../infrastructure/serializer/serialization-class-registry"
import {Command, CommandPayload} from "./command"
import {Document, DocumentPayload} from "./document"
import {Event, EventPayload} from "./event"
import {Priority} from "./properties/priority"
import {Query, QueryPayload} from "./query"
import {Reply, ReplyPayload} from "./reply"
import {Request, RequestPayload} from "./request"

export {
	Command,
	Event,
	Request,
	Reply,
	Document,
	Query,
	Priority,
	SerializableMessage,
}
export type {
	CommandPayload,
	DocumentPayload,
	EventPayload,
	QueryPayload,
	ReplyPayload,
	RequestPayload,
}
