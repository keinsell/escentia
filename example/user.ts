import { Model, ModelProperties } from "src/data-modeling/model"
import { AggregateRoot } from "../src/domain-modeling/aggregate-root";
import { Entity } from "../src/domain-modeling/entity";
import { DomainEvent } from "src/domain-modeling/domain-event";

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

const userModel = new UserModel({ id: "1", email: "asdf" })
console.log(userModel)

export class UserAccount extends Entity<string> {
  public email: string

  constructor(properties: UserProperties) {
    super(properties.id)
    this.email = properties.email
  }

  public changeEmail(email: string) {
    this.email = email
    this.incrementVersion()
  }
}

const userEntity = new UserAccount({ id: userModel.id, email: userModel.email })

console.log(userEntity)


export class EmailChanged extends DomainEvent<User> { }

export class User extends AggregateRoot<UserAccount> {
  constructor(root: UserAccount) {
    super(root)
  }

  public changeEmail(email: string) {
    this.root.changeEmail(email)
    this.incrementVersion()
    this.addEvent(new EmailChanged({ aggregate: this }))
    return this
  }
}



const userAggregate = new User(userEntity)
console.log(userAggregate)
console.log(userAggregate.changeEmail("keinell@protonmail.com"))
console.log(userAggregate.events)
