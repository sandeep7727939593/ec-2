'use client'

import ComponentLevelLoader from "@/components/Loader";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react";
import { toast } from "react-toastify";


export default function ProductButton({ item }) {

    const pathName = usePathname();
    const router = useRouter();
    const { conponentLevelLoader, setConponentLevelLoader, setCurrentUpdatedProduct, user, setShowCartModel } = useContext(GlobalContext);

    const isAdminView = pathName.includes('admin-view');

    async function handleDeleteProduct() {
        const res = await deleteProduct(item._id);
        setConponentLevelLoader({ loading: true, id: item._id });
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            setConponentLevelLoader({ loading: false, id: '' });
            router.refresh();
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            setConponentLevelLoader({ loading: false, id: '' });
        }
    }

    const handleAddToCart = async(item) => {
        const res = await addToCart({productId : item._id, userId : user._id});

        setConponentLevelLoader({ loading: true, id: item._id });
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            setConponentLevelLoader({ loading: false, id: '' });
            setShowCartModel(true)
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            setConponentLevelLoader({ loading: false, id: '' });
            setShowCartModel(true)
        }
    }

    return isAdminView ? <>
        <button
            onClick={() => {
                setCurrentUpdatedProduct(item);
                router.push('/admin-view/add-product');
            }}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        >
            Update
        </button>
        <button
            onClick={handleDeleteProduct}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        >
            {conponentLevelLoader.loading && item._id == conponentLevelLoader.id ? (<ComponentLevelLoader
                text={"Delete"}
                color={"#ffffff"}
                loading={conponentLevelLoader.loading}
            />) : "Delete"}
        </button>
    </> : <>
        <button
        onClick={() => handleAddToCart(item)}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        >
            {conponentLevelLoader.loading && item._id == conponentLevelLoader.id ? (<ComponentLevelLoader
                text={"Add To Cart"}
                color={"#ffffff"}
                loading={conponentLevelLoader.loading}
            />) : "Add To Cart"}
        </button>
    </>
}