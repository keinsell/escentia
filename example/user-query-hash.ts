import {Query} from "src/eips/messages/query"
import {JsonSerializer} from "../src/eips/transformation/serializer/json-serializer/json-serializer";
import {SerializableMessage} from "../src/eips/transformation/serializer/registry/serialization-class-registry";

@SerializableMessage()
export class GetUserQuery extends Query<{ id: string }, { id: string }> {
}

console.log(GetUserQuery)
console.log(new GetUserQuery({ id: "123" }).checksum)
console.log(new GetUserQuery({ id: "124" }).checksum)


console.log(new JsonSerializer().serialize(new GetUserQuery({ id: "123" })))
