import {Channel} from "src/eips/channels/channel";
import {ChannelType} from "src/eips/channels/channel-type";
import {Message} from "src/eips/messages/message";

export class Exchange<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.STREAM
}
