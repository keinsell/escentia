import {Channel} from "src/infrastructure/channel";
import {ChannelType} from "src/infrastructure/channels/channel-type";
import {Message} from "src/messages/message";

export class Exchange<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.STREAM
}
