

export const registerNewUser = async (formData) => {
    try {
        const response = await fetch("api/register", {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body:JSON.stringify(formData)
        });
        return await response.json();
    } catch (error) {
        console.log("Error", error)
    }
}