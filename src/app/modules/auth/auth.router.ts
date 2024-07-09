import express from 'express'
import validation_Request from '../../middlewares/validation.request';
import { Zod_Cookie_Type, Zod_Forget_Type, Zod_Login_Type, Zod_Password_Change_Type } from './auth.zod.validation';
import { Auth_Controller } from './auth.controller';
import verify_Token from '../../middlewares/token.validation';
import { Role_Types } from '../../global/User_Role_Types';



const router = express.Router();

// login router 
router.post('/login',validation_Request(Zod_Login_Type),Auth_Controller.Login_Auth_Controller);
// change password (% WITH TOKEN VELIDATION %)
router.post('/change',verify_Token(Role_Types.ADMIN,Role_Types.USER),validation_Request(Zod_Password_Change_Type),Auth_Controller.Change_Password_Auth_Controller);
// forget password
router.post('/forget',validation_Request(Zod_Forget_Type),Auth_Controller.Forget_Pass_Auth_Controller)
// reset password

// get Accesstoken by refresh token
router.get('/refresh',validation_Request(Zod_Cookie_Type),Auth_Controller.Refresh_Token_Auth_Controller);

export const auth_Router = router;