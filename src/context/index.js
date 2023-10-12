
'use client'
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [showModelNav, setShowNavModal] = useState(false);
    const [conponentLevelLoader, setConponentLevelLoader] = useState({loading : false, id : ''});
    const [isAuthUser, setAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
    const [showCartModel, setShowCartModel] = useState(null);

    useEffect(function () {
        if(Cookies.get('token') !== undefined) {
            setAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {}
            setUser(userData);
        } else{
            setAuthUser(false);
        }
    }, [Cookies])

    return <GlobalContext.Provider 
            value={{ 
                showModelNav, 
                setShowNavModal, 
                conponentLevelLoader, 
                setConponentLevelLoader,
                isAuthUser, 
                setAuthUser, 
                user, 
                setUser,
                pageLevelLoader,
                setPageLevelLoader,
                currentUpdatedProduct,
                setCurrentUpdatedProduct,
                showCartModel, setShowCartModel
            }}
            >
                {children}
    </GlobalContext.Provider>
}