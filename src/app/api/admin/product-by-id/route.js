import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");
        if(!productId) {
            return NextResponse.json({
                success : false,
                message : "Product Id is required"
            })
        }

        const getData = await Product.find({_id : productId});

        if(getData) {
            return NextResponse.json({
                success : true,
                data : getData,
            })
        } else {
            return NextResponse.json({
                success : false,
                message : "No Product Found"
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Something went wrong"
        });
    }
}