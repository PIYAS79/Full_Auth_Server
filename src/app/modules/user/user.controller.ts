import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../middlewares/try.code";
import httpStatus from "http-status";
import { User_Services } from "./user.services";



const User_Register_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body;

    const {person,accessToken,refreshToken} = await User_Services.User_Register_Service(gettedData); 

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:true
    }).status(httpStatus.OK).json({
        success:true,
        message: "Successfully Registerd !",
        data : {person,accessToken}
    })
})


export const User_Controllers = {
    User_Register_Controller,
}