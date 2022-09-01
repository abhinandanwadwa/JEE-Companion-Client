import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChallengePage = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [me, setMe] = useState();
    const [him, setHim] = useState();
    const [options, setOptions] = useState("subjects");
    // const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isPhysics, setIsPhysics] = useState(false);
    const [isChemistry, setIsChemistry] = useState(false);
    const [isMaths, setIsMaths] = useState(false);
    const [questionLevel, setQuestionLevel] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [timeNeeded, setTimeNeeded] = useState(0);

    

    // const addSubject = (subject) => {
    //     setSelectedSubjects((list) => [...list, subject]);

    //     setTimeout(() => {
    //         console.log(selectedSubjects);
    //     }, 1000);
    // }


    useEffect(() => {
      const getHim = async () => {
        const token = localStorage.getItem('auth-token');
        const response = await fetch(`http://localhost:8181/api/auth/getuser/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': token
            },
        });

        const json = await response.json();
        setHim(json);
        setIsLoaded(true);
        console.log(me)
        // .then((res) => res.json())
        //     .then((res) => {
        //         setHim(res);
        //     })
        //     .then(setIsLoaded(true));
        }



      const getMe = async () => {
        const token = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/getMyDetails', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': token
            },
        });

        const json = await response.json();
        setMe(json);

        // .then((res) => res.json())
        //     .then((res) => {
        //         setMe(res);
        //     });
      }


      getHim();
      getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const confirmChallenge = async () => {
        setBtnLoading(true);

        const selectedSubjects = [];
        if (isPhysics) {
            selectedSubjects.push("physics");
        }
        if (isChemistry) {
            selectedSubjects.push("chemistry");
        }
        if (isMaths) {
            selectedSubjects.push("maths");
        }


        const token = localStorage.getItem('auth-token');
        const response = await fetch(`http://localhost:8181/api/challenge/sendchallenge/${him._id}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': token
            },
            body: JSON.stringify({ subjects: selectedSubjects, difficulty: questionLevel, noOfQuestions: noOfQuestions, timeNeeded: timeNeeded }),
        });

        const json = await response.json();
        console.log(json);

        if (json.error) {
            toast.error(json.error);
            closeModal();
        }
        else {
            toast.success(`Woah! Challenge to ${him.fname + " " + him.lname} successfully sent!`);
            closeModal();
            setTimeout(() => {
                openSecondModal();
            }, 100);
        }
        // toast("Wow so easy!");
        setBtnLoading(false);
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


    const openModal = () => {
        document.getElementById('defaultModal').classList.remove('scale-down-center');
        document.getElementById('defaultModal').classList.add('scale-up-center');
    }







    const openSecondModal = () => {
        document.getElementById('newModal').classList.remove('scale-down-center');
        document.getElementById('newModal').classList.add('scale-up-center');
    }

    const closeSecondModal = () => {
        document.getElementById('newModal').classList.remove('scale-up-center');
        setTimeout(() => {
            document.getElementById('newModal').style.opacity = '0';
        }, 150);
        setTimeout(() => {
            document.getElementById('newModal').style.opacity = '1';
        }, 300);
        document.getElementById('newModal').classList.add('scale-down-center');
        navigate('/mychallenges');
    }







  return (
    <>
    <Navbar active="challenge" />
    {isLoaded && 
    <>
    <div className="container max-w-[100vw] flex justify-center flex-col overflow-x-hidden">
        {him && <div className='flex justify-center items-center'>
        <h1 className='md:text-2xl text-xl text-stone-300'>Challenge - <strong>{him.fname + " " + him.lname}</strong></h1>
        <img className='rounded-2xl ml-4' src={him.imageURI} alt="" /> 
        </div>}

        <div className="chooseVariants mt-24">         
            <ul class="justify-center flex md:flex-wrap text-sm font-medium text-center text-gray-500 /border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li class="mr-2">
                    <button onClick={() => setOptions('subjects')} aria-current="page" className={options === "subjects"? "inline-block p-4 w-[180px] text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 /transition-all duration-300": "transition-all duration-300 inline-block p-4 rounded-t-lg w-[180px] hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}>Subject(s)</button>
                </li>
                <li class="mr-2">
                    <button onClick={() => setOptions('questions')} className={options === "questions"? "transition-all duration-300 inline-block p-4 w-[180px] text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500": "transition-all duration-300 inline-block p-4 rounded-t-lg w-[180px] hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}>Questions</button>
                </li>
                {/* <li class="mr-2">
                    <a href="/" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Contacts</a>
                </li>
                <li>
                    <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500"/>Disabled</a>
                </li> */}
            </ul>

            {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select the Subjects</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 /focus:border-blue-500 /block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 /dark:focus:border-blue-500"/>
            <option selected></option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            </select> */}

        </div>

        <hr style={{width: '100vw', opacity: '0.3'}} />
        

       {options === 'subjects' && <div className='mt-[70px] flex md:flex-row flex-col justify-center'>
            <a name="physics" style={{backgroundColor: isPhysics && '#374151'}} onClick={(e) => {
                e.preventDefault();
                if (isPhysics) {
                    setIsPhysics(false);
                }
                else {
                    setIsPhysics(true);
                }
                }} href="/" class="w-[90vw] flex p-6 h-[0%] max-w-sm md:w-[23%] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-5 my-4">

                <input readOnly class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xl bg-slate-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-[16px] align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={isPhysics} value="" id="flexCheckDefault"></input>

                <img src="https://www.pinclipart.com/picdir/big/342-3427921_physics-atom-clipart.png" alt="" style={{height: '50px'}} width={"50px"} />
                <h5 class="ml-[24px] mt-[2px] text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Physics</h5>
            </a>
            <a href="/" style={{backgroundColor: isChemistry && '#374151'}} name="chemistry" onClick={(e) => {
                e.preventDefault();
                if (isChemistry) {
                    setIsChemistry(false);
                }
                else {
                    setIsChemistry(true);
                }
                }} class="w-[90vw] flex p-6 h-[0%] max-w-sm md:w-[23%] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-5 my-4">

                <input readOnly class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xl bg-slate-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-[16px] align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={isChemistry} value="" id="flexCheckDefault"></input>

                <img src="https://images.vexels.com/media/users/3/151610/isolated/preview/745f2cc314a4b27b252b25e2e7117cef-chemistry-tubes-icon-by-vexels.png" alt="" style={{height: '50px'}} width={"50px"} />
                <h5 class="ml-[24px] mt-[2px] text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chemistry</h5>
            </a>
            <a href="/" style={{backgroundColor: isMaths && '#374151'}} name="maths" onClick={(e) => {
                e.preventDefault();
                if (isMaths) {
                    setIsMaths(false);
                }
                else {
                    setIsMaths(true);
                }
                }} class="w-[90vw] flex p-6 h-[0%] max-w-sm md:w-[23%] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-5 my-4">

                <input readOnly class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xl bg-slate-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-[16px] align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={isMaths} value="" id="flexCheckDefault"></input>

                <img src="https://www.shareicon.net/data/2015/10/07/113806_math_512x512.png" alt="" style={{height: '50px'}} width={"50px"} />
                <h5 class="ml-[24px] mt-[2px] text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Maths</h5>
            </a>
        </div>}










        

        {options === 'questions' && <div className="flex justify-center items-center flex-col">
            <div className="text-white flex flex-col mt-6 upper-section">

                <strong className='md:text-2xl text-xl text-center'>Choose Difficulity Level of the Challenge</strong>

                <div className="flex md:flex-row flex-col mt-8">
                <a name="jeeMains" style={{backgroundColor: questionLevel==="mains" && '#374151'}} onClick={(e) => {
                e.preventDefault();
                if (questionLevel === "" || questionLevel === "advanced") {
                    setQuestionLevel("mains");
                }
                else {
                    setQuestionLevel("");
                }
                }} href="/" class="w-[90vw] flex p-6  h-[0%] max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-5 my-4">

                <input readOnly class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xl bg-slate-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-[11px] align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={questionLevel === "mains"} value="" id="flexCheckDefault"></input>

                <h5 class="ml-[24px] mt-[2px] text-2xl font-bold tracking-tight text-gray-900 dark:text-white">JEE Mains</h5>
            </a>

                <a name="jeeAdvanced" style={{backgroundColor: questionLevel==="advanced" && '#374151'}} onClick={(e) => {
                e.preventDefault();
                if (questionLevel === "" || questionLevel === "mains") {
                    setQuestionLevel("advanced");
                }
                else {
                    setQuestionLevel("");
                }
                }} href="/" class="w-[90vw] flex p-6 h-[0%] max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-5 my-4">

                <input readOnly class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xl bg-slate-600 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-[11px] align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={questionLevel === "advanced"} value="" id="flexCheckDefault"></input>

                <h5 class="ml-[24px] mt-[2px] text-2xl font-bold tracking-tight text-gray-900 dark:text-white">JEE Advanced</h5>
            </a>
            </div>

            </div>



            <hr style={{width: '100vw', opacity: '0.3', marginTop: '8px'}} />

            {questionLevel !== "" && <div className="text-white mt-6 lower-section">
                <strong className='md:text-2xl text-xl text-center'>Choose The Number of Questions</strong>

                
                <ul style={{backgroundColor: "#1f2937"}} class="w-[100%] mt-6 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li onClick={() => {setNoOfQuestions(5); setTimeNeeded(questionLevel === "advanced"? 25:15)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-license" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">5 Questions ({questionLevel === "advanced"? '25':'15'} Minutes)</label>
                        </div>
                    </li>
                    <li onClick={() => {setNoOfQuestions(10); setTimeNeeded(questionLevel === "advanced"? 50:30)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-id" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">10 Questions ({questionLevel === "advanced"? '50':'30'} Minutes)</label>
                        </div>
                    </li>
                    <li onClick={() => {setNoOfQuestions(15); setTimeNeeded(questionLevel === "advanced"? 75:45)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-millitary" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-millitary" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">15 Questions ({questionLevel === "advanced"? '75':'45'} Minutes)</label>
                        </div>
                    </li>
                    <li onClick={() => {setNoOfQuestions(20); setTimeNeeded(questionLevel === "advanced"? 100:60)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-passport" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-passport" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">20 Questions ({questionLevel === "advanced"? '100':'60'} Minutes)</label>
                        </div>
                    </li>
                    <li onClick={() => {setNoOfQuestions(25); setTimeNeeded(questionLevel === "advanced"? 125:75)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-sex" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-sex" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">25 Questions ({questionLevel === "advanced"? '125':'75'} Minutes)</label>
                        </div>
                    </li>
                    <li onClick={() => {setNoOfQuestions(30); setTimeNeeded(questionLevel === "advanced"? 150:90)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-sex2" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-sex2" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">30 Questions ({questionLevel === "advanced"? '150':'90'} Minutes)</label>
                        </div>
                    </li>
                    <li onClick={() => {setNoOfQuestions(35); setTimeNeeded(questionLevel === "advanced"? 175:105)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-sex3" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-sex3" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">35 Questions ({questionLevel === "advanced"? '175':'105'} Minutes)</label>
                        </div>
                    </li>
                    <li onClick={() => {setNoOfQuestions(40); setTimeNeeded(questionLevel === "advanced"? 200:120)}} class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="list-radio-sex4" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                            <label for="list-radio-sex4" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">40 Questions ({questionLevel === "advanced"? '200':'120'} Minutes)</label>
                        </div>
                    </li>
                </ul>

            </div>}
        </div>}

        <div className="end-btn flex justify-center">
            <button onClick={openModal} className='confirm-challenge-btn my-10 md:w-[25%] w-[80%] cursor-pointer' disabled={(!isPhysics && !isChemistry && !isMaths) || (questionLevel === "") || (timeNeeded === 0)}>Confirm Challenge</button>
        </div>

{/* Modal Start */}

<div id="defaultModal" tabindex="-1" class="scale-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full justify-center items-center flex bg-[#000000c9]" aria-modal="true" role="dialog">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">

        <div class="relative bg-white rounded-lg shadow dark:bg-[#202d40]">
            
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Confirm Challenge?
                </h3>
                <button onClick={closeModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Confirming this will send your challenge to {him.fname + " " + him.lname}
                </p>
            </div>
            
            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                {!btnLoading && <button onClick={confirmChallenge} data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm</button>}

                {btnLoading &&  <button onClick={confirmChallenge} data-modal-toggle="defaultModal" type="button" disabled class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 text-center dark:bg-blue-800 dark:focus:ring-blue-800"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></button>}
                
                <button disabled={btnLoading} onClick={closeModal} data-modal-toggle="defaultModal" type="button" class="cancel-btn text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
            </div>
        </div>
    </div>
</div>

{/* Modal End */}




{/* Modal 2 Start */}

<div id="newModal" tabindex="-1" class="scale-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-full justify-center items-center flex bg-[#000000c9]" aria-modal="true" role="dialog">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">

        <div class="relative bg-white rounded-lg shadow dark:bg-[#202d40]">
            
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Start Your Test
                </h3>
                <button onClick={closeSecondModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="newModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    As You have challenged <strong>{him.fname + " " + him.lname}</strong>, you have to give a test to compete with him
                </p>
            </div>
            
            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                {!btnLoading && <button onClick={confirmChallenge} data-modal-toggle="newModal" type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Start Test</button>}

                {btnLoading &&  <button onClick={confirmChallenge} data-modal-toggle="newModal" type="button" disabled class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 text-center dark:bg-blue-800 dark:focus:ring-blue-800"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></button>}
                
                <button disabled={btnLoading} onClick={closeSecondModal} data-modal-toggle="newModal" type="button" class="cancel-btn text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">I'll do it Later</button>
            </div>
        </div>
    </div>
</div>

{/* Modal 2 End */}




<ToastContainer toastStyle={{ backgroundColor: "#202d40", color: 'white' }} />

    </div>
    </>
    }
    </>
  )
}

export default ChallengePage