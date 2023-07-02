import {Class, Constructor} from "type-fest";
import {Message} from "../../../messages/message";
import {Handler} from "../../handler";

interface HandlerRegistryEntry {
    message: Constructor<Message>
    handler: Class<Handler>[]
}


