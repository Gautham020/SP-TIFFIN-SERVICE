import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);

  // Toggle cart visibility
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  // Calculate total and subtotal whenever cartItems changes
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const totalPrice = cartItems.reduce((accumulator, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.qty) || 1; // Default qty is 1
        return accumulator + itemQty * itemPrice;
      }, 0);
      setTot(totalPrice);
    }
  }, [cartItems]);

  // Clear all items from the cart
  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  // Generate the WhatsApp message
  // Generate the WhatsApp message
  const generateWhatsAppMessage = () => {
    const userDetails = user
      ? `User: ${user.displayName || "Unknown"}, ${user.email || "No Email"}`
      : "User: Anonymous";

    const cartDetails = cartItems
      .map((item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.qty) || 1; // Default qty is 1
        const totalItemPrice = (itemPrice * itemQty).toFixed(2);
        return `Item: ${
          item.title || "No Title"
        }, Quantity: ${itemQty}, Price: ₹${totalItemPrice}`;
      })
      .join("\n");

    const message = `*Order Details:*\n\n${cartDetails}\n\n*Total Price:* ₹${(
      tot + 100
    ).toFixed(2)}\n\n${userDetails}`;

    // Use the WhatsApp URL scheme to open the app directly
    return `whatsapp://send?phone=7760723182&text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* Bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* Cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Cart Item */}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setFlag={setTot} // Update the flag to recalculate total
                flag={tot} // Pass current total as flag
              />
            ))}
          </div>

          {/* Cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">
                ₹ {Number(tot).toFixed(2)}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">₹ 100</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ₹ {(Number(tot) + 100).toFixed(2)}
              </p>
            </div>
            {user ? (
              <>
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-green-400 to-green-600 text-gray-50 text-lg my-2 hover:shadow-lg text-center"
                >
                  Send Cart to Admin
                </a>
              </>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="Empty Cart" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
