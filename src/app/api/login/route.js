
import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required()
})
export async function POST(req) {
    await connectToDB();
    const {email, password} = await req.json();
    const {error} = schema.validate({email, password});

    if(error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.details[0].message
        })
    }

    try {
        const checkUser = await User.findOne({email})
        if(!checkUser) {
            return NextResponse.json({
                success: false,
                message: "User Not Found With This email Id"
            })
        }
        const checkPassword = await compare(password, checkUser.password)
        if(!checkPassword) {
            return NextResponse.json({
                success: false,
                message: "User Password Not match. Please try again !"
            })
        }

        const token = jwt.sign({
            id:checkUser._id,
            email:checkUser.email,
            role : checkUser.role,
        }, "default_secret_key", {expiresIn: '1d'});

        const finalData = {
            token : token,
            user : {
                email:checkUser.email,
                role : checkUser.role,
                _id : checkUser._id,
                name : checkUser.name,
            }
        }

        return NextResponse.json({
            success: true,
            message: "Login successfully",
            finalData
        })
        
    } catch (error) {
        console.log("Something went wrong ! Please try again later", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later"
        })
    }
}