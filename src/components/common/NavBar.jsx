import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [confirmationModal , setConfirmationModal]= useState(null);
  const dispatch = useDispatch()

  const handleLogout = () => {

    setConfirmationModal({
        text1:"LogOut",
        text2:"Are you sure to logout your account",
        btn1text:"LogOut",
        btn2text:"Cancel",
        btn1Handler:()=>{
            dispatch(logout())
            navigate('/login')
            toast.success("Logged Out")
        },
        btn2Handler: ()=> setConfirmationModal(null)
    })
 
  };

  return (
    <div className="bg-slate-700 p-4 flex justify-between items-center">
   
      <span className="text-white font-bold text-lg">Welcome to MyApp</span>

 
      <button 
        className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        LogOut
      </button>

      {
        confirmationModal && (
            <ConfirmationModal modalData={confirmationModal}/>
        )
      }
    </div>
  );
};

export default Navbar;
