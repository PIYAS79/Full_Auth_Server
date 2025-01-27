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
    user: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
}, {
    toJSON: {
        virtuals: true
    },
    timestamps: true,
})


Person_Schema.virtual('full_name').get(function(){
    if(this?.name?.m_name){
        return `${this.name.f_name} ${this.name.m_name} ${this.name.l_name}`
    }else{
        return `${this.name.f_name} ${this.name.l_name}`
    }
})



export const Person_Model = model<Person_Type>("Person", Person_Schema);
