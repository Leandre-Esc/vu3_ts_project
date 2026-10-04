import type {CreateUserForm, User} from "@/features/users/types/user.types.ts";
import {http} from "@/shared/api/http.ts";

export async function getUsers(): Promise<User[]> {
    const {data} = await http.get<User[]>("/api/users")
    return data
}

export async function createUser(payload: CreateUserForm): Promise<User> {
    const {data} = await http.post<User>("/api/users", payload)
    return data
}
