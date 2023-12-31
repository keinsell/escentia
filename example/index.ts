import { UserRegistration } from "./panda/user/usecases/user-registration/user-registration"
import { UserRepository } from "./panda/user/user-repository"

// Register User
const userRegistration = new UserRegistration()
userRegistration.$preExecute({
	email: "keinsell@protonmail.com",
})
const userRegistrationResult = await userRegistration.execute({
	email: "keinsell@protonmail.com",
})

userRegistration.$postExecute(userRegistrationResult)

const userId = userRegistrationResult
	.map((user) => user.id)
	.expect("User registration failed")

console.log(`User registration successful: ${userId}`)
console.log(await new UserRepository().all())

// Change Email
