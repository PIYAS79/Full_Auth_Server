import { z } from "zod";




export const Zod_Login_Type = z.object({
    body:z.object({
        email:z.string().email(),
        password:z.string()
    })
})

export const Zod_Password_Change_Type = z.object({
    body:z.object({
        oldPassword:z.string(),
        newPassword:z.string()
    })
})

export const Zod_Cookie_Type = z.object({
    cookie:z.object({
        refreshToken : z.string({
            required_error:"refresh token is required for create a new access token *"
        })
    })
})