import {Channel} from "src/eips/channels/channel";
import {ChannelType} from "src/eips/channels/channel-type";
import {Message} from "src/eips/messages/message";

export class PublishSubscribeChannel<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.PUBLISH_SUBSCRIBE
}
