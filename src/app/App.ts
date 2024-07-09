import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import { notFound_Error_Route } from './errors/NotFoundErrorRoute';
import { global_Error_handler } from './errors/globalErrorHandler';
import router from './routes';
import cookieParser from 'cookie-parser';


const app = express();

// middlewares 
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// initial route
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.status(httpStatus.OK).json({
        success:true,
        message:"Server is running 🔥",
        data:{}
    })
})

// Primary Route
app.use('/api/v1',router);

// route not found - route
app.use("*",notFound_Error_Route)

// global error route
app.use(global_Error_handler)

export default app;
