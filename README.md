# escentia


Escentia is willing to be easy-to-use interface for complicated topics and architectural patterns such as CQRS, Event Sourcing, Sagas, etc.

## Expected Functionalities

```ts
// Constructing Messages
@RegisterMessage()
export class UserCreated extends Event {
    constructor(public readonly id: string, public readonly name: string) {
        super();
    }
}
```

```ts
@HandleMessage(UserCreated)
export class UserCreatedHandler {
    // ...
    handle(message: UserCreated) {
        // ...
    }
}
```

```ts


// Sagas
export class UserSignupSaga extends Saga {
    
    @BeginSaga(UserCreated)
    
}
```
