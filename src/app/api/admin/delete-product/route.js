import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export async function DELETE(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser?.role === 'admin') {
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id');
            if(!id) {
                return NextResponse.json({
                    success: false,
                    message: 'Product Id Not Found'
                })
            }
            const deletedProduct = await Product.findByIdAndDelete(id);

            if(deletedProduct) {
                return NextResponse.json({
                    success: true,
                    message: 'Product Deleted'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Product Not Delete'
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'You Are Not Auth User'
            })
        }

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        })
    }
}