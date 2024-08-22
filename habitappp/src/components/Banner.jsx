import React, { useEffect, useState } from 'react'

export const Banner = () => {


  const [showBanner, setShowBanner] = useState( () => {
    const localData = localStorage.getItem('pageBanner');
    return localData ? JSON.parse(localData) : true;
});


  useEffect(() => {
    localStorage.setItem("pageBanner", JSON.stringify(showBanner))
  }, [showBanner])
  

 


  return (


<div>
{showBanner && (

<div  tabindex="-1" className="bg-gradient-to-r from-red-500 to-red-700 fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
    <div class="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
        <h3 class="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600">
            <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Consistency is key
            </span>
        </h3>
        <p class="flex items-center text-sm font-normal text-zinc-50">
        <ol className='font-semibold  max-w-md space-y-1 list-decimal list-inside'>
          <li >
          First pick a habit you want to focus on.
          </li>
          <li>
          Each day once completed click on that date to add a red X.
          </li>
          <li>
          Don't break the chain.
          </li>
         </ol>
        </p>
    </div>
    <div class="flex items-center flex-shrink-0">
        <a href="https://jamesclear.com/stop-procrastinating-seinfeld-strategy" class="px-5 py-2 me-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Learn more
        </a>
        <button 
        onClick={() => setShowBanner(false)}
        data-dismiss-target="#marketing-banner" type="button" class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-white-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Hide</span>
        </button>
    </div>
  </div>
)}

</div>

  )
}
