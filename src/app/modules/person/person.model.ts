import { Schema, model } from "mongoose";
import { Person_Type } from "./person.interface";

const User_Name_Schema = {
    f_name: {
        type: String,
        required: [true, "First name is required *"]
    },
    m_name: {
        type: String,
    },
    l_name: {
        type: String,
        required: [true, "Last name is required *"]
    },
}

const Person_Schema = new Schema<Person_Type>({
    address: {
        type: String,
        required: [true, "Address is required *"]
    },
    age: {
        type: Number,
        required: [true, "Age is required *"]
    },
    email: {
        type: String,
        unique:true,
        required: [true, "Email is required *"]
    },
    name: User_Name_Schema,
    phone: {
        type: String,
        required: [true, "Phone number is important *"]
    },
    user: Schema.Types.ObjectId
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true,
})


export const Person_Model = model<Person_Type>("Person", Person_Schema);
