import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Customers = () => {

    const { testuser } = useContext(AppContext)

    // Filter out admin users - only show regular customers
    const customers = testuser.filter(
        user => !user.isAdmin && user.role !== 'admin'
    )

    return (
        <div className='p-6 w-full'>

            <h1 className='text-3xl font-bold text-[#00354B] mb-8'>
                Customers
            </h1>

            <div className='bg-white rounded-xl shadow overflow-x-auto'>

                {customers.length === 0 ? (
                    <div className='p-8 text-center text-gray-500'>
                        <p>No customers found</p>
                    </div>
                ) : (
                    <table className='w-full text-left'>

                        <thead className='bg-[#00354B] text-white'>
                            <tr>
                                <th className='p-4'>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Last Seen</th>
                                <th>Joined</th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map((user) => (
                                <tr
                                    key={user._id}
                                    className='border-b hover:bg-gray-50'
                                >
                                    <td className='p-4'>
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>
                                        {user.phone || '-'}
                                    </td>

                                    <td>
                                        {user.isOnline ? (
                                            <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm'>
                                                🟢 Online
                                            </span>
                                        ) : (
                                            <span className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'>
                                                ⚫ Offline
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        {user.lastSeen
                                            ? new Date(
                                                user.lastSeen
                                              ).toLocaleString()
                                            : '-'}
                                    </td>

                                    <td>
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}

            </div>

        </div>
    )
}

export default Customers