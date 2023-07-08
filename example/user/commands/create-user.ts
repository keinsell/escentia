import { Command } from "src/eips/messages";
import { Handler } from "src/infrastructure/handler";
import { UserRepository } from "../user-repository";
import { User } from "../user";
import { sequentialId } from "src/identifiers";

export class CreateUser extends Command<{ email: string }> { }

export class CreateUserHandler extends Handler<CreateUser, { id: number }> {
  public async handle(message: CreateUser): Promise<{ id: number }> {
    const user = new User({ email: message.body.email, id: sequentialId() })
    const saved = await new UserRepository().save(user)
    return { id: saved.id }
  }
}
