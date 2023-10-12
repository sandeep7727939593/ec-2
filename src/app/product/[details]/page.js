import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";


export default async function ProductDetails ({params}) {

    const producDetails = await productById(params.details);

    console.log('producDetails', producDetails)
    return <div>
        <CommonDetails item={producDetails && producDetails.data ? producDetails.data[0] : []}/>
    </div>
}