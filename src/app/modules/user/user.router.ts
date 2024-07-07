import express from 'express';
import { User_Controllers } from './user.controller';
import validation_Request from '../../middlewares/validation.request';
import { Zod_Create_User_Type } from './user.zod.validation';


const router = express.Router();


// Create Person / Registration route
router.post('/register', validation_Request(Zod_Create_User_Type), User_Controllers.User_Register_Controller);



export const User_Routes = router;