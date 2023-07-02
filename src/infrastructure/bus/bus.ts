import {Reply, Request} from "../../messages";
import {Message} from "../../messages/message";
import {Handler} from "../handler";

export abstract class Bus {
    abstract publish(message: Message): Promise<void>;
    abstract send(message: Message): Promise<void>;
    abstract subscribe(message: Message, handler: Handler): Promise<void>;
    abstract unsubscribe(message: Message, handler: Handler): Promise<void>;
    abstract request?(message: Request): Promise<void>;
    abstract waitForReply?(message: Request): Promise<void>;
    abstract receiveReply?(message: Request): Promise<Reply>;
}
