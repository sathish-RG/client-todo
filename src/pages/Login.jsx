import { selectEmail, selectPassword, setEmail, setPassword } from "@/redux/features/auth/registerSlice";
import { setUser } from "@/redux/features/auth/userSlice";
import authServices from "@/services/authService";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"; // Add this import

const Login = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const [error, setError] = useState(""); // Add error state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    try {
      const response = await authServices.login({ email, password });
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(setUser(response.data.user));
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error('Login Error:', err.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="border-2 rounded-2xl border-gray-600 w-[350px] h-[400px] flex justify-center items-center flex-col gap-5" onSubmit={handleLogin}>
        <h3 className="font-bold text-2xl">Login to your account</h3>
        <p>or <Link to='/register' className="text-blue-600">Create a new account</Link></p>
        
        {/* Display error message if exists */}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        
        <input
          className="h-8 w-[250px] p-5 border-gray-400 border-2 rounded-2xl"
          type="email"
          placeholder="Enter Your Email"
          id="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          className="h-8 w-[250px] p-5 border-gray-400 border-2 rounded-2xl"
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button
          type="submit"
          className="text-2xl font-bold hover:bg-amber-200 rounded text-white p-1 hover:cursor-pointer bg-amber-400"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;