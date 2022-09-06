import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

const Challenge = () => {
  const [myCompetitors, setMyCompetitors] = useState();
  useEffect(() => {
    const getMyCompetitors = async () => {

      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:8181/api/auth/getCompetitors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      }).then((res) => res.json())
        .then((res) => {
          setMyCompetitors(res);
        });
      // const resjson = await response.json();
      // console.log(resjson);

    }
    getMyCompetitors();
  }, [])
  

  return (
    <>
    <Navbar active={'challenge'} />
    {/* <h1 className='text-slate-300 flex justify-center text-3xl mt-6 letter tracking-widest'>Challenge A Student</h1> */}

    <section className="text-gray-400 bg-black body-font">
  <div className="container px-5 py-16 mx-auto flex flex-wrap">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-white tracking-widest">Challenge A Student</h1>
      <h2 className="text-xs text-indigo-400 tracking-widest font-medium title-font mt-1">Show off Your Skills</h2>
    </div>
    {/* <div className="flex md:mt-10 flex-wrap -m-4"> */}


      {myCompetitors && myCompetitors.map((competitor) => {
        return (
          <div key={competitor._id} className="md:w-[20%] w-[100%] my-5 mx-16 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </button>
                <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                    <ul className="py-1" aria-labelledby="dropdownButton">
                    <li>
                        <Link to={''} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</Link>
                    </li>
                    <li>
                        <Link to={''} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</Link>
                    </li>
                    <li>
                        <Link to={''} className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</Link>
                    </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-5">
                <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={competitor.imageURI} alt="Bonnie"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{competitor.fname + " " + competitor.lname}</h5>

                <span style={{color: '#13ad9f'}} className="mt-3 text-sm text-gray-500 dark:text-gray-400"><strong>Score: </strong>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-2xl dark:bg-blue-200 dark:text-blue-800">{competitor.score}</span></span>

                <div className="flex mt-4 space-x-3 lg:mt-6 box-border justify-center w-[100%]">
                    <Link to={`/challenge/${competitor._id}`} className="w-[80%] mb-0 justify-center inline-flex items-center py-2 px-4 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Challenge</Link>
                </div>
            </div>
          </div>
        );
      })
      }




{/* <div key={competitor.fname} className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
          <div className="flex items-center mb-3 justify-between">
            <div className='flex'>
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <img src={competitor.imageURI} alt={competitor.fname} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 competitor-img" viewBox="0 0 24 24">
              </img>
            </div>
            <h2 className="text-white text-lg title-font font-medium">{competitor.fname + " " + competitor.lname}</h2>
            </div>
            <div>
            <strong style={{color: '#13ad9f'}} className='mr-2'>Score: </strong>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">100</span>
            </div>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium tenetur eum iure distinctio laborum? Nulla?</p>
            <a href={"/"} className="mt-3 text-indigo-400 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div> */}




      {/* <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-white text-lg title-font font-medium">The Catalyzer</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
            <a href={"/"} className="mt-3 text-indigo-400 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div> */}
      {/* <div className="p-4 md:w-1/3">
        <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <h2 className="text-white text-lg title-font font-medium">Neptune</h2>
          </div>
          <div className="flex-grow">
            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
            <a href={"/"} className="mt-3 text-indigo-400 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div> */}
    {/* </div> */}
  </div>
</section>
    </>
  )
}

export default Challenge