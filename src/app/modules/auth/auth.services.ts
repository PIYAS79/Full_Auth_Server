import httpStatus from "http-status";
import Final_App_Error from "../../errors/Final_Error";
import { User_Model } from "../user/user.model"
import { Decode_Password_By_Bcrypt, Encode_Password_By_Bcrypt } from "../../utils/bcrypt.operation";
import { Decode_JWT_Token, Encode_JWT_Token } from "../../utils/jwt.operations";
import config from "../../config";
import { Change_Pass_Type, Login_Type, Reset_Pass_Type } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import { SendEmail } from "../../utils/nodeMailer";


// login user service
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
// change password service
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
// get access token by the refresh token service
const Refresh_Token_Auth_Service = async (refToken: string) => {
    // decode token
    const decodedData = Decode_JWT_Token(refToken) as JwtPayload;
    // check if the user exist or not
    const user = await User_Model.findOne({ email: decodedData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // check if the role is match or not 
    if (user?.role !== decodedData.role) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Your role is not match, contact with us");
    }
    // if all ok then give them a accesstoken 
    const accToken = Encode_JWT_Token({
        email: decodedData.email,
        role: decodedData.role
    }, (config.acc_token_exp as string));
    return { accToken };
}
// forget password service
const Forget_Pass_Auth_Service = async (email: string) => {
    // check if the user is exist or not by the email
    const user = await User_Model.findOne({ email: email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found *");
    }
    // check if the user is block or not 
    if (user.isBlock) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is blocked *");
    }
    // if all ok then send the short time token for reset the password 
    const shortToken = Encode_JWT_Token({
        email: user.email,
        role: user.role
    }, '5m')
    // send this token to user email
    const html = `${config.client_url}?email=${user.email}&token=${shortToken}`;
    SendEmail(user.email, html, "FULL_AUTH Reset Password Link");

    return { shortToken }
}
// reset password service 
const Reset_Pass_Auth_Service = async (gettedData: Reset_Pass_Type, shortToken: string) => {
    // check if the user is exist or not by gettedData email
    const user = await User_Model.findOne({ email: gettedData.email });
    if (!user) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User not found !");
    }
    // decode token
    const decodedData = Decode_JWT_Token(shortToken) as JwtPayload;
    // check the doceded token email with gettedData email matched or not
    if (decodedData.email !== user.email) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Unauthorized Access Found *");
    }
    // hash password 
    const hashedNewPass = await Encode_Password_By_Bcrypt(gettedData.newPassword);
    // if match then reset password
    const result = await User_Model.findByIdAndUpdate({ _id: user._id }, {
        password: hashedNewPass,
        passwordUpdatedAt: new Date
    }, { new: true })

    return result
}


export const Auth_Services = {
    Login_Auth_Service,
    Change_Password_Auth_Service,
    Refresh_Token_Auth_Service,
    Forget_Pass_Auth_Service,
    Reset_Pass_Auth_Service
}

