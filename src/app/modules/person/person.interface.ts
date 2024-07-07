import { Types } from "mongoose"

export type Name_Type = {
    f_name : string,
    m_name?:string,
    l_name:string
}

export type Person_Type = {
    user:Types.ObjectId,
    name:Name_Type,
    email:string,
    address:string,
    age:number,
    phone:string
}