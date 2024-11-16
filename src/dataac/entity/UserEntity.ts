import { TaskEntity } from "./TaskEntity";

export class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    tasks: TaskEntity[];

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.tasks = [];
    }

    get _id(): number{
        return this.id;
    }

    get _name(): string{
        return this.name;
    }

    get _email(): string{
        return this.email;
    }

    get _password(): string{
        return this.password;
    }

    get _tasks(): TaskEntity[]{
        return this.tasks;
    }

    set _id(id: number){
        this.id = id;
    }

    set _name(name: string){
        this.name = name;
    }

    set _email(email: string){
        this.email = email;
    }

    set _password(password: string){
        this.password = password;
    }

    set _tasks(tasks: TaskEntity[]){
        this.tasks = tasks;
    }
}