import { NextFunction, Request, Response } from "express";
import Async_Catch from "../../middlewares/try.code";
import { Auth_Services } from "./auth.services";
import httpStatus from "http-status";



const Login_Auth_Controller = Async_Catch(async(req:Request,res:Response,next:NextFunction)=>{
    const gettedData = req.body;
    const result = await Auth_Services.Login_Auth_Service(gettedData);

    res.status(httpStatus.OK).json({
        success:true,
        message:"Successfully Login User",
        data:result
    })
})




export const Auth_Controller = {
    Login_Auth_Controller,
}