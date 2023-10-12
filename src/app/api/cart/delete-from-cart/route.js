import connectToDB from "@/database"
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server"

export async function DELETE(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req); 

        if(isAuthUser) {
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id');

            if(!id) {
                return NextResponse.json({
                    success : false,
                    message : 'Cart Id is required'
                })
            }

            const isDeleted = Cart.findByIdAndDelete(id);
            if(isDeleted) {
                return NextResponse.json({
                    success : true,
                    message : "Deleted"
                })

            } else {
                return NextResponse.json({
                    success : false,
                    message : 'No Deleted'
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