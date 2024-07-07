import { User_Routes } from "../modules/user/user.router";
import express from 'express';
const router = express.Router();


const projectRoutes = [
    {
        path:'/register',
        route:User_Routes
    },
]

projectRoutes.forEach(one=>router.use(one.path,one.route));

export default router;

