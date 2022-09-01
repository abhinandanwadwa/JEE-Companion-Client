import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const DashBoard = () => {
    const navigate = useNavigate();
    const[pendingChallenges, setPendingChallenges] = useState([]);
    const [skeletonArray, setSkeletonArray] = useState([1, 2, 3]);
    const [isLoadingCards, setIsLoadingCards] = useState(false);
    const [challengeDetailsLoading, setChallengeDetailsLoading] = useState(false);
    const [challengeDetails, setChallengeDetails] = useState();
    const [subjectList, setSubjectList] = useState();

    useEffect(() => {
      if (!localStorage.getItem('auth-token')) {
        navigate('/login');
      }
      else {
        const getPendingChallenges = async () => {
          setIsLoadingCards(true);
          const token = localStorage.getItem('auth-token');
          await fetch('http://localhost:8181/api/challenge/getpendingreceivedchallenges', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': token
            }
          }).then((res) => res.json())
          .then((result) => {
            setPendingChallenges(result);
            setIsLoadingCards(false);
          })
        }

        getPendingChallenges();
      }
      // eslint-disable-next-line
    }, [])


    const convertToMonthName = (num) => {
      var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

      return months[num];
    }



    const openSeeDetails = async (id) => {
      openModal();
      setChallengeDetailsLoading(true);
      const token = localStorage.getItem('auth-token');
      await fetch(`http://localhost:8181/api/challenge/getchallengebyid/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      }).then((res) => res.json())
        .then((result) => {
          console.log(result);
          setChallengeDetails(result);
          setSubjectList(result.subjects);
          setChallengeDetailsLoading(false);
        });
    }


    const openModal = () => {
      document.getElementById('defaultModal').classList.remove('scale-down-center');
      document.getElementById('defaultModal').classList.add('scale-up-center');
  }

  const closeModal = () => {
    document.getElementById('defaultModal').classList.remove('scale-up-center');
    setTimeout(() => {
        document.getElementById('defaultModal').style.opacity = '0';
    }, 150);
    setTimeout(() => {
        document.getElementById('defaultModal').style.opacity = '1';
    }, 300);
    document.getElementById('defaultModal').classList.add('scale-down-center');
}


const capitaliseIt = (str) => {
  const firstLetter = str[0];
  const capitalisedFirstLetter = firstLetter.toUpperCase();
  const substr = str.substr(1, str.length-1);
  return (capitalisedFirstLetter + substr);
}

    
    

  return (
    <>
    <Navbar active={'dashboard'} />

    <div className="dash-container overflow-x-hidden md:mx-20 mx-2 my-10 md:mr-3 flex md:flex-row flex-col text-white">
      <div className="first-section md:w-[70%] w-[100%] bg-[#1f2937] h-full px-5 py-5 rounded-3xl">
        <div className="top-section flex w-[100%] flex-col">
          <div className="topmost flex flex-row justify-between w-[100%] mb-2">
            <h2 className='font-bold text-2xl'>Home</h2>
            <span className='my-1'>December, 12</span>
          </div>
          <div className="bottomoftop flex flex-row justify-between mt-5">
            <div className="left-side flex flex-wrap">
              <div className="pr-10">
                <div className="text-2xl font-bold">45</div>
                <div>In Progress</div>
              </div>
              <div className="pr-10">
                <div className="text-2xl font-bold">24</div>
                <div>Upcoming</div>
              </div>
              <div className="pr-10">
                <div className="text-2xl font-bold">62</div>
                <div>Total Projects</div>
              </div>
            </div>
            <div className="right-side flex">

              {/* Maybe Sort here */}
              <svg className='mt-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              {/* Maybe Sort here */}

            </div>
          </div>
        </div>
        <div className="bottom-section mt-10">
          <div className="cards w-full flex flex-wrap md:ml-10">

            {/* <div className="card rounded-3xl my-4 mx-4 bg-[#555555] md:w-1/4 w-full">
              <div className="card-head text-white my-4 text-sm mx-4">
                December 10, 2020
              </div>
              <div className="image flex justify-center my-5">
                <img className='rounded-2xl' width={100} src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
              </div>
              <div className="card-title justify-center items-center my-5 flex flex-col">
                <div className="main text-white font-bold">
                  Abhinandan Wadhwa
                </div>
                <div className="notMain text-sm my-3">
                    <a className='underline' href='/'>See Details</a>
                </div>
              </div>
              <div className="status flex flex-row justify-center my-5">
                <button className='text-gray-100 bg-green-600 p-2 mx-2 w-[35%] rounded-lg'>Accept</button>
                <button className='text-gray-100 bg-red-500 p-2 mx-2 rounded-lg w-[35%]'>Decline</button>
              </div>
              <div className="footer flex flex-row justify-between text-[#ffc144] font-bold">
                <div className="somerandonimages">

                </div>
                Comment <div className="timeLeft mx-4 my-2 text-[#ffdfb6]">
                it    2 Days Left
                out  </div> 
              </div>
            </div> */}
            

            {/* {!pendingChallenges && "LOADING..."} */}


            
          {isLoadingCards && skeletonArray.map((number) => {
            return (
              <div key={number} role="status" style={{marginLeft: '-20px'}} className="p-4 max-w-[19rem] mx-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                
              {/* <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700">
                  <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path></svg>
              </div> */}
              {/* <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div> */}
              <div className="flex justify-center">
              <svg className="w-[50%] h-[50%] text-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="flex items-center mt-4 space-x-3">
                  
                  <div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                      <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
              </div>
              <span className="sr-only">Loading...</span>
          </div>    
            );
          })
          }

          
            {pendingChallenges.map((challenge) => {
              const dateStu = challenge.createdAt;
              return (
                <div key={challenge._id} className="card fade-in rounded-3xl my-4 mx-4 bg-[#555555] md:w-[28%] w-full">
                  <div className="card-head text-white my-4 text-sm mx-4">
                    {/* December 10, 2020 */}
                    {convertToMonthName(new Date(dateStu).getMonth()) + " " + new Date(dateStu).getDate().toString() + ", " + new Date(dateStu).getFullYear()}
                  </div>
                  <div className="image flex justify-center my-5">
                    <img className='rounded-2xl' width={100} src={challenge.challengeByPFPURI} alt="" />
                  </div>
                  <div className="card-title justify-center items-center my-5 flex flex-col">
                    <div className="main text-white font-bold">
                      {/* Abhinandan Wadhwa */}
                      {challenge.challengeByName}
                    </div>
                    <div className="notMain text-sm my-3">
                        <button onClick={() => openSeeDetails(challenge._id)} className='underline'>See Details</button>
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
              );
            }) 
            }

            
          </div>
        </div>
      </div>

      
      <div className="second-section md:w-[30%] w-[100%] bg-[#1f2937] h-full md:ml-5 md:mt-0 mt-4 px-5 py-5 rounded-3xl">
        <div className="heading text-2xl font-bold mb-6 mt-1">
          Global Updates
        </div>
        {/* <hr style={{width: '100%', opacity: '0.3', marginTop: '20px'}} /> */}

        <div style={{alignItems: 'center'}} className="update border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700">
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

        <div style={{alignItems: 'center'}} className="update border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700">
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


      {/* Modal Start */}

<div id="defaultModal" tabIndex="-1" className="scale-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full justify-center items-center flex bg-[#000000c9]" aria-modal="true" role="dialog">
    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">

        <div id="myModalContent" className="relative bg-white rounded-lg shadow dark:bg-[#202d40]">
            
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Challenge Details
                </h3>
                <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>


            {challengeDetailsLoading && <div className="loading-logo flex justify-center h-24 items-center mb-5">
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>}
            
            <div style={{opacity: !challengeDetailsLoading?'1':'0'}} className="transition-all duration-200 p-6 space-y-6">
                <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col">
                      <div className="subjects flex flex-row">
                        <p className='text-xl font-bold mr-4'>Subjects :</p>

                        {subjectList && subjectList.map((subject) => {
                          return (
                            <div key={subject} className="badges">
                              <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{capitaliseIt(subject)}</span>
                            </div>
                          );
                        })
                        }

                      </div>
                      <div className="level flex flex-row my-5">
                        <p className='text-xl font-bold mr-4'>Difficulity Level :</p>
                          <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">JEE {challengeDetails && capitaliseIt(challengeDetails.difficulty)}</span>
                        </div>
                      <div className="noofquestions flex flex-row">
                        <p className='text-xl font-bold mr-4'>Number of Questions :</p>
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{challengeDetails && challengeDetails.noOfQuestions}</span>
                      </div>
                      <div className="time-allotted flex flex-row mt-5">
                        <p className='text-xl font-bold mr-4'>Time Allotted :</p>
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{challengeDetails && challengeDetails.timeNeeded} Minutes</span>
                      </div>
                    </div>
                </div>
            </div>
            
            {!challengeDetailsLoading && <div className="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button onClick={closeModal} data-modal-toggle="defaultModal" type="button" className="cancel-btn text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">OK</button>
            </div>}
        </div>
    </div>
</div>

{/* Modal End */}
    </div>
    </>
  )
}

export default DashBoard