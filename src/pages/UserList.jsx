import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Navbar from "../components/common/NavBar";
import ConfirmationModal from "../components/common/ConfirmationModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", avatar: "" });
  const [confirmationModal , setConfirmationModal]= useState(null);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    //   console.log(response)
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email, avatar: user.avatar });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    // setIsDeleteModalOpen(true);
    setConfirmationModal({
        text1:"Delete",
        text2:"Are you sure to delete this user",
        btn1text:"Delete",
        btn2text:"Cancel",
        btn1Handler:()=>{
            handleDeleteConfirm()     
        },
        btn2Handler: ()=> setConfirmationModal(null)
    })
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // toast.success(`${e.target.name} change sucsessfully`)
  };

  const handleEditSave = async () => {

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Please Enter Valid Email");
        return;
    }

    if(!formData.first_name || !formData.last_name || !formData.email){
        toast.error("Please fill all credentials")
        return;
    }
    const toastId = toast.loading("Loading...")
      
    try {
      await axios.put(`https://reqres.in/api/users/${selectedUser.id}`, formData);
      setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...formData } : user));
      setIsEditModalOpen(false);
      toast.success("Credentials Update Sucessfully")
      
    } catch (err) {
      console.error("Failed to update user", err);
      toast.error("Failed to update user")
    }

    toast.dismiss(toastId)
  };

  const handleDeleteConfirm = async () => {
    const toastId = toast.loading("Loading...")
    try {
      await axios.delete(`https://reqres.in/api/users/${selectedUser.id}`);
      setUsers(users.filter(user => user.id !== selectedUser.id));
    //   setIsDeleteModalOpen(false);
      setConfirmationModal(null)
      toast.success("User Deleted Sucessfully")

    } catch (err) {
      console.error("Failed to delete user", err);
    }
    toast.dismiss(toastId)
  };

  return (
    <>
    <Navbar/>
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white text-center">User List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-slate-400 shadow-md rounded">
            <img className="w-16 h-16 rounded-full mx-auto" src={user.avatar} alt={user.first_name} />
            <p className="text-center mt-2 font-semibold">{user.first_name} {user.last_name}</p>
            <p className="text-center text-sm text-gray-500">{user.email}</p>
            <div className="flex justify-center mt-2">
              <button className="mr-2 px-3 py-1 bg-yellow-400 text-white rounded flex items-center gap-1" onClick={() => openEditModal(user)}>Edit <CiEdit /> </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1" onClick={() => openDeleteModal(user)}>Delete <MdDeleteForever /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button className={`mr-2 px-4 py-2   rounded ${page==1? 'bg-gray-400':'bg-gray-300'}`} onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <button className={`px-4 py-2 rounded ${page==totalPages ? 'bg-gray-400':'bg-gray-300'}`} onClick={() => setPage(page + 1)}  disabled={page === totalPages}>Next</button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-300 p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <label className="block">First Name:</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleEditChange} className="w-full p-2 border rounded mb-2 outline-none" />
            <label className="block">Last Name:</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleEditChange} className="w-full p-2 border rounded mb-2 outline-none" />
            <label className="block">Email:</label>
            <input  type="email" name="email" value={formData.email} onChange={handleEditChange} className="w-full p-2 border rounded mb-2 outline-none" />
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleEditSave}>Save </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal}/>
      )}

    </div>
    </>
  );
};

export default UserList;
