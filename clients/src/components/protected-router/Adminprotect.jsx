// import React from 'react'
// import AdminLayouts from '../../layouts/AdminLayouts'
// import { Outlet } from 'react-router-dom'

// const AdminProtect = () => {
//   return (
//   <AdminLayouts>
//     <Outlet/>
//   </AdminLayouts>
//   )
// }

// export default AdminProtect
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtect = () => {

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    // not logged in
    if (!token) {
        return <Navigate to="/login" />
    }

    // not admin
    if (!user?.isAdmin) {
        return <Navigate to="/" />
    }

    // admin access
    return <Outlet />
}

export default AdminProtect