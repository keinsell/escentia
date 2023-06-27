import {Query} from "src/messages/query"
import {JSONMessageSerializer} from "src/messaging/serializer/message-serializer"
import {SerializableMessage} from "../src/__metadata/message-registry";

@SerializableMessage()
export class GetUserQuery extends Query<{ id: string }, { id: string }> {
}

console.log(GetUserQuery)
console.log(new GetUserQuery({ id: "123" }).checksum)
console.log(new GetUserQuery({ id: "124" }).checksum)


console.log(new JSONMessageSerializer().serialize(new GetUserQuery({ id: "123" })))
