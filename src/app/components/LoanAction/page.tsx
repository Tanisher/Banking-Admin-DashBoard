/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LoanDataDTO {
  loanId: number;
  email: string;
  amount: number;
  payback: number;
  loanType: string;
}

const LoanAction = () => {
  const searchParams = useSearchParams();
  const loanId = searchParams.get('loanId');
  const email = searchParams.get('email');

  const [loanDetails, setLoanDetails] = useState<LoanDataDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);



  async function ApproveLoan(): Promise<string> {
    const url = `https://distinguished-happiness-production.up.railway.app/admin/acceptLoan/${loanId}`; // Replace with your actual API base URL
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to approve loan');
      }
  
      const result = await response.text(); // Assuming the response is plain text
      console.log('Loan approved successfully:', result);
      return result;
    } catch (error) {
      console.error('Error approving loan:', error);
      throw error; // Re-throw for further handling if needed
    }
  }
  

  function DeclineLoan(){

  }

  function AccountInfo(){
    
  }

  useEffect(() => {
    const fetchLoan = async () => {
      if (!loanId || !email) {
        setError("Missing loanId or email in the query parameters.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://distinguished-happiness-production.up.railway.app/admin/loans?loanId=${loanId}&email=${email}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: LoanDataDTO = await response.json();
        setLoanDetails(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch loan details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [loanId, email]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Loan Details</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && (
        <p className="text-center text-red-500">
          Error: {error}
        </p>
      )}

      {loanDetails && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Loan ID:</span> {loanDetails.loanId}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Email:</span> {loanDetails.email}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Amount:</span> ${loanDetails.amount.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Payback Period:</span> {loanDetails.payback} months
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Loan Type:</span> {loanDetails.loanType}
          </p>
        </div>
      )}

      <button onClick={ApproveLoan} className='font-extrabold ml-5 '>APPROVE</button>
      <button onClick={DeclineLoan} className='justify-center ml-5 font-extrabold'>DECLINE</button>
      <button onClick={AccountInfo} className='ml-5 font-extrabold'>ACCOUNT INFORMATION</button>

      <div className='justify-center'>


      </div>
    </div>
  );
};

export default LoanAction;
