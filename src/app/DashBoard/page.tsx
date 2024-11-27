'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Dashboard = () => {
  const router = useRouter()

  function ViewLoan(){
    router.push('/components/ViewLoan')
  }

  function ViewUsers(){
    
    router.push('/components/ViewUsers')


  }

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 px-4">
       
        <h1 className="font-bold text-3xl text-center bg-white py-4 border-b-2 border-blue-300">
            Admin Dashboard
        </h1>
        
        
        <nav className="mt-6 text-center">
            
            <button  onClick={ViewLoan} className="ml-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                View Loan
            </button>

            <button onClick={ViewUsers}  className=" ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" >
                View Users
            </button>
        </nav>
    </div>
  )
}

export default Dashboard
