import { auth_Router } from "../modules/auth/auth.router";
import { User_Routes } from "../modules/user/user.router";
import express from 'express';
const router = express.Router();


const projectRoutes = [
    {
        path:'/user',
        route:User_Routes
    },
    {
        path:'/auth',
        route:auth_Router
    },
]

projectRoutes.forEach(one=>router.use(one.path,one.route));

export default router;

