import Cookies from "js-cookie";




export const addNewProduct = async (formData) => {
    try {
        const response = await fetch("/api/admin/add-product", {
            method : "POST",
            headers : {
                "content-type" : "application/json",
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formData)
        });
        return await response.json();
    } catch (error) {
        console.log("Error", error)
    }
}

export const getAllAdminProducts = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/admin/all-products", {
            method : "GET",
            cache : "no-store"
        })
        const result = await response.json();
        return result
        
    } catch (error) {
        console.log("Error", error)
    }
}

export const updateProduct = async (formData) => {
    try {
        const response = await fetch("/api/admin/update-product", {
            method : "PUT",
            headers : {
                "content-type" : "application/json",
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formData)
        });
        return await response.json();
        
    } catch (error) {
        console.log("Error", error)
    }
}


export const deleteProduct = async (id) => {
    try {

        const response = await fetch(`/api/admin/delete-product?id=${id}`, {
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        })
        return await response.json();
    } catch (error) {
        console.log("Error", error)
    }
}


export const productByCategory = async (category) => {
    try {

        const response = await fetch(`http://localhost:5000/api/admin/product-by-category?category=${category}`, {
            method : "GET",
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            cache : "no-store"
        })
        return await response.json();
    } catch (error) {
        console.log("Error", error)
    }
}

export const productById = async (id) => {
    try {

        const response = await fetch(`http://localhost:5000/api/admin/product-by-id?id=${id}`, {
            method : "GET",
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            cache : "no-store"
        })
        return await response.json();
    } catch (error) {
        console.log("Error", error)
    }
}

