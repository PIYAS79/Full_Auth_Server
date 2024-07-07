import jwt from 'jsonwebtoken'
import { User_Type } from '../modules/user/user.interface'
import config from '../config'


// getted data type 
type jwt_data_type = {
    email:string,
    role:"Admin"|"User"    
}

// encode jwt token 
export const Encode_JWT_Token =(data:jwt_data_type,exp:string)=>{
    const token = jwt.sign({
      email:data.email,
      role:data.role  
    },(config.jwt_secret as string),{expiresIn:exp})
    return token;
}

// decode jwt token 
export const Decode_JWT_Token=(token:string)=>{
    const decodedData = jwt.verify(token,(config.jwt_secret as string));
    return decodedData;
}
