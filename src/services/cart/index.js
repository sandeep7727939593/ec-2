import Cookies from "js-cookie"

export const addToCart = async(formData) => {
    try {
        const response = await fetch('/api/cart/add-to-cart', {
            method : "POST",
            headers : {
                "content-type" : "application/json",
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData)
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

export const getAllCart = async(userId) => {
    try {
        const response = await fetch(`/api/cart/all-cart-item?userId=${userId}`, {
            method : "GET",
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}


export const deleteFromCart = async(id) => {
    try {
        const response = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}