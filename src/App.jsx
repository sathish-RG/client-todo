import { useEffect } from "react"; // ✅ Import useEffect
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setUser } from "@/redux/features/auth/userSlice";

import Navbar from "./pages/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const dispatch = useDispatch(); // ✅ Moved above useEffect

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser))); // ✅ No error now
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "",
          element: <Login />,
        },
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
