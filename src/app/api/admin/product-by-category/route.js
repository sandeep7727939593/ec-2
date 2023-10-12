import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectToDB();

        const {searchParams} = new URL(req.url);
        const category = searchParams.get('category');
        const getData = await Product.find({category : category});

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