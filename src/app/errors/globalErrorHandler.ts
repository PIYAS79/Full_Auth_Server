import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"


export const global_Error_handler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    if(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"There is a server side error 💥"
        })
    }
}