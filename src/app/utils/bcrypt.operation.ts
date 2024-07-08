
import bcrypt from 'bcrypt';
import config from '../config';


export const Encode_Password_By_Bcrypt=async(solidData:string)=>{
    const encoded = await bcrypt.hash(solidData,Number(config.salt_round));
    return encoded;
}

export const Decode_Password_By_Bcrypt =async (plainPassword:string,hashPassword:string) => {
    return await bcrypt.compare(plainPassword,hashPassword);
}