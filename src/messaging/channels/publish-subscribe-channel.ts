import {Message} from "src/messages/message";
import {Channel} from "src/messaging/channel";
import {ChannelType} from "src/messaging/channels/channel-type";

export class PublishSubscribeChannel<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.PUBLISH_SUBSCRIBE
}
