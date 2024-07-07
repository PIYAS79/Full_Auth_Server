import { Schema, model } from "mongoose";
import { User_Type } from "./user.interface";


const User_Schema = new Schema<User_Type>({
    email: {
        type: String,
        unique:true,
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



export const User_Model = model<User_Type>('User',User_Schema);
