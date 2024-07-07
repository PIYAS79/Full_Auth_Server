


export type User_Type = {
    email: string,
    isBlock: boolean,
    role: 'User' | 'Admin',
    password : string,
    passwordUpdatedAt?:Date,
    isEmailVarified?:boolean,
}



