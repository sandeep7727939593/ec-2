import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";


const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
})

export async function POST(req) {
    await connectToDB();
    const { name, email, password, role } = await req.json();
    const { error } = schema.validate({ name, email, password, role });
    if (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.details[0].message
        })
    }

    try {
        const isUserAlreadyExists = await User.findOne({email});
        if (isUserAlreadyExists) {
            return NextResponse.json({
                success: false,
                message: "User is already exists. Please try with different email."
            })
        } else {
            const hashPass = await hash(password, 12);
            const isNewUserCreated = await User.create({ name, email, password: hashPass, role });
            if (isNewUserCreated) {
                return NextResponse.json({
                    success: true,
                    message: "Account created successfully."
                })
            }
        }
    } catch (error) {
        console.log("Something went wrong ! Please try again later", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later"
        })
    }
}