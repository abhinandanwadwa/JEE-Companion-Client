import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Mychallanges = () => {
  const navigate = useNavigate();
  const [challengeList, setChallengeList] = useState([]);

  useEffect(() => {
    const ChallengeHistory = async () => {
      const token = localStorage.getItem('auth-token');
      
      const response = await fetch('http://localhost:5000/api/challenge/challengehistory', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const json = await response.json();
      // console.log(json);
      setChallengeList(json);
    }
    ChallengeHistory();
  }, [])
  
  return (
    <>
    <Navbar active={"mychallanges"} />
    <div className="container flex flex-col justify-center">
      <h1 className='text-white flex items-center justify-center mt-10 text-3xl font-bold'>My Challenges</h1>
      <div className="all-challanges md:p-16 p-8 flex flex-col justify-center items-center">

        {challengeList.map((challenge) => {
          return (
              <div key={challenge._id} className="card md:w-[80%] w-[100%] bg-gray-800 rounded-2xl my-2 cursor-pointer">
                <div style={{alignItems: 'center'}} className="update p-4 flex 2xl:items-start w-full text-white hover:rounded-2xl hover:bg-gray-700">
                  <div className="left flex flex-col">
                    <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="Abhi" className='h-10 w-10 rounded-full object-cover' />
                    <p className='ml-2'>vs</p>
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" width={50} alt="Monika" className='h-10 w-10 rounded-full object-cover' />
                  </div>
                  <div style={{borderLeft: '2px solid #8080805e', height: '104px'}} className="mx-3 relative"></div>
                  <div className="right flex">
                    <p className=''><strong>Abhinandan</strong> Wins Over <strong>Monika</strong> and got <strong>100</strong> points</p>
                  </div>
                </div>
              </div>
          );
        })}
        
      </div>
      <div className="completed">

      </div>
    </div>
    </>
  )
}

export default Mychallanges