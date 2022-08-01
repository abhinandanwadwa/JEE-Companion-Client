import React from 'react'

const Alert = (props) => {
  return (
    <>
    <div id="alert-additional-content-2" className="absolute flex md:right-0 md:w-[33%] w-[100%] justify-center p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
  <div className="flex items-center">
    <svg aria-hidden="true" className="mr-2 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <span className="sr-only">Info</span>
    {!props.message ? <h3 className="text-lg font-medium text-red-700 dark:text-red-800">Invalid Credentials</h3>: <h3 className="text-lg font-medium text-red-700 dark:text-red-800">{props.message}</h3>}
  </div>
</div>
    </>
  )
}

export default Alert