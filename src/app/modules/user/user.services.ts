import { User_Type } from "./user.interface";




const User_Register_Service = async (gettedData: User_Type) => {

    const newUser: User_Type = {
        email: gettedData.email,
        isBlock: false,
        password: gettedData.password,
        role: gettedData.role,
        isEmailVarified: false,
    }

    return {}
}





export const User_Services = {
    User_Register_Service,
}