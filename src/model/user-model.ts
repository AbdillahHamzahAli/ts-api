import { User } from "@prisma/client"

export type UserResponse = {
    username : string,
    email?: string | null,
    name: string,
    token?: string
}

export type CreateUserRequest = {
    username : string,
    password : string,
    email?: string,
    name: string,
}
export type LoginUserRequest = {
    username : string,
    password : string,
}
export type UpdateUserRequest = {
    password? : string
    email?: string | null,
    name?: string,
}

export function toUserResponse(user: User) :UserResponse {
    return {
        name : user.name,
        username: user.username,
        email: user.email
    }
}
