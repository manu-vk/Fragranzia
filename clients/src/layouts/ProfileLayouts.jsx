// ProfileLayouts.jsx
import { Outlet } from 'react-router-dom'
import ProfileSideBar from '../components/profileComponents/ProfileSideBar'

export default function ProfileLayouts() {
  return (
    <div className="flex gap-6">
      <ProfileSideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}