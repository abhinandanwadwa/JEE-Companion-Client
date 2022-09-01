import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Alert from './Alert';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alreadyExists, setAlreadyExists] = useState(false);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fNameError, setfNameError] = useState(false);
    const [lNameError, setLNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    
    const navigate = useNavigate();
    let backgroundColorCode;

    useEffect(() => {
      if (localStorage.getItem('auth-token')) {
        navigate('/');
      }
      // eslint-disable-next-line
    }, [])

    const loginHandler = async () => {
        if (password === confirmPassword) {
            const backgroundColorForImgOptions = ['0D8ABC', 'b63838', '4c63c1', 'c3417c', 'c39941', 'b8c341' ,'61c341', '41c3a6', '4182c3', 'c2c82a'];

            const randomCode = Math.floor((Math.random() * 10) + 1);
            console.log(`The Random Code is: ${randomCode - 1}`);

            backgroundColorCode = backgroundColorForImgOptions[randomCode];
            console.log(`The background Color Code is: ${backgroundColorCode}`);
            
            const imageURI = `https://ui-avatars.com/api/?name=${fName + " " + lName}&background=${backgroundColorCode}`;
            console.log(`The Image URI is: ${imageURI}`);
            
            setConfirmPasswordError(false);
            fetch('http://localhost:8181/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fname: fName, lname: lName, email: email, password: password, imageURI: imageURI }),
            })
            .then((response) => response.json())
            .then(data => {
                if (data.error) {
                    if (data.error === "A User with this email address already exists") {
                        setAlreadyExists(true);
                    }
                }
                else if (data.errors) {
                    setfNameError(false);
                    setLNameError(false);
                    setEmailError(false);
                    setPasswordError(false);


                    data.errors.forEach(element => {
                        if (element.param === 'fname') {
                            setfNameError(true);
                        }
                        else if (element.param === 'lname') {
                            setLNameError(true);
                        }
                        else if (element.param === 'email') {
                            setEmailError(true);
                        }
                        else if (element.param === 'password') {
                            setPasswordError(true);
                        }
                    });
                }
                else {
                    setAlreadyExists(false);
                    localStorage.setItem('auth-token', data.authtoken);
                    setfNameError(false);
                    setLNameError(false);
                    setEmailError(false);
                    setPasswordError(false);
                    navigate('/')
                }
            })
            .catch((error) => {
            console.error('Error:', error);
           });
        }
        else {
            if (password.length >= 6) {
                setPasswordError(false);
            }
            setConfirmPasswordError(true);
        }
    }

  return (
    <>
    {alreadyExists && <Alert message={"Sorry, a user with this email id already exists"} />}
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
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Register to get started on your journey to IIT's.</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="fname" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                <input onChange={(e) => setFName(e.target.value)} type="text" name="fname" id="fname" value={fName} placeholder="John" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {fNameError && <small className='text-red-400'>Your First Name Should Be At Least 4 Character Long</small>}
                            </div>
                            
                            <div className='md:mt-6 mt-3'>
                                <label htmlFor="lname" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                                <input onChange={(e) => setLName(e.target.value)} type="text" name="lname" id="lname" value={lName} placeholder="Doe" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {lNameError && <small className='text-red-400'>Your Last Name Should Be At Least 3 Character Long</small>}
                            </div>

                            <div className='md:mt-6 mt-3'>
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" value={email} placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {emailError && <small className='text-red-400'>Please Enter a Vaild Email</small>}
                            </div>

                            <div className="md:mt-6 mt-3">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                </div>

                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {passwordError && <small className='text-red-400'>Password Should Be At Least 6 Characters Long</small>}
                            </div>

                            <div className="md:mt-6 mt-3">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
                                </div>

                                <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" name="cpassword" id="cpassword" placeholder="Confirm Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {confirmPasswordError && <small className='text-red-400'>Password And Confirm Password Should Match</small>}
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={loginHandler}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Sign in
                                </button>
                            </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <Link to={'/login'} className="text-blue-500 focus:outline-none focus:underline hover:underline">Login</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup