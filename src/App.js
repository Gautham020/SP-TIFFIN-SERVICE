import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import Loader from "./components/Loader";
import ErrorPage from "./components/ErrorPage"; // Import an ErrorPage component if you create one
import NotFound from "./components/404";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add state for errors

  const fetchData = async () => {
    try {
      const data = await getAllFoodItems();
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage message={error} /> // Display an error page or message
      ) : (
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Header />
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/createItem" element={<CreateContainer />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;
