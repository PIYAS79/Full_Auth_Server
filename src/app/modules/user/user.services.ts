import config from "../../config";
import { Encode_JWT_Token } from "../../utils/jwt.operations";
import { Person_Type } from "../person/person.interface";
import { Person_Model } from "../person/person.model";
import { Create_User_Type, User_Type } from "./user.interface";
import { User_Model } from "./user.model";




const User_Register_Service = async (gettedData: Create_User_Type) => {

    const newUser: User_Type = {
        email: gettedData.email,
        isBlock: false,
        password: gettedData.password,
        role: gettedData.role,
        isEmailVarified: false,
    }
    // create new user
    const user = await User_Model.create(newUser);
    const newPerson: Person_Type = {
        user: user._id,
        address: gettedData.address,
        age: gettedData.age,
        email: gettedData.email,
        name: gettedData.name,
        phone: gettedData.phone
    }
    // create new person
    const person = await Person_Model.create(newPerson);

    // jwt tokens - Access Token - 
    const accessToken = Encode_JWT_Token({
        email: gettedData.email,
        role: gettedData.role
    }, config.acc_token_exp as string);
    // jwt tokens 
    const refreshToken = Encode_JWT_Token({
        email: gettedData.email,
        role: gettedData.role
    }, config.ref_token_exp as string);

    return {person,accessToken,refreshToken};
}





export const User_Services = {
    User_Register_Service,
}