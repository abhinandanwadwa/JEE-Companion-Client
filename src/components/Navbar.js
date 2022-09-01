import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useNavigate, Link } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken')


const Navbar = (props) => {
  const [imageURI, setImageURI] = useState("");
  const navigate = useNavigate();
    // const [navOptions, setNavOptions] = useState(true);
    const toggleNavMenu = () => {
        let optionBar = document.getElementById('nav-options');
        if (optionBar.style.display === "none") {
            optionBar.classList.remove('scale-down-top-right0');
            optionBar.style.display = 'block';
            optionBar.classList.add('scale-up-top-right');
            setTimeout(() => {
                optionBar.classList.remove('scale-up-top-right');
            }, 100);
        }
        else {
            optionBar.classList.remove('scale-up-top-right');
            optionBar.classList.add('scale-down-top-right0');
            setTimeout(() => {
                optionBar.classList.remove('scale-down-top-right0');
                optionBar.style.display = 'none';
            }, 90);
        }
    }

    const toggleHamburger = () => {
        let mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.style.display === 'none') {
            mobileMenu.style.display = 'block';
        }
        else {
            mobileMenu.style.display = 'none';
        }
    }
    

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  useEffect(() => {
    const getMyDetails = async () => {
      const token = localStorage.getItem('auth-token');
      fetch('http://localhost:8181/api/auth/getMyDetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      }).then((res) => res.json())
        .then((res) => {
          setImageURI(res.imageURI);
        })
    }
    getMyDetails();
  }, [])
  

  return (
    <nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button onClick={toggleHamburger} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex-shrink-0 flex items-center">
          <img className="block lg:hidden h-8 w-auto" src="https://rbtstudyguide.com/wp-content/uploads/2019/07/Logo-copy.png" alt="Workflow"/>
          <img className="hidden lg:block h-9 w-15" src="https://rbtstudyguide.com/wp-content/uploads/2019/07/Logo-copy.png" alt="Workflow"/>
        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            {props.active === 'dashboard' ? <Link to={'/'} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</Link>
            :
            <Link to={'/'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            }

            {props.active === 'challenge' ? <Link to={'/challenge'} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Challenge</Link>
            :
            <Link to={'/challenge'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Challenge</Link>
            }

                        
            {props.active === 'mychallanges' ? <Link to={'/mychallenges'} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">My Challenges</Link>
            :
            <Link to={'/mychallenges'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Challenges</Link>
            }

            {props.active === 'practice' ? <Link to={'/practice'} className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Practice</Link>
            :
            <Link to={'/practice'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Practice</Link>
            }

            {/* <a to={'/'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Challenge</a>

            <a to={'/'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Practice</a> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <div className="ml-3 relative">
          <div>
            <button onClick={toggleNavMenu} type="button" className="transition-all duration-200 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src={imageURI} alt=""/>
            </button>
          </div>

          <OutsideClickHandler
            onOutsideClick={() => { 
                if (document.getElementById('nav-options').style.display === 'block') {
                    toggleNavMenu();
                }
            }} >
          <div id='nav-options' style={{display: 'none'}} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

            <Link to={'/myprofile'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
            <a href={'/'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
            <p onClick={handleLogout} className="outline-none border-none cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</p>
          </div>
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  </div>


  <div style={{display: 'none'}} className="sm:hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1">

      <a href={'/'} className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

      <a href={'/'} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

      <a href={'/'} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

      <a href={'/'} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>
  )
}

export default Navbar