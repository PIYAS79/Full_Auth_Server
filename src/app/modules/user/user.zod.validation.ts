import { z } from 'zod'



export const Zod_User_Type = z.object({
    body: z.object({
        email: z.string().email(),
        role: z.enum(['Admin','User']),
        password: z.string(),
    })
})

