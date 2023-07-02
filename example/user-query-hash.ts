import {JSONSerializer} from "src/infrastructure/serializer/serializer"
import {Query} from "src/messages/query"
import {SerializableMessage} from "../src/infrastructure/serializer/serialization-class-registry";

@SerializableMessage()
export class GetUserQuery extends Query<{ id: string }, { id: string }> {
}

console.log(GetUserQuery)
console.log(new GetUserQuery({ id: "123" }).checksum)
console.log(new GetUserQuery({ id: "124" }).checksum)


console.log(new JSONSerializer().serialize(new GetUserQuery({ id: "123" })))
