import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";


export default async function MenAllProduct () {

    const getAllProduct = await productByCategory('men');

    return <CommonListing data={getAllProduct && getAllProduct.data ? getAllProduct.data : []}/>
}