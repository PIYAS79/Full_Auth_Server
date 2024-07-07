import { z } from 'zod'

const Zod_Name_Type = z.object({
    f_name : z.string(),
    m_name:z.string().optional(),
    l_name:z.string()
})

export const Zod_Create_User_Type = z.object({
    body: z.object({
        email: z.string().email(),
        role: z.enum(['Admin', 'User']),
        password: z.string(),
        name: Zod_Name_Type,
        address: z.string(),
        age: z.number(),
        phone: z.string()
    })
})

