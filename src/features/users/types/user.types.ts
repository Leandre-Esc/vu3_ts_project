export interface CreateUserForm {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    // phoneNumber: number;
    password: string;
}

export interface User {
    Id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    // phoneNumber: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}