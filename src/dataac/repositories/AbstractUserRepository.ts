import { UserEntity } from "../entity/UserEntity";

export abstract class AbstractUserRepository{
    abstract create(user: UserEntity): Promise<boolean>;
}