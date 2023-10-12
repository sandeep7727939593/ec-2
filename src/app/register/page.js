"use client";

import InputComponent from "@/components/FormElements/InputElement/page";
import SelectComponent from "@/components/FormElements/SelectComponent/page";
import { registerNewUser } from "@/services/register";
import { registerFormControl } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";

const initFormData = {
    name : '',
    email : '',
    password : '',
    role : 'customer',
};

export default function Register() {
    const { conponentLevelLoader, setConponentLevelLoader, isAuthUser} = useContext(GlobalContext)
    const router = useRouter()
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState(initFormData);

    function isValidate() {
        return formData && formData.name && formData.name.trim() !== '' && formData.email && formData.email.trim() !== ''&& formData.password && formData.password.trim() !== '' ? true : false;
    }

    async function handleSubmit () {
        setConponentLevelLoader({loading : true, id : ''});
        const data = await registerNewUser(formData);
        if (data.success) {
            toast.success(data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setIsRegistered(true);
            setConponentLevelLoader({loading : false, id : ''});

            setFormData(initFormData);
        } else {
            toast.error(data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setConponentLevelLoader({loading : false, id : ''});

            setFormData(initFormData);
        }
    console.log(data)

    }

    useEffect(() => {
        if (isAuthUser) router.push("/");
      }, [isAuthUser]);

    return <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                    <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                        <p className="w-full text-4xl font-medium text-center font-serif">
                            {isRegistered
                                ? "Registration Successfull !"
                                : "Sign up for an account"}
                        </p>
                        {isRegistered ? <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide" onClick={() => router.push('/login')}>Login</button> :
                        (<div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                            {registerFormControl.map((controlItem) =>
                                controlItem.componentType === "input" ? (
                                    <InputComponent
                                        key={controlItem.id}
                                        type={controlItem.type}
                                        placeholder={controlItem.placeholder}
                                        label={controlItem.label}
                                        onChange={(event) => {
                                            setFormData({
                                                ...formData,
                                                [controlItem.id] : event.target.value
                                            })
                                        }}
                                        value={formData[controlItem.id]}
                                    />
                                ) : controlItem.componentType === "select" ? (
                                    <SelectComponent
                                        key={controlItem.id}
                                        options={controlItem.options}
                                        label={controlItem.label}
                                        onChange={(event) => {
                                            setFormData({
                                                ...formData,
                                                [controlItem.id] : event.target.value
                                            })
                                        }}
                                        value={formData[controlItem.id]}
                                    />
                                ) : null
                            )}
                            <button
                                className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                            text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                            "
                            disabled={!isValidate()}
                            onClick={handleSubmit}
                            >
                                {
                                    conponentLevelLoader.loading ? <ComponentLevelLoader  text={"Registering"} color={"#ffffff"} loading={conponentLevelLoader.loading}/> : 'Register'
                                }
                                
                            </button>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
        <Notification />
    </div>
}