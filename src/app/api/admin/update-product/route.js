import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";



export async function PUT(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser?.role === 'admin') {
            const extractData = await req.json();
            const {name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl, _id} = extractData;

            const updateedProduct = await Product.findOneAndUpdate({_id : _id}, {name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl}, {new : true});

            if(updateedProduct) {
                return NextResponse.json({
                    success: true,
                    message: 'Product Updated'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Product Not Updated'
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