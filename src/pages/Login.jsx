import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setToken } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const[formData , setFormData] = useState({
    email:"",
    password:""
  })

  const changeHandlr = (e)=>{
    const {name , value} = e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if(formData.password !== "cityslicka"){
        toast.error("Incorrect Password")
        return;
    }

    if(formData.email !== "eve.holt@reqres.in"){
        toast.error("Invalid email")
        return;
    }
    const toastId = toast.loading("Loading...")
    try {
      const response = await axios.post("https://reqres.in/api/login",  formData );
      dispatch(setToken(response.data.token));
    //   console.log(response)
      navigate('/userlist')
      toast.success('Login Successfull')
      
    } catch (err) {
      setError("Invalid credentials");
    }
    toast.dismiss(toastId)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <input  className="w-full p-2 mb-2 border rounded" placeholder="Enter your email" type="email" name="email" value={formData.email} onChange={changeHandlr} required />
          <input className="w-full p-2 mb-2 border rounded" placeholder="Enter password" type="password" name="password" value={formData.password} onChange={changeHandlr} required />
          <button className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
