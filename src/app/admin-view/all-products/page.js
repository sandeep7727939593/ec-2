
import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";


export default async function AdminViewAllProducts(){

    const allAdminProducts = await getAllAdminProducts();

    return <CommonListing data={allAdminProducts && allAdminProducts.data ? allAdminProducts.data : []}/>
}