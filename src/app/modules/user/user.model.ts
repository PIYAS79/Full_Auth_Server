import { Schema, model } from "mongoose";
import { User_Custom_Static_Method, User_Type } from "./user.interface";
import { Encode_Password_By_Bcrypt } from "../../utils/bcrypt.operation";


const User_Schema = new Schema<User_Type,User_Custom_Static_Method>({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is a required field"]
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    isEmailVarified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, "Password is a required field"]
    },
    passwordUpdatedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: {
            values: ['User', 'Admin'],
            message: '{VALUE} is not assignable to type "USER" & "ADMIN"'
        },
        required: [true, "Role is a required field"]
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
})



// encode the password by the bcrypt 
User_Schema.pre('save', async function (next) {
    const data = this;
    data.password = await Encode_Password_By_Bcrypt(this.password);
    next();
})

User_Schema.post('save', function (doc, next) {
    doc.password = '';
    next();
})

User_Schema.statics.isTokenExpired=function(pat:Date,iat:number){
    const toNumber = new Date(pat).getTime()/1000;
    return toNumber>iat;
}



export const User_Model = model<User_Type,User_Custom_Static_Method>('User', User_Schema);
