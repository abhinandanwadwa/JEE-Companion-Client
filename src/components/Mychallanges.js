import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Mychallanges = () => {
  const navigate = useNavigate();
  const [challengeList, setChallengeList] = useState([]);
  const [myId, setMyId] = useState("");

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

    const getMyself = async () => {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:5000/api/auth/getMyDetails', {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const json = await response.json();
      // console.log(json);
      setMyId(json._id);
    }

    getMyself();
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

                {/* Challenge Completed by Both */}
                {challenge.CompletedBySender && challenge.CompletedByReceiver && <div style={{alignItems: 'center'}} className="update p-4 flex 2xl:items-start w-full text-white hover:rounded-2xl hover:bg-gray-700">
                  <div className="left flex flex-col">
                    <img src={challenge.challengeByPFPURI} alt="Abhi" className='h-10 w-10 rounded-full object-cover' />
                    <p className='ml-2'>vs</p>
                    <img src={challenge.challengeToPFPURI} width={50} alt="Monika" className='h-10 w-10 rounded-full object-cover' />
                  </div>
                  <div style={{borderLeft: '2px solid #8080805e', height: '104px'}} className="mx-3 relative"></div>
                  <div className="right flex">
                    <p className=''><strong>{challenge.ReceiverScore>challenge.SenderScore?challenge.challengeToName:challenge.challengeByName}</strong> Wins Over <strong>{challenge.ReceiverScore>challenge.SenderScore?challenge.challengeByName:challenge.challengeToName}</strong> and got <strong>100</strong> points</p>
                  </div>
                </div>}

                {/* Challenge Not Completed by Receiver */}
                {challenge.CompletedBySender && !challenge.CompletedByReceiver && <div style={{alignItems: 'center'}} className="update p-4 flex 2xl:items-start w-full text-white hover:rounded-2xl hover:bg-gray-700">
                  <div className="left flex flex-col">
                    <img src={challenge.challengeByPFPURI} alt="Abhi" className='h-10 w-10 rounded-full object-cover' />
                    <p className='ml-2'>vs</p>
                    <img src={challenge.challengeToPFPURI} width={50} alt="Monika" className='h-10 w-10 rounded-full object-cover' />
                  </div>
                  <div style={{borderLeft: '2px solid #8080805e', height: '104px'}} className="mx-3 relative"></div>
                  <div className="right flex">
                    <p className=''>Challenge Completed By <strong>{challenge.challengeByName}</strong> and to be Completed by <strong>{challenge.challengeToName}</strong></p>
                  </div>
                </div>}

                {/* Challenge Not Completed by Sender */}
                {!challenge.CompletedBySender && challenge.CompletedByReceiver && <div style={{alignItems: 'center'}} className="update p-4 flex 2xl:items-start w-full text-white hover:rounded-2xl hover:bg-gray-700">
                  <div className="left flex flex-col">
                    <img src={challenge.challengeByPFPURI} alt="Abhi" className='h-10 w-10 rounded-full object-cover' />
                    <p className='ml-2'>vs</p>
                    <img src={challenge.challengeToPFPURI} width={50} alt="Monika" className='h-10 w-10 rounded-full object-cover' />
                  </div>
                  <div style={{borderLeft: '2px solid #8080805e', height: '104px'}} className="mx-3 relative"></div>
                  <div className="right flex">
                  <p className=''>Challenge Completed By <strong>{challenge.challengeToName}</strong> and to be Completed by <strong>{challenge.challengeByName}</strong></p>
                  </div>
                </div>}

                {/* Challenge Not Completed by both Sender and Receiver */}
                {!challenge.CompletedBySender && !challenge.CompletedByReceiver && <div style={{alignItems: 'center'}} className="update p-4 flex 2xl:items-start w-full text-white hover:rounded-2xl hover:bg-gray-700">
                  <div className="left flex flex-col">
                    <img src={challenge.challengeByPFPURI} alt="Abhi" className='h-10 w-10 rounded-full object-cover' />
                    <p className='ml-2'>vs</p>
                    <img src={challenge.challengeToPFPURI} width={50} alt="Monika" className='h-10 w-10 rounded-full object-cover' />
                  </div>
                  <div style={{borderLeft: '2px solid #8080805e', height: '104px'}} className="mx-3 relative"></div>
                  <div className="right flex">
                  <p className=''>Challenge to be Completed By Both <strong>{challenge.challengeByName}</strong> and <strong>{challenge.challengeToName}</strong></p>
                  </div>
                </div>}
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