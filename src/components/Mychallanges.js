import React from 'react'
import Navbar from './Navbar'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Mychallanges = () => {
  const navigate = useNavigate();
  return (
    <>
    <Navbar active={"mychallanges"} />
    <div className="container flex flex-col justify-center">
      <h1 className='text-white flex items-center justify-center mt-10 text-3xl font-bold'>My Challenges</h1>
      <div className="in-progress p-16 flex flex-col">
        <h2 className='text-white text-xl'>In Progress</h2>

        <div className="card-carousel flex flex-row w-[120%]">



                {/* <div key={challenge._id} className="card fade-in rounded-3xl my-4 mx-4 bg-[#555555] md:w-[28%] w-full"> */}
                <div key={{}} className="card fade-in rounded-3xl my-4 bg-[#555555] md:w-[15%] mr-4">
                  <div className="card-head text-white my-4 text-sm mx-4">
                    December 10, 2020
                  </div>
                  <div className="image flex justify-center my-5">
                    {/* <img className='rounded-2xl' width={100} src={challenge.challengeByPFPURI} alt="" /> */}
                    <img className='rounded-2xl' width={100} src={"https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="" />
                  </div>
                  <div className="card-title justify-center items-center my-5 flex flex-col">
                    <div className="main text-white font-bold">
                      Abhinandan Wadhwa
                      {/* {challenge.challengeByName} */}
                    </div>
                    <div className="notMain text-sm my-3">
                        {/* <button onClick={() => openSeeDetails(challenge._id)} className='underline'>See Details</button> */}
                        <button onClick={{}} className='underline'>See Details</button>
                    </div>
                  </div>
                  <div className="status flex flex-row justify-center my-5">
                    <button className='text-gray-100 bg-green-600 p-2 mx-2 w-[35%] rounded-lg'>Accept</button>
                    <button className='text-gray-100 bg-red-500 p-2 mx-2 rounded-lg w-[35%]'>Decline</button>
                  </div>
                  <div className="footer flex flex-row justify-between text-[#ffc144] font-bold">
                    <div className="somerandonimages">

                    </div>
                    {/* <div className="timeLeft mx-4 my-2 text-[#ffdfb6]">
                      2 Days Left
                    </div> */}
                  </div>
                </div>
                {/* <div key={challenge._id} className="card fade-in rounded-3xl my-4 mx-4 bg-[#555555] md:w-[28%] w-full"> */}
                <div key={{}} className="card fade-in rounded-3xl my-4 bg-[#555555] md:w-[15%] mr-4">
                  <div className="card-head text-white my-4 text-sm mx-4">
                    December 10, 2020
                  </div>
                  <div className="image flex justify-center my-5">
                    {/* <img className='rounded-2xl' width={100} src={challenge.challengeByPFPURI} alt="" /> */}
                    <img className='rounded-2xl' width={100} src={"https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="" />
                  </div>
                  <div className="card-title justify-center items-center my-5 flex flex-col">
                    <div className="main text-white font-bold">
                      Abhinandan Wadhwa
                      {/* {challenge.challengeByName} */}
                    </div>
                    <div className="notMain text-sm my-3">
                        {/* <button onClick={() => openSeeDetails(challenge._id)} className='underline'>See Details</button> */}
                        <button onClick={{}} className='underline'>See Details</button>
                    </div>
                  </div>
                  <div className="status flex flex-row justify-center my-5">
                    <button className='text-gray-100 bg-green-600 p-2 mx-2 w-[35%] rounded-lg'>Accept</button>
                    <button className='text-gray-100 bg-red-500 p-2 mx-2 rounded-lg w-[35%]'>Decline</button>
                  </div>
                  <div className="footer flex flex-row justify-between text-[#ffc144] font-bold">
                    <div className="somerandonimages">

                    </div>
                    {/* <div className="timeLeft mx-4 my-2 text-[#ffdfb6]">
                      2 Days Left
                    </div> */}
                  </div>
                </div>
                {/* <div key={challenge._id} className="card fade-in rounded-3xl my-4 mx-4 bg-[#555555] md:w-[28%] w-full"> */}
                <div key={{}} className="card fade-in rounded-3xl my-4 bg-[#555555] md:w-[15%] mr-4">
                  <div className="card-head text-white my-4 text-sm mx-4">
                    December 10, 2020
                  </div>
                  <div className="image flex justify-center my-5">
                    {/* <img className='rounded-2xl' width={100} src={challenge.challengeByPFPURI} alt="" /> */}
                    <img className='rounded-2xl' width={100} src={"https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="" />
                  </div>
                  <div className="card-title justify-center items-center my-5 flex flex-col">
                    <div className="main text-white font-bold">
                      Abhinandan Wadhwa
                      {/* {challenge.challengeByName} */}
                    </div>
                    <div className="notMain text-sm my-3">
                        {/* <button onClick={() => openSeeDetails(challenge._id)} className='underline'>See Details</button> */}
                        <button onClick={{}} className='underline'>See Details</button>
                    </div>
                  </div>
                  <div className="status flex flex-row justify-center my-5">
                    <button className='text-gray-100 bg-green-600 p-2 mx-2 w-[35%] rounded-lg'>Accept</button>
                    <button className='text-gray-100 bg-red-500 p-2 mx-2 rounded-lg w-[35%]'>Decline</button>
                  </div>
                  <div className="footer flex flex-row justify-between text-[#ffc144] font-bold">
                    <div className="somerandonimages">

                    </div>
                    {/* <div className="timeLeft mx-4 my-2 text-[#ffdfb6]">
                      2 Days Left
                    </div> */}
                  </div>
                </div>
                {/* <div key={challenge._id} className="card fade-in rounded-3xl my-4 mx-4 bg-[#555555] md:w-[28%] w-full"> */}
                <div key={{}} className="card fade-in rounded-3xl my-4 bg-[#555555] md:w-[15%] mr-4">
                  <div className="card-head text-white my-4 text-sm mx-4">
                    December 10, 2020
                  </div>
                  <div className="image flex justify-center my-5">
                    {/* <img className='rounded-2xl' width={100} src={challenge.challengeByPFPURI} alt="" /> */}
                    <img className='rounded-2xl' width={100} src={"https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="" />
                  </div>
                  <div className="card-title justify-center items-center my-5 flex flex-col">
                    <div className="main text-white font-bold">
                      Abhinandan Wadhwa
                      {/* {challenge.challengeByName} */}
                    </div>
                    <div className="notMain text-sm my-3">
                        {/* <button onClick={() => openSeeDetails(challenge._id)} className='underline'>See Details</button> */}
                        <button onClick={{}} className='underline'>See Details</button>
                    </div>
                  </div>
                  <div className="status flex flex-row justify-center my-5">
                    <button className='text-gray-100 bg-green-600 p-2 mx-2 w-[35%] rounded-lg'>Accept</button>
                    <button className='text-gray-100 bg-red-500 p-2 mx-2 rounded-lg w-[35%]'>Decline</button>
                  </div>
                  <div className="footer flex flex-row justify-between text-[#ffc144] font-bold">
                    <div className="somerandonimages">

                    </div>
                    {/* <div className="timeLeft mx-4 my-2 text-[#ffdfb6]">
                      2 Days Left
                    </div> */}
                  </div>
                </div>
                {/* <div key={challenge._id} className="card fade-in rounded-3xl my-4 mx-4 bg-[#555555] md:w-[28%] w-full"> */}
                <div key={{}} className="card fade-in rounded-3xl my-4 bg-[#555555] md:w-[15%] mr-4">
                  <div className="card-head text-white my-4 text-sm mx-4">
                    December 10, 2020
                  </div>
                  <div className="image flex justify-center my-5">
                    {/* <img className='rounded-2xl' width={100} src={challenge.challengeByPFPURI} alt="" /> */}
                    <img className='rounded-2xl' width={100} src={"https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="" />
                  </div>
                  <div className="card-title justify-center items-center my-5 flex flex-col">
                    <div className="main text-white font-bold">
                      Abhinandan Wadhwa
                      {/* {challenge.challengeByName} */}
                    </div>
                    <div className="notMain text-sm my-3">
                        {/* <button onClick={() => openSeeDetails(challenge._id)} className='underline'>See Details</button> */}
                        <button onClick={{}} className='underline'>See Details</button>
                    </div>
                  </div>
                  <div className="status flex flex-row justify-center my-5">
                    <button className='text-gray-100 bg-green-600 p-2 mx-2 w-[35%] rounded-lg'>Accept</button>
                    <button className='text-gray-100 bg-red-500 p-2 mx-2 rounded-lg w-[35%]'>Decline</button>
                  </div>
                  <div className="footer flex flex-row justify-between text-[#ffc144] font-bold">
                    <div className="somerandonimages">

                    </div>
                    {/* <div className="timeLeft mx-4 my-2 text-[#ffdfb6]">
                      2 Days Left
                    </div> */}
                  </div>
                </div>

                <div className="see-all-btn flex justify-center items-center">
                  <button onClick={() => navigate('/')} className="btn bg-[#535b76cf] inline-flex justify-center items-center w-[70px] h-[70px] leading-[50px] bg-blue-800 text-center font-[15px] text-white mx-4 font-bold mt-4 rounded-full">All <AiOutlineArrowRight /></button>
                </div>



        </div>
        
      </div>
      <div className="completed">

      </div>
    </div>
    </>
  )
}

export default Mychallanges