import { NextFunction, Request, Response } from "express";
import {ZodError} from 'zod'
import httpStatus from "http-status"
import { errorSource_Type } from "../global/Interfaces";
import Final_App_Error from "./Final_Error";
import mongoose, { get } from "mongoose";


export const global_Error_handler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let errorTitle = "There is a server side error !";
    let errorSource: errorSource_Type = [{
        path: "",
        message: ''
    }]

    const zodErrorFormatter = (err:ZodError)=>{
        const errorTitle = "Validation Error - Zod";
        const errorSource:errorSource_Type=err.issues.map(one=>({
            path:one.path[one.path.length-1],
            message:one.message
        }))
        return {errorSource,errorTitle};
    }
    const castErrorHandler = (err:mongoose.Error.CastError)=>{
        const ErrorTitle = "Reference not found error *";
        const errorSource:errorSource_Type = [{
            path:err.path,
            message:err.message
        }]
        return {ErrorTitle,errorSource}
    }

    if(err.name==='ZodError'){
        const gettedFormat = zodErrorFormatter(err);
        errorTitle = gettedFormat.errorTitle;
        errorSource = gettedFormat.errorSource;
    }else if(err.name === 'CastError'){
        const gettedFormat = castErrorHandler(err);
        errorTitle = gettedFormat.ErrorTitle;
        errorSource = gettedFormat.errorSource;
    }else if(err instanceof Error){
        errorTitle = err.message;
        errorSource=[{
            path:'',
            message:err.message
        }]
    }else if(err instanceof Final_App_Error){
        errorTitle = err.message;
        errorSource=[{
            path:'',
            message:err.message
        }]
    }






    res.status(statusCode).json({
        success: false,
        errorTitle,
        errorSource,
        stack:err.stack,
        err
    })
}