import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_Error";
import { User_Model } from "../user/user.model"



const Login_Auth_Service =async (gettedData:Login_Type) => {
    
    // check if the user is exist or not 
    const user = await User_Model.findOne({email:gettedData.email});
    if(!user){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"User not found *");
    }
    // if exist then check the active status
    if(user.isBlock){
        throw new Final_App_Error(httpStatus.FORBIDDEN,"User is block *");
    }
    // check the password and email

    // token 
    
    // return 

    return {}
}





export const Auth_Services = {
    Login_Auth_Service,
}