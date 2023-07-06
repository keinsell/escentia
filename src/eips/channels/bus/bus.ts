import {Handler} from "../../../infrastructure/handler";
import {Reply, Request} from "../../messages";
import {Message, MessageUtilities} from "../../messages/message";

export abstract class Bus {
    abstract publish(message: Message): Promise<void>;
    abstract send(message: Message): Promise<void>;
    abstract subscribe(message: Message, handler: Handler): Promise<void>;
    abstract unsubscribe(message: Message, handler: Handler): Promise<void>;
    abstract request?(message: Request): Promise<void>;
    abstract waitForReply?(message: Request): Promise<void>;
    abstract receiveReply?(message: Request): Promise<Reply>;
}

export class InMemoryMessageBus {
    private readonly bindingStorage : Map<string, Handler<any>>

    constructor() {
        this.bindingStorage = new Map<string, Handler<any>>()
    }

    public async handle<T extends Message>(message : T) : Promise<unknown> {
        const eventType = MessageUtilities.createMessageName(message.constructor.name)
        const handler = this.bindingStorage.get( eventType )

        if(!handler) {
            throw new Error( `No handler for ${ eventType }` )
        }

        return await handler.handle( message )
    }

    public register<T extends Message>(messageConsructor : { new(...args : any[]) : T },
                                              handler : Handler<T>,
    ) : Promise<void> | void {
        const eventType = MessageUtilities.createMessageName(messageConsructor.constructor.name)

        if(this.bindingStorage.has( eventType )) {
            throw new Error( `Query handler for ${ eventType } already registered` )
        }

        this.bindingStorage.set( eventType, handler )
    }
}
