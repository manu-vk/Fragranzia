
import { Outlet } from 'react-router-dom'
import AdminSidebar from "../components/adminComponents/AdminSidebar.jsx";

const AdminLayouts = () => {

  return (

    <div className='flex min-h-screen p-6 gap-6'>

      <AdminSidebar />

      <div className='flex-1'>

        <Outlet />

      </div>

    </div>

  )
}

export default AdminLayouts