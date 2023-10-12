
import { Fragment, useContext } from "react"
import CommonModel from "../CommonModel"
// import { getAllCart } from "@/services/cart";
import { GlobalContext } from "@/context";


export default function CartModel () {

    const {user, showCartModel, setShowCartModel} = useContext(GlobalContext);

    // const allCartData = await getAllCart(user._id);

    return (
        <CommonModel 
            showButtons={true}
            buttonComponent={
                <Fragment>
                    <button>
                        Go To Cart
                    </button>
                    <button>
                        Checkout 
                    </button>
                </Fragment>
            }
            show={showCartModel}
            setShow={setShowCartModel}
        />
    )
}