'use client'

import { navAdminOptions, navOptions, styles } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModel from "../CommonModel";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModel from "../CartModel";


function NavItems({ isModalView = false , isAdminView}) {
    const router = useRouter();
    return <div className={`item-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">
        <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModalView ? "border-none" : "border border-gray-100"}`}>
            {
                isAdminView ? navAdminOptions.map(item => <li onClick={() => router.push(item.path)} className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0" key={item.id}>
                    {item.label}
                </li>) : navOptions.map(item => <li onClick={() => router.push(item.path)}  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0" key={item.id}>
                    {item.label}
                </li>)
            }
        </ul>

    </div>
}

export default function NavBar() {
    const { showModelNav, setShowNavModal, user, isAuthUser, setAuthUser, setUser,currentUpdatedProduct, setCurrentUpdatedProduct, showCartModel } = useContext(GlobalContext);
    const pathName = usePathname();
    const isAdminView = pathName.includes('admin-view');
    const router = useRouter();

    useEffect(() => {
        if(pathName !== '/admin-view/add-product' && currentUpdatedProduct !== null) {
            setCurrentUpdatedProduct(null);
        }
    }, [pathName]) 

    const handleLogout = () => {
        setAuthUser(false);
        setUser(null);
        Cookies.remove('token');
        localStorage.clear();
        router.push('/');
    }
    
    return <>
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div onClick={() => router.push('/')} className="flex item-center cursor-pointer">
                    <span className="slef-center text-2xl font-semibold whitespace-nowrap">
                        NextJs Learning
                    </span>
                </div>
                <div className="flex md:order-2 gap-2">
                    {
                        isAdminView && isAuthUser ? <Fragment>
                            <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white" >Account</button>
                            <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">Cart</button>
                        </Fragment> : null
                    }
                    {
                        user?.role == 'admin' ?
                            (!isAdminView ? (<button onClick={() => router.push('/admin-view')} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white">Admin View</button>) : (<button onClick={() => router.push('/')} className={styles.button}>Client View</button>))
                            : null
                    }
                    {
                        isAuthUser ? <button onClick={handleLogout} className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium upprcase tracking-wide text-white" >Logout</button> : <button onClick={() => router.push('/login') } className={styles.button} >Login</button>
                    }
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                        onClick={() => setShowNavModal(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <NavItems isAdminView={isAdminView} />
            </div>
        </nav>
        <CommonModel
            mainContent={<NavItems isModalView={true} isAdminView={isAdminView} />}
            showModalTitle={false}
            show={showModelNav}
            setShow={setShowNavModal}
        />
        {
            showCartModel && <CartModel />
        }
    </>
}