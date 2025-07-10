import { clearUser, selectUser } from "@/redux/features/auth/userSlice";
import authServices from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await authServices.logout();
      if (response.status == 200) {
        console.log("Logout successfully");
        localStorage.removeItem("user");
        dispatch(clearUser());

        navigate("/");
      }
    } catch (err) {
      console.log("logout error:", err.message);
    }
  };

  return (
    <div>
      <div className=" bg-amber-400 p-2 flex flex-row justify-between">
        <p className=" font-bold text-white text-4xl">TODO's</p>
        {!user ? (
          <div className=" flex gap-5">
            <Link
              to="/"
              className="text-2xl font-bold hover:bg-amber-200 rounded-2xl text-white p-2 hover:cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-2xl font-bold hover:bg-amber-200 rounded-2xl text-white p-2 hover:cursor-pointer"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <Link
              to="/home"
              className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-lg font-medium transition-colors"
            >
              {user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default Navbar;
