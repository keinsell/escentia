import {Model, ModelPayload} from "../../src/data-modeling/model";

interface UserModelProperties extends ModelPayload<string> {
    email: string
}

export class UserModel extends Model<string, {
    email: string
}> implements UserModelProperties {
    public email: string

    constructor(properties: ModelPayload<string, {
        email: string
    }>) {
        super(properties)
        this.email = properties.email
    }
}
