import {Channel} from "src/infrastructure/channel";
import {ChannelType} from "src/infrastructure/channels/channel-type";
import {Message} from "src/messages/message";

export class PublishSubscribeChannel<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.PUBLISH_SUBSCRIBE
}
