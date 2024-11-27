'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


type Loan = {
  loanId: number;
  loanDate: string;  
  loanAmount: number;
  loanType: string;  // Enum value as string
  loanStatus: string; // Enum value as string
  paybackPeriod: number;
  interestRate: number;
  monthlyInstallment: number;
  monthsLeft: number;
  email: string;
};

const Page = () => {
  // State to hold the loan data
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // To handle loading state
  const [error, setError] = useState<string>('');  // To handle errors
  const [filterPending, setFilterPending] = useState<boolean>(false);  // State for filter
  const router = useRouter();

  function LoanAction(){

  }

  // Fetch loan data on component mount
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('https://distinguished-happiness-production.up.railway.app/admin/getLoans');
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }
        const data: Loan[] = await response.json();
        setLoans(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || 'An error occurred');
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  // Filter loans based on filter state
  const filteredLoans = filterPending
    ? loans.filter((loan) => loan.loanStatus === 'PENDING')
    : loans;

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">View Loans</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">View Loans</h1>
      
      {error && <p className="text-red-500">{error}</p>}  {/* Display error message if any */}

      {/* Filter button */}
      <div className="mb-4 text-right">
        <button
          onClick={() => setFilterPending(!filterPending)}  // Toggle filter
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {filterPending ? 'Show All Loans' : 'Show Pending Loans'}
        </button>
      </div>

      {filteredLoans.length === 0 ? (
        <p>No loans available</p>
      ) : (
        <div className="overflow-x-auto bg-gray-50 shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border-b text-left">Loan ID</th>
                <th className="px-4 py-2 border-b text-left">Loan Date</th>
                <th className="px-4 py-2 border-b text-left">Amount</th>
                <th className="px-4 py-2 border-b text-left">Type</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Payback Period</th>
                <th className="px-4 py-2 border-b text-left">Interest Rate</th>
                <th className="px-4 py-2 border-b text-left">Monthly Installment</th>
                <th className="px-4 py-2 border-b text-left">Months Left</th>
                <th className="px-4 py-2 border-b text-left">Email</th>
                <th onClick={LoanAction}  className="px-4 py-2 border-b text-left">Action</th>  {/* Added Action button */}
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.loanId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{loan.loanId}</td>
                  <td className="px-4 py-2 border-b">{loan.loanDate}</td>
                  <td className="px-4 py-2 border-b">{loan.loanAmount}</td>
                  <td className="px-4 py-2 border-b">{loan.loanType}</td>
                  <td className="px-4 py-2 border-b">{loan.loanStatus}</td>
                  <td className="px-4 py-2 border-b">{loan.paybackPeriod}</td>
                  <td className="px-4 py-2 border-b">{loan.interestRate}%</td>
                  <td className="px-4 py-2 border-b">{loan.monthlyInstallment}</td>
                  <td className="px-4 py-2 border-b">{loan.monthsLeft}</td>
                  <td className="px-4 py-2 border-b">{loan.email}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Home button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push("/DashBoard")}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Page;
