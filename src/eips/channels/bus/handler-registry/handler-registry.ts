import { Class, Constructor } from "type-fest"
import { Handler } from "../../../../infrastructure/handler"
import { Message } from "../../../messages/message"

interface HandlerRegistryEntry {
	message: Constructor<Message>
	handler: Class<Handler>[]
}
