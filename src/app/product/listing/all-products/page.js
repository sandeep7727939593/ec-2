import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";


export default async function AllProduct () {

    const getAllProduct = await getAllAdminProducts();
    return <CommonListing data={getAllProduct && getAllProduct.data ? getAllProduct.data : []}/>
}