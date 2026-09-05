
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { FaBoxOpen, FaUsers, FaLayerGroup, FaClipboardList } from "react-icons/fa"


const AdminDashboard = () => {

    const {products,categories,testuser} = useContext(AppContext)
    const customers = testuser.filter(user => user.role === "user");

    return (

        <div className='p-6 w-full'>

            <h1 className='text-3xl font-bold text-[#00354B] mb-8'>
                Dashboard Overview
            </h1>

            {/* cards */}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

                {/* products */}

                <div className='bg-white shadow rounded-xl p-5 border-l-4 border-[#00354B]'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500 text-sm'>
                                Total Products
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {products.length}
                            </h2>

                        </div>

                        <FaBoxOpen className='text-3xl text-[#00354B]' />

                    </div>

                </div>

                {/* categories */}

                <div className='bg-white shadow rounded-xl p-5 border-l-4 border-green-500'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500 text-sm'>
                                Categories
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {categories.length}
                            </h2>

                        </div>

                        <FaLayerGroup className='text-3xl text-green-500' />

                    </div>

                </div>

                {/* users */}

                <div className='bg-white shadow rounded-xl p-5 border-l-4 border-orange-500'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500 text-sm'>
                                Customers
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                {customers.length}
                            </h2>

                        </div>

                        <FaUsers className='text-3xl text-orange-500' />

                    </div>

                </div>

                {/* orders */}

                <div className='bg-white shadow rounded-xl p-5 border-l-4 border-red-500'>

                    <div className='flex justify-between items-center'>

                        <div>

                            <p className='text-gray-500 text-sm'>
                                Orders
                            </p>

                            <h2 className='text-3xl font-bold mt-2'>
                                0
                            </h2>

                        </div>

                        <FaClipboardList className='text-3xl text-red-500' />

                    </div>

                </div>

            </div>

            {/* recent users */}

            <div className='bg-white shadow rounded-xl p-6 mt-10'>

                <h2 className='text-xl font-semibold mb-5 text-[#00354B]'>
                    Recent Customers
                </h2>

                <div className='overflow-x-auto'>

                    <table className='w-full text-left'>

                        <thead>

                            <tr className='border-b'>

                                <th className='py-3'>Name</th>
                                <th>Email</th>
                                <th>Phone</th>

                            </tr>

                        </thead>

                        <tbody>

                          {customers.slice(0, 5).map((user) => (

                                <tr
                                    key={user._id}
                                    className='border-b hover:bg-gray-50'
                                >

                                    <td className='py-4'>
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>
                                        {user.phone}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default AdminDashboard