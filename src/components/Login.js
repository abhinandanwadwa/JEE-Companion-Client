import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Alert from './Alert';
import Googlelogin from './Googlelogin';

const Login = () => {
    
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('auth-token')) {
        navigate('/');
      }
      // eslint-disable-next-line
    }, [])

    const loginHandler = async () => {
        fetch('http://localhost:8181/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                if (data.error === 'Invalid Credentials') {
                    setInvalidCredentials(true);
                }
            }
            else if (data.authtoken) {
                localStorage.setItem('auth-token', data.authtoken);
                setInvalidCredentials(false);
                navigate('/');
            }
        })
        .catch((error) => {
        console.error('Error:', error);
    });
    }




    // function onSignIn(googleUser) {
    //     var profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //     alert("Hi!!")
    // }



  return (
    <>
    {invalidCredentials && <Alert />}
    <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="thisisme hidden bg-cover lg:block lg:w-2/3">
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">JEE Companion</h2>
                        
                        <p className="max-w-xl mt-3 text-gray-300">Join the community where JEE Aspirants compete with each other to practice as much as they can to make their way to the top IIT's of India and to get on the top of the leaderboard and on the All India Rank List.</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">JEE Companion</h2>
                        
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                    </div>

                    <div className="mt-8 mb-5">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" value={email} placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    <a href="/" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                </div>

                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={loginHandler}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign in
                                </button>
                            </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <Link to={'/signup'} className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link>.</p>
                    </div>
                    {/* <div class="g-signin2" data-width="220" data-height="45" data-longtitle="true"></div> */}
                    <Googlelogin />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login