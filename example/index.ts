import { UserRegistration } from "./user/usecases/user-registration/user-registration";

// Register User
const userRegistrationResult = await new UserRegistration().execute({ email: "keinsell@protonmail.com" })
const userId = userRegistrationResult.map((user) => user.id).expect("User registration failed")
console.log(`User registration successful: ${userId}`)

// Change Email
