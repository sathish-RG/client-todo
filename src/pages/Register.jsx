import { selectEmail, selectName, selectPassword, setEmail, setName, setPassword } from "@/redux/features/auth/registerSlice"
import authServices from "@/services/authService";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


const Register = () => {
  const name=useSelector(selectName);
  const email=useSelector(selectEmail);
  const password=useSelector(selectPassword);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleRegister=async(e)=>{
    e.preventDefault()
    try{
     const response =await authServices.register({name,email,password})

     if (response.status===201){
      console.log("register successfully")
     }
     //clear the form
     dispatch(setName(''))
     dispatch(setEmail(''))
     dispatch(setPassword(''))

     setTimeout(()=>{
      navigate("/login")
     },500)
    }catch(err){
      const message = err.response?.data?.message || err.message || "Something went wrong"
      console.log(`Registration error: ${message}`)
    }
  }


  return (
    <div className=" flex justify-center items-center h-screen">
    <form className=" border-2 rounded-2xl border-gray-600 w-[350px] h-[400px] flex justify-center items-center flex-col gap-5" onSubmit={handleRegister}>
     <h3 className=" font-bold text-2xl">Create Your Account</h3>
     <p>Already have an account ? <Link to='/' className=" text-blue-600">Login Here</Link></p>
    <input className=" h-8 w-[250px] p-5 border-gray-400 border-2 rounded-2xl" type="text" placeholder="Name" value={name} id="name" name="name" autoComplete="name" required onChange={(e)=>dispatch(setName(e.target.value))}/>
    <input className=" h-8 w-[250px] p-5  border-gray-400 border-2 rounded-2xl" type="email" placeholder="Enter Your Email" value={email} id="email" name="email" autoComplete="email" required onChange={(e)=>dispatch(setEmail(e.target.value))} />
    <input className=" h-8 w-[250px] p-5  border-gray-400 border-2 rounded-2xl" type="password" placeholder="Password" value={password} id="password" name="password" required onChange={(e)=>dispatch(setPassword(e.target.value))} />
    <button type="submit" className="text-2xl font-bold hover:bg-amber-200 rounded text-white p-1 hover:cursor-pointer bg-amber-400">Register</button>
    </form>
    </div>
  )
}

export default Register