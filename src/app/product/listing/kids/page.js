import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";


export default async function KidsAllProduct () {

    const getAllProduct = await productByCategory('kids');
    return <CommonListing data={getAllProduct && getAllProduct.data ? getAllProduct.data : []}/>
}