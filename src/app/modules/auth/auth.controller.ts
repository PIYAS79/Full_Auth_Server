import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../middlewares/try.code";
import { Auth_Services } from "./auth.services";
import httpStatus from "http-status";



const Login_Auth_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body;
    const {user,AccessToken,RefreshToken} = await Auth_Services.Login_Auth_Service(gettedData);

    res.cookie('refreshToken',RefreshToken,{
        httpOnly:true,
        secure:true
    }).status(httpStatus.OK).json({
        success:true,
        message:"Successfully Login User !",
        data:{user,AccessToken}
    })
})
const Change_Password_Auth_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body;
    const decodedTokenData = req.user;
    const result = await Auth_Services.Change_Password_Auth_Service(gettedData,decodedTokenData);

    res.status(httpStatus.OK).json({
        success:true,
        message:"Successfully Change Password !",
        data:result
    })
})
const Refresh_Token_Auth_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.cookies.refreshToken;
    const result = await Auth_Services.Refresh_Token_Auth_Service(gettedData);

    res.status(httpStatus.OK).json({
        success:true,
        message:"Successfully Get New Access Token !",
        data:result
    })
})
const Forget_Pass_Auth_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body.email;
    const result = await Auth_Services.Forget_Pass_Auth_Service(gettedData);

    res.status(httpStatus.OK).json({
        success:true,
        message:"Successfully forget issued! Check your email for the reset link !",
        data:result
    })
})




export const Auth_Controller = {
    Login_Auth_Controller,
    Change_Password_Auth_Controller,
    Refresh_Token_Auth_Controller,
    Forget_Pass_Auth_Controller
}