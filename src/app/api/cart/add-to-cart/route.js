import connectToDB from "@/database"
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server"

const AddToCard = Joi.object({
    productId : Joi.string().required(),
    userId : Joi.string().required(),
})

export async function POST(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req); 

        if(isAuthUser) {
            const data = await req.json();
            const {productId, userId} = data;
            const {error} = AddToCard.validate({productId, userId});

            if(error) {
                return NextResponse.json({
                    success : false,
                    message : error.details[0].message
                })
            }

            const isAlreadyExists = await Cart.findOne({productId : productId, userId : userId});

            if(isAlreadyExists) {
                return NextResponse.json({
                    success : false,
                    message : 'Product Already Added'
                });
            }
            const saveData = await Cart.create({productId, userId});
            if(saveData) {
                return NextResponse.json({
                    success : true,
                    message : 'Add To Card! Saved'
                });
            } else {
                return NextResponse.json({
                    success : false,
                    message : 'Failed  toSaved'
                });
            }
        } else {
            return NextResponse.json({
                success : false,
                message : 'You Are not auth user'
            })
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success : false,
            message : 'Something went wrong'
        })
    }
}