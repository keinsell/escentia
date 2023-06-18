import {Message} from "src/messages/message";
import {Channel} from "src/messaging/channel";
import {ChannelType} from "src/messaging/channels/channel-type";

export class Exchange<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.STREAM
}
