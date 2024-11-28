/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

interface Customer {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: string;
  password: string;
  localDate: string; // Format this as needed
}

const Page = () => {
  const [users, setUsers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://distinguished-happiness-production.up.railway.app/admin/getUsers/');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: Customer[] = await response.json();
        setUsers(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Users List</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && (
        <p className="text-center text-red-500">
          Error: {error}
        </p>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        {users.length > 0 ? (
          <table className="min-w-full text-left table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Surname</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.surname}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.gender}</td>
                  <td className="py-2 px-4">{user.localDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
