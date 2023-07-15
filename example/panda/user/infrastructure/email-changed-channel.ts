import {InMemoryPointToPointChannel} from "../../../src/eips/channels/point-to-point/point-to-point-channel";
import {EventEmitterBroker} from "../../../src/eips/routing/broker/event-emitter-broker";
import {EmailChanged} from "../../user-message-serialization";

export class EmailChangedChannel extends InMemoryPointToPointChannel<EmailChanged> {
    constructor() {
        super(new EventEmitterBroker())
    }
}
