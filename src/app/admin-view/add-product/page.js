"use client"

import InputComponent from "@/components/FormElements/InputElement/page"
import SelectComponent from "@/components/FormElements/SelectComponent/page"
import TileComponent from "@/components/FormElements/TileComponent/page"
import ComponentLevelLoader from "@/components/Loader"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { addNewProduct, updateProduct } from "@/services/product"
import { AvailableSizes, adminAddProductformControls, fireBaseStore, firebaseConfig } from "@/utils"

import { initializeApp } from "firebase/app";

import {getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, fireBaseStore);


function createUniqueFileName(getFile) {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);
    return  `${getFile.name}-${timeStamp}-${randomStringValue}`; 
}

async function helperForUploadingFileToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageRef = ref(storage, `ec-2/${getFileName}`);

    const uploadImage = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapshot) => {}, (error) => {
            console.log(error);
            reject(error);
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref).then(downloadUrl => resolve(downloadUrl)).catch((error) => {reject(error)})
        })

    })

}

const initialFormData = {
    name: "",
    price: 0,
    description: "",
    category: "men",
    sizes: [],
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
    priceDrop: 0,
  };
  

export default function AdminViewAddNewProduct() {

    const [formData, setFormData] = useState(initialFormData);

    const router = useRouter();
    const {conponentLevelLoader, setConponentLevelLoader,  currentUpdatedProduct, setCurrentUpdatedProduct} = useContext(GlobalContext);

    useEffect(() => {
        if(currentUpdatedProduct !== null) {
            setFormData(currentUpdatedProduct)
        }

    }, [currentUpdatedProduct]) 

    async function handleImage (event) {
        const extractImageUrl = await helperForUploadingFileToFirebase(event.target.files[0])
        if(extractImageUrl != '') {
            setFormData({
                ...formData,
                imageUrl : extractImageUrl
            })
        }
    } 


    function handleTile(getItem) {
        let copSizes = [...formData.sizes];
        const index  = copSizes.findIndex((item) => item.id === getItem.id);

        if(index === -1) {
            copSizes.push(getItem);
        } else {
            copSizes = copSizes.filter((item) => item.id !== getItem.id);
        }

        setFormData({
            ...formData,
            sizes : copSizes
        });
    }
    

    async function handleAddProduct() {
        setConponentLevelLoader({loading : true, id: ""});
        console.log(formData)
        const res = currentUpdatedProduct !== null ? await updateProduct(formData) :  await addNewProduct(formData);
        console.log(res)

        if(res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            setConponentLevelLoader({loading : false, id: ""});
            setFormData(initialFormData);
            setCurrentUpdatedProduct(null);
            setTimeout(() => {
                router.push('/admin-view/all-products');            
            }, 1000)
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            setConponentLevelLoader({loading : false, id: ""});
            setFormData(initialFormData);
        }
    }
    
    console.log('currentUpdatedProduct', currentUpdatedProduct)

    return <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
        <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
            <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                <input 
                    type = "file"
                    accept="image/*"
                    max="1000000"
                    onChange={handleImage}
                />
                <div className="flex gap-2 flex-col">
                    <label>Available Size</label>
                    <TileComponent selected={formData.sizes} data={AvailableSizes} onClick={handleTile}/>
                </div>
                {
                    adminAddProductformControls.map((controlItem) => 
                        controlItem.componentType === 'input' ? (
                            <InputComponent
                                label = {controlItem.label}
                                key={controlItem.id}
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                value={formData[controlItem.id]}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value,
                                    })
                                }}
                                />
                        ) : (
                            controlItem.componentType === 'select' ? (
                                <SelectComponent
                                    label = {controlItem.label}
                                    key={controlItem.id}
                                    type={controlItem.type}
                                    options={controlItem.options}
                                    value={formData[controlItem.id]}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            [controlItem.id]: event.target.value,
                                        })
                                    }}
                                />
                            ) : null
                        )
                    )
                }

                <button
                    onClick={handleAddProduct}
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                >
                    {conponentLevelLoader.loading ? (<ComponentLevelLoader 
                         text={(currentUpdatedProduct !== null ? "Update Product" : "Add Product")}
                         color={"#ffffff"}
                         loading={conponentLevelLoader.loading}
                    />) : (currentUpdatedProduct !== null ? "Update Product" : "Add Product")}
                </button>
            </div>
        </div>
        <Notification />
    </div>

}