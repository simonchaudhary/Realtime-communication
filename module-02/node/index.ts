import { add } from "./number";

type User = {
    name: string;
    age: number;
}

function createUser(user: User): User {
    return user;
}

console.log(createUser({ name: "John", age: 30 }));


enum Direction {
    Up,
    Down,
    Left,
    Right
}

const addValue = add(1,3)

console.log({addValue})
