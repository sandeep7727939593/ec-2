import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";


export default async function WomenAllProduct () {

    const getAllProduct = await productByCategory('women');
    return <CommonListing data={getAllProduct && getAllProduct.data ? getAllProduct.data : []}/>
}