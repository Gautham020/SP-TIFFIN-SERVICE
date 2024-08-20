import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [items, setItems] = useState([]);
  const [loadingImages, setLoadingImages] = useState({}); // Track loading state for each image

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  const handleImageLoad = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                {loadingImages[item?.id] && (
                  <div className="w-full h-full flex items-center justify-center">
                    {/* Add a loading spinner or placeholder here */}
                    <div className="w-12 h-12 border-4 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={item?.imageURL}
                  alt={item?.title || "Product"}
                  className={`w-full h-full object-contain ${
                    loadingImages[item?.id] ? "hidden" : "block"
                  }`}
                  onLoad={() => handleImageLoad(item?.id)}
                  onError={() => handleImageError(item?.id)}
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>

              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">₹</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="relative flex w-64 animate-pulse gap-2 p-4">
          <div className="h-12 w-12 rounded-full bg-slate-400"></div>
          <div className="flex-1">
            <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
            <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
          </div>
          <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
