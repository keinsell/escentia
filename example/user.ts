import { Model, ModelProperties } from "src/model"

interface UserProperties extends ModelProperties<string> {
  email: string
}

export class UserModel extends Model<string> implements UserProperties {
  public email: string

  constructor(properties: UserProperties) {
    super(properties)
    this.email = properties.email
  }
}

console.log(new UserModel({ id: "1", email: "asdf" }))
