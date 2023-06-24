import { Query } from "src/messages/query"
import { RegisterMessage } from "src/messaging/serializer/message-registry"
import { JSONMessageSerializer } from "src/messaging/serializer/message-serializer"

@RegisterMessage("get-user-query")
export class GetUserQuery extends Query<{ id: string }, { id: string }> {
}

console.log(GetUserQuery)
console.log(new GetUserQuery({ id: "123" }).checksum)
console.log(new GetUserQuery({ id: "124" }).checksum)


console.log(new JSONMessageSerializer().serialize(new GetUserQuery({ id: "123" })))
