import connectToDB from "@/database"
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server"

const PruductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
})

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);
        if(isAuthUser?.role === 'admin') {
            console.log(isAuthUser)

            const extractData = await req.json();
            const { name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl } = extractData;
            const { error } = PruductSchema.validate({ name, description, price, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl });

            if (error) {
                console.log(error)
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            const productCreated = await Product.create(extractData);
            if (productCreated) {
                return NextResponse.json({
                    success: true,
                    message: 'Successfully created'
                })

            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to add product'
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'You Are Not Auth User'
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