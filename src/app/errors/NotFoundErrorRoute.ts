import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"


export const notFound_Error_Route = (req:Request,res:Response,next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:"Route not found 😥",
        data:{}
    })
}