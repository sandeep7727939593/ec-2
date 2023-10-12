import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectToDB();

        const isAdmin = 'admin';

        if (isAdmin) {

            const extractAllProduct = await Product.find({});
            if (extractAllProduct) {
                return NextResponse.json({
                    success: true,
                    data: extractAllProduct
                });
            } else {
                return NextResponse.json({
                    success: false,
                    status: 204,
                    message: 'No Products Found'
                });
            }


        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not Authrizaed'
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong'
        })
    }

}