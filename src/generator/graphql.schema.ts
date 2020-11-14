
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AccountInput {
    userName: string;
    password: string;
    userProfile: UserInput;
}

export class AccountSearchInput {
    _id?: string;
    userId?: string;
    userName?: string;
    createdAt?: number;
    updatedAt?: number;
}

export class LoginInput {
    userName: string;
    password: string;
}

export class ChangePasswordInput {
    _id: string;
    password: string;
}

export class UserInput {
    firstName: string;
    lastName: string;
}

export class UserSearchInput {
    _id?: string;
    firstName?: string;
    lastName?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    isVerified?: boolean;
    isOnline?: boolean;
    isLocked?: boolean;
    reason?: string;
    isActive?: boolean;
    stripeId?: string;
    ccLast4?: string;
    createdAt?: number;
    updatedAt?: number;
}

export class UserUpdateInput {
    _id?: string;
    firstName?: string;
    lastName?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    isVerified?: boolean;
    isOnline?: boolean;
    isLocked?: boolean;
    reason?: string;
    isActive?: boolean;
    stripeId?: string;
    ccLast4?: string;
}

export class Account {
    _id: string;
    userId: string;
    userName: string;
    password: string;
    createdAt?: number;
    updatedAt?: number;
}

export class AccountResponse {
    _id?: string;
    userId?: string;
    userName?: string;
    createdAt?: number;
    updatedAt?: number;
}

export class UserProfileResponseLogin {
    _id?: string;
    firstName?: string;
    lastName?: string;
}

export class AuthPayload {
    access_token: string;
    userProfile: UserProfileResponseLogin;
}

export abstract class IQuery {
    abstract accounts(payload?: AccountSearchInput): AccountResponse[] | Promise<AccountResponse[]>;

    abstract account(_id?: string): AccountResponse | Promise<AccountResponse>;

    abstract users(): User[] | Promise<User[]>;

    abstract searchUser(payload?: UserSearchInput): User[] | Promise<User[]>;

    abstract user(_id?: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract register(input: AccountInput): AuthPayload | Promise<AuthPayload>;

    abstract changePassword(payload: ChangePasswordInput): boolean | Promise<boolean>;

    abstract login(payload?: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract addNewUser(input: UserInput): User | Promise<User>;

    abstract updateUser(_id: string, payload: UserUpdateInput): boolean | Promise<boolean>;
}

export class User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    isVerified?: boolean;
    isOnline?: boolean;
    isLocked?: boolean;
    reason?: string;
    isActive?: boolean;
    stripeId?: string;
    ccLast4?: string;
    createdAt?: number;
    updatedAt?: number;
}
