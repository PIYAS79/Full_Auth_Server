

export type Login_Type = {
    email:string,
    password:string
}


export type Change_Pass_Type = {
    oldPassword:string,
    newPassword:string
}


export type Reset_Pass_Type = {
    email: string,
    newPassword:string
}