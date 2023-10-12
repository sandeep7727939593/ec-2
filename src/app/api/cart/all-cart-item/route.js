import connectToDB from "@/database"
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req); 

        if(isAuthUser) {
            const {searchParams} = new URL(req.url);
            const userId = searchParams.get('userId');

            if(!userId) {
                return NextResponse.json({
                    success : false,
                    message : 'Please Login'
                })
            }

            const allCart = await Cart.find({userId : userId}).populate('userId').populate('productId');

            if(allCart) {
                return NextResponse.json({
                    success : true,
                    data : allCart
                })

            } else {
                return NextResponse.json({
                    success : false,
                    message : 'No Cart Found'
                })
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