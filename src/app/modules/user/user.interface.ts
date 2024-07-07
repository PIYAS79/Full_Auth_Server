import { Name_Type } from "../person/person.interface"



export type User_Type = {
    email: string,
    isBlock: boolean,
    role: 'User' | 'Admin',
    password : string,
    passwordUpdatedAt?:Date,
    isEmailVarified?:boolean,
}

export type Create_User_Type = {
    email: string,
    role: 'User' | 'Admin',
    password : string,
    name:Name_Type,
    address:string,
    age:number,
    phone:string
}


