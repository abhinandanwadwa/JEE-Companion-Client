import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
    const [meh, setMeh] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    useEffect(() => {
      const getUserDetails = async () => {
        const token = localStorage.getItem('auth-token');
        await fetch('http://localhost:8181/api/auth/getMyDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        }).then((res) => res.json())
          .then((result) => {
            setMeh(result);
            setEmail(result.email);
            setFirstName(result.fname);
            setLastName(result.lname);
          })
      }
      getUserDetails();
    }, [])


    const changePassword = async () => {
        const token = localStorage.getItem('auth-token');
        await fetch('http://localhost:8181/api/auth/updatepassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },body: JSON.stringify({ oldpassword: oldPassword, newpassword: newPassword, confirmnewpassword: confirmNewPassword })
        }).then((response) => response.json())
          .then((result) => {
            if (result.success) {
                toast.success("Your Password has been updated successfully");
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                console.log(result)
            }
            else if (result.errors) {
                console.log(result);
                for (let error of result.errors) {
                    toast.error(error.msg);
                }
            }
            else if (result.error) {
                toast.error(result.error)
            }
            else {
                toast.error("Internal Server Error. Please Try Again Later")
            }
          })
    }


    const updateDetails = async () => {
        const token = localStorage.getItem('auth-token');
        await fetch('http://localhost:8181/api/auth/updatedetails', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },body: JSON.stringify({ fname: firstName, lname: lastName, email: email })
        }).then((response) => response.json())
          .then((result) => {
            if (result.success) {
                toast.success("Your Details has been updated successfully");
                console.log(result);
            }
            else if (result.errors) {
                console.log(result);
                for (let error of result.errors) {
                    toast.error(error.msg);
                }
            }
            else if (result.error) {
                toast.error(result.error)
            }
            else {
                toast.error("Internal Server Error. Please Try Again Later")
            }
          })
    }
    

  return (
    <>
    <Navbar />
    {meh && <div className="container flex flex-col m-auto w-[80%] h-[100%] bg-gray-800 text-white mt-8 rounded-3xl">
        <div className="top-section flex md:flex-row flex-col mx-8 my-4">
            <img className='object-cover rounded-3xl h-52 border-solid border-[#6e6e6e] border-[3px]' src={meh.imageURI} alt="" width={180} />
            <div className="user-info flex flex-col justify-end mt-4 md:mb-8 md:mx-5 text-gray-300">
                <p>{firstName + " " + lastName}</p>
                <p>{email}</p>
            </div>
        </div>
        <hr />
        <form onSubmit={(e) => e.preventDefault()} className="bottom-section flex flex-col my-4 mx-4">
            <div className="flex md:flex-row flex-col input-section">
                <p className='md:mx-3 mt-2'>First Name :</p>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className='bg-gray-500 w-[80%] rounded-xl p-2 border-none outline-none' />
            </div>
            <div className="flex md:flex-row flex-col input-section my-6">
                <p className='md:mx-3 mt-2'>Last Name :</p>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className='bg-gray-500 w-[80%] rounded-xl p-2 border-none outline-none' />
            </div>
            <div className="flex md:flex-row flex-col input-section">
                <p className='md:mx-3 mr-12 mt-2'>Email :</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='bg-gray-500 w-[80%] md:mx-9 rounded-xl p-2 border-none outline-none' />
            </div>
            <div className="save-btn flex justify-center md:justify-end md:mx-36 mt-6">
                <button onClick={updateDetails} className='bg-purple-500 p-2 w-28 rounded-xl'>SAVE</button>
            </div>
        </form>
        <hr />
        <form onSubmit={(e) => e.preventDefault()} className="last-section flex flex-col">
            <p className='text-2xl flex justify-center my-4'>Update Password</p>
            <div className="flex md:flex-row flex-col input-section">
                <p className='md:mx-7 mx-5 mr-24 mt-2'>Old Password :</p>
                <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" className='bg-gray-500 md:w-[30%] w-[70%] md:ml-16 ml-4 rounded-xl p-2 border-none outline-none' />
            </div>
            <div className="flex md:flex-row flex-col my-4 input-section">
                <p className='md:mx-7 mx-5 mr-[90px] mt-2'>New Password :</p>
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className='bg-gray-500 md:w-[30%] w-[70%] md:ml-[60px] ml-4 rounded-xl p-2 border-none outline-none' />
            </div>
            <div className="flex md:flex-row flex-col input-section">
                <p className='md:mx-7 mx-5 mt-2'>Confirm New Password :</p>
                <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" className='bg-gray-500 md:w-[30%] w-[70%] md:ml-0 ml-4 rounded-xl p-2 border-none outline-none' />
            </div>
            <div className="save-btn flex md:justify-start justify-center md:ml-6 my-4">
                <button onClick={changePassword} className='bg-purple-500 p-2 w-28 rounded-xl'>UPDATE</button>
            </div>
        </form>
    </div>}
    <ToastContainer toastStyle={{ backgroundColor: "#202d40", color: 'white' }} />
    </>
  )
}

export default MyProfile