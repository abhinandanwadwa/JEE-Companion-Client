import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Test = () => {
    const navigate = useNavigate();
    let { myid, hisid, challengeid } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
      const checkValidTest = async () => {
        const token = localStorage.getItem('auth-token');
        await fetch('http://localhost:5000/api/challenge/checkvalidtest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },body: JSON.stringify({ hisid, challengeid })
        }).then((response) => response.json())
          .then((result) => {
            if (result.badguy) {
                navigate('/');
            }
            else if (result.error) {
                setError(true);
            }
            else {
                setError(false);
            }
          })
      }

      checkValidTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <>
        {!error && 
            <>
            <div className="text-white container flex justify-between flex-row w-[100vw] h-[100vh]">
                <div className="left-navigation flex flex-col w-[25%]">
                    <div className="top-info w-[100%] h-[20%] bg-blue-800 justify-center items-center flex">
                        <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" width={40} className="mx-2 h-9 object-cover rounded-full" alt="" />
                        <p className="name text-white text-2xl font-bold">Abhinandan Wadhwa</p>
                    </div>
                    <div className="navigation flex flex-col bg-blue-300 h-[65%]">
                        <p className="section-name text-blue-900 font-bold text-2xl mt-4 mx-4">
                            Phy-Sec-I
                        </p>
                        <div className="navigation-buttons">
                            <button className="btn inline-block w-[50px] h-[50px] leading-[50px] bg-blue-800 text-center font-[15px] text-white mx-4 font-bold mt-4 rounded-full">
                                1
                            </button>
                        </div>
                    </div>
                    <div className="legend flex flex-col h-[17%] bg-slate-400">
                        <p className='font-bold mx-2 text-black text-lg'>Legend</p>
                        <div className="top flex justify-between my-3 mr-[10%] ml-[5%]">
                            <div className="first-ball flex flex-row">
                                <span class="green-dot h-[25px] w-[25px] rounded-full inline-block bg-green-600"></span>
                                <span className='text-black mx-1'>Answered</span>
                            </div>
                            <div className="second-ball flex flex-row">
                                <span class="black-dot h-[25px] w-[25px] rounded-full inline-block bg-black"></span>
                                <span className='text-black mx-1'>Not Answered</span>
                            </div>
                        </div>
                        <div className="bottom flex justify-between my-3 mr-[16%] ml-[5%]">
                            <div className="third-ball flex flex-row">
                                <span class="purple-dot h-[25px] w-[25px] rounded-full inline-block bg-purple-600"></span>
                                <span className='text-black mx-1'>Marked for Review</span>
                            </div>
                            <div className="fourth-ball flex flex-row">
                                <span class="blue-dot h-[25px] w-[25px] rounded-full inline-block bg-blue-600"></span>
                                <span className='text-black mx-1'>Not Visited</span>
                            </div>
                        </div>
                    </div>
                    <div className="last-buttons flex flex-col justify-end bg-slate-100 h-[6%]">
                        <button className="submit-test bg-blue-800 p-3">Submit Test</button>
                    </div>
                </div>
                <div className="right-main flex flex-col w-[70%] bg-blue-800">
                    <div className="top-info">

                    </div>
                    <div className="section-navigation">

                    </div>
                    <div className="main-question">

                    </div>
                </div>
            </div>
            </>
        }
        </>
    )
}

export default Test