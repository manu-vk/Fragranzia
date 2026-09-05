// import React from 'react'
// import Layouts from '../../layouts/Layouts'
// import { Outlet } from 'react-router-dom'

// const UserProtect = () => {
//   return (
//    <Layouts>
//     <Outlet/>
//    </Layouts>
//   )
// }

// export default UserProtect
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import Layouts from '../../layouts/Layouts';

// const UserProtect = () => {
//   const token = localStorage.getItem('token');

//   return token ? (
//     <Layouts>
//       <Outlet />
//     </Layouts>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default UserProtect;
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import Layouts from '../../layouts/Layouts';

// const UserProtect = () => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <Layouts>
//       <Outlet />
//     </Layouts>
//   );
// };

// export default UserProtect;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtect = () => {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtect;