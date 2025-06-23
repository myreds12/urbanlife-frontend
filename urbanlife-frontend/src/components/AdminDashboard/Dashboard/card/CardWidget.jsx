
export default function CardWidget() {
       return(
              <>
              <div className="grid grid-cols-4 h-full gap-5">
              <div className="flex flex-col col-span-2 justify-between h-full rounded-2xl border border-gray-200 bg-white">
                     <div className="flex justify-between items-center p-5">
                            {/* icon */}
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                                   <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                   </svg>
                            </div>
                            <span className="flex items-center text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                   <svg
                                   className="w-4 h-4 mr-1"
                                   fill="none"
                                   stroke="currentColor"
                                   viewBox="0 0 24 24"
                                   strokeWidth="2"
                                   >
                                   <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                                   />
                                   </svg>
                                   11.01%
                            </span>                     
                     </div>

                     <div className="flex flex-col items-center ">
                            <span className="text-md text-gray-500 dark:text-gray-400">Customers</span>
                            <h4 className="text-3xl font-bold text-gray-800">5,359</h4>
                     </div>
                     
                     <div className="flex flex-col items-center justify-items-end py-2 mt-5 bg-gray-100 w-full rounded-b-2xl">
                            <span className="text-sm text-gray-500 dark:text-gray-400">From last month</span>
                     </div>
              </div>


              <div className="flex flex-col col-span-2 justify-between h-full rounded-2xl border border-gray-200 bg-white">
                     <div className="flex justify-between items-center p-5">
                     {/* icon */}
                     <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                   <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                                   <polyline points="3.29 7 12 12 20.71 7" />
                                   <line x1="12" y1="22" x2="12" y2="12" />
                            </svg>
                     </div>

                     <span className="flex items-center text-sm text-red-600 bg-red-100 px-2 py-1 rounded-xl">
                            <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                            </svg>
                            9.05%
                     </span>
                     </div>

                     <div className="flex flex-col items-center ">
                            <span className="text-md text-gray-500 dark:text-gray-400">Orders</span>
                            <h4 className="text-3xl font-bold text-gray-800">5,359</h4>
                     </div>
                     
                     <div className="flex flex-col items-center justify-items-end py-2 mt-5 bg-gray-100 w-full rounded-b-2xl">
                            <span className="text-sm text-gray-500 dark:text-gray-400">From last month</span>
                     </div>
              </div>
              </div>

              </>





       );
}