import express from 'express'
import validation_Request from '../../middlewares/validation.request';
import { Zod_Login_Type } from './auth.zod.validation';
import { Auth_Controller } from './auth.controller';



const router = express.Router();

// login router 
router.post('/login',validation_Request(Zod_Login_Type),Auth_Controller.Login_Auth_Controller);


export const auth_Router = router;