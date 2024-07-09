import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_Error";
import { User_Model } from "../user/user.model"
import { Decode_Password_By_Bcrypt, Encode_Password_By_Bcrypt } from "../../utils/bcrypt.operation";
import { Encode_JWT_Token } from "../../utils/jwt.operations";
import config from "../../config";
import { Change_Pass_Type, Login_Type } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";



const Login_Auth_Service = async (gettedData: Login_Type) => {

    // check if the user is exist or not 
    const user = await User_Model.findOne({ email: gettedData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Email not found * *");
    }
    // if exist then check the active status
    if (user.isBlock) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "User is block *");
    }
    // check the password and email
    const ifPassMatch = await Decode_Password_By_Bcrypt(gettedData.password, user.password);
    if (!ifPassMatch) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Password not match *");
    }
    // token 
    const AccessToken = Encode_JWT_Token({
        email: user.email,
        role: user.role
    }, (config.acc_token_exp as string))
    const RefreshToken = Encode_JWT_Token({
        email: user.email,
        role: user.role
    }, (config.ref_token_exp as string))
    // return 
    return { user, AccessToken, RefreshToken }
}

const Change_Password_Auth_Service = async (gettedData: Change_Pass_Type, decodedTokenData: JwtPayload) => {
    // find user by token email
    const user = await User_Model.findOne({ email: decodedTokenData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User is not found *");
    }
    // check if the password is match or not
    if (!await Decode_Password_By_Bcrypt(gettedData.oldPassword, user.password)) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Password not matched *");
    }
    // hashed password
    const newHashedPassowrd = await Encode_Password_By_Bcrypt(gettedData.newPassword);
    // if password match then update it to user doc 
    const result = await User_Model.findByIdAndUpdate({ _id: user._id }, {
        password: newHashedPassowrd,
        passwordUpdatedAt: new Date()
    }, { new: true });
    return result;
}




export const Auth_Services = {
    Login_Auth_Service,
    Change_Password_Auth_Service
}