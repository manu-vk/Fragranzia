import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminSidebar = () => {
    const location = useLocation()
    const navItems = [
        { path: '/admin-dashboard', label: 'Dashboard', icon: assets.dashboardIcon },
        { path: '/admin-products', label: 'Products', icon: assets.productsIcon },
        { path: '/admin-categories', label: 'Categories', icon: assets.categoriesIcon },
        { path: '/admin-customers', label: 'Customers', icon: assets.customersIcon },
        { path: '/admin-orders', label: 'Orders', icon: assets.ordersIcon },
        { path: '/', label: 'Home', icon: assets.homeIcon }
    ]

    const handleLogout = () => {
        console.log('Logging out...')
    }

    return (
        <div className='bg-white rounded-2xl shadow-sm p-4 w-64'>
            <div className='mb-4 p-2 border-b'>
                <h2 className='text-lg font-semibold'>Dashboard</h2>
            </div>
            <div className='flex flex-col gap-2'>
                {navItems.map((item) => (
                    <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-blue-50 text-primary font-medium border-l-4 border-primary' : 'hover:bg-gray-50 text-gray-700'}`}>
                        {item.icon && <img src={item.icon} alt={item.label} className="w-5 h-5" />}
                        <span>{item.label}</span>
                    </Link>
                ))}

                <div className='border-t mt-2 pt-2'>
                    <button onClick={handleLogout} className='w-full p-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors'>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar