import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import ProductPage from './pages/ProductPage'
import { Toaster } from 'react-hot-toast'
import AboutPage from './pages/AboutPage'
import Cart from './pages/Cart'
import CheckoutPage from './pages/CheckoutPage'
import Login from './pages/Login'
import ProductView from './pages/ProductView'
import PaymentPage from './pages/PaymentPage'
import ProfilePage from './pages/profilepages/ProfilePage'
import { SuccessStatus, ErrorStatus } from "./components/OrderStatus"
import GiftingPage from './pages/GiftingPage'
import Layouts from './layouts/Layouts'
import OrdersHistory from './pages/profilepages/OrdersHistory'
import ProfileLayouts from './layouts/ProfileLayouts'
import WishlistPage from './pages/profilepages/WishlistPage'
import AddressPage from './pages/profilepages/AddressPage'

import AdminLayouts from './layouts/AdminLayouts'
import AdminDashboard from './pages/adminpages/AdminDashboard'
import AdminProducts from './pages/adminpages/AdminProducts'
import AdminCategories from './pages/adminpages/AdminCategories'
import AdminCustomers from './pages/adminpages/AdminCustomers'
import AdminOrdersPage from './pages/adminpages/AdminOrdersPage'
import UserProtect from "./components/protected-router/Userprotect.jsx";
import DefaultProtect from "./components/protected-router/Defaultprotect.jsx";
import AdminProtect from './components/protected-router/adminprotect'

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Layouts />}>
          {/* Public pages */}
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductView />} />
          <Route path="/gifting" element={<GiftingPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected pages */}
          <Route element={<UserProtect />}>
            <Route path="/products/quick/:id" element={<PaymentPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Profile pages */}
            <Route element={<ProfileLayouts />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders-history" element={<OrdersHistory />} />
              <Route path="/address" element={<AddressPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Route>
          </Route>
        </Route>


        <Route element={<AdminProtect />}>

          <Route element={<AdminLayouts />}>

            <Route
              path='/admin-dashboard'
              element={<AdminDashboard />}
            />

            <Route
              path='/admin-products'
              element={<AdminProducts />}
            />

            <Route
              path='/admin-categories'
              element={<AdminCategories />}
            />

            <Route
              path='/admin-customers'
              element={<AdminCustomers />}
            />

            <Route
              path='/admin-orders'
              element={<AdminOrdersPage />}
            />

          </Route>

        </Route>

        <Route element={<DefaultProtect />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/order-success" element={<SuccessStatus />} />
        <Route path="/order-failed" element={<ErrorStatus />} />


      </Routes>

    </>
  )
}

export default App
