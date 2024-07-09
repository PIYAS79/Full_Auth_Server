import { NextFunction, Request, Response } from "express";
import Async_Catch from "./try.code";
import Final_App_Error from "../errors/Final_Error";
import httpStatus from "http-status";
import { Decode_JWT_Token } from "../utils/jwt.operations";
import { JwtPayload } from "jsonwebtoken";
import { User_Model } from "../modules/user/user.model";

type Roles = "Admin" | "User"

const verify_Token = (...Role: Roles[]) => {
    return Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // check if the token is exist
        if (!token) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Token not provided *");
        }
        // decode token 
        let decodedData;
        try {
            decodedData = Decode_JWT_Token(token);
        } catch (err) {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "Token is not valid - Decoding Problem *");
        }
        const { email, role, iat, exp } = decodedData as JwtPayload;
        // check if the token user is really exist or not 
        const user = await User_Model.findOne({ email: email });
        if (!user) {
            throw new Final_App_Error(httpStatus.FORBIDDEN, "Token is not valid - email not match*");
        }
        // ifthe user is block
        if (user.isBlock) {
            throw new Final_App_Error(httpStatus.UNAUTHORIZED, "User is blocked !");
        }
        // check is token is expired or not
        if(user.passwordUpdatedAt && User_Model.isTokenExpired(user.passwordUpdatedAt,Number(iat))){
            throw new Final_App_Error(httpStatus.FORBIDDEN,"Token is expire due to password change *");
        }
        // check the role by token role and user role - if and only if the role provided from the router
        if(Role && !Role.includes(role) && !Role.includes(user.role)){
            throw new Final_App_Error(httpStatus.UNAUTHORIZED,"Unauthorized Access Found - Role not match *");
        }

        // if all ok => set req.user
        req.user = decodedData as JwtPayload;
        // if all ok ! then pass 
        next();

    })
}

export default verify_Token;