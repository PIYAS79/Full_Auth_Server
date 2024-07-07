import { z } from "zod";




export const Zod_Login_Type = z.object({
    body:z.object({
        email:z.string().email(),
        password:z.string()
    })
})