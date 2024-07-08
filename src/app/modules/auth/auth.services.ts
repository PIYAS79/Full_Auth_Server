import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_Error";
import { User_Model } from "../user/user.model"
import { Decode_Password_By_Bcrypt } from "../../utils/bcrypt.operation";
import { Encode_JWT_Token } from "../../utils/jwt.operations";
import config from "../../config";



const Login_Auth_Service =async (gettedData:Login_Type) => {
    
    // check if the user is exist or not 
    const user = await User_Model.findOne({email:gettedData.email});
    if(!user){
        throw new Final_App_Error(httpStatus.FORBIDDEN,"Email not found * *");
    }
    // if exist then check the active status
    if(user.isBlock){
        throw new Final_App_Error(httpStatus.FORBIDDEN,"User is block *");
    }
    // check the password and email
    const ifPassMatch = await Decode_Password_By_Bcrypt(gettedData.password,user.password);
    if(!ifPassMatch){
        throw new Final_App_Error(httpStatus.FORBIDDEN,"Password not match *");
    }
    // token 
    const AccessToken = Encode_JWT_Token({
        email:user.email,
        role:user.role
    },(config.acc_token_exp as string))
    const RefreshToken = Encode_JWT_Token({
        email:user.email,
        role:user.role
    },(config.ref_token_exp as string))
    // return 
    return {user,AccessToken,RefreshToken}
}





export const Auth_Services = {
    Login_Auth_Service,
}