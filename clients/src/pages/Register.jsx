import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Register = () => {

  const { adduser, testuser } = useContext(AppContext);

  // const[formData,setFormdata]=useState({
  //   name:'',
  //   email:'',
  //   password:''
  // })
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password
    }
    await adduser(userData);
    setName('');
    setEmail('');
    setPassword('')
  }


  return (
    <div className="min-h-screen flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl overflow-hidden">
        <div className="hidden lg:block">
          <div className="h-full registerImgArea rounded-[10px_200px_10px_200px]">
            <div className="h-full flex flex-col items-center justify-center text-center text-white bg-black/60 rounded-[10px_200px_10px_200px] px-14">
              <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
              <p className="text-base opacity-90 max-w-md">Glad to see you again! Access your <br /> account to explore more</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-8 sm:px-14 py-14 w-full">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 border-2 border-black py-3 rounded w-full cursor-pointer">
              <img src={assets.googleAuthIcon} alt="" className="w-6 h-6" />Google
            </button>
            <button className="flex items-center justify-center gap-3 border-2 border-black py-3 rounded w-full cursor-pointer">
              <img src={assets.facebookAuthIcon} alt="" className="w-6 h-6" />Facebook
            </button>
          </div>

          <div className="flex items-center my-1 text-sm text-gray-600">
            <div className="flex-1 border-b border-gray-400" />
            <span className="mx-4">Or sign in with email</span>
            <div className="flex-1 border-b border-gray-400" />
          </div>
          {/* onSubmit={handlesubmit} */}
          <form onSubmit={handlesubmit}>
            <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
              <img src={assets.authUserIcon} alt="" className="w-6 h-6" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your username" className="bg-transparent outline-none w-full" />
            </div>
            <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
              <img src={assets.authEmailIcon} alt="" className="w-6 h-6" />
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your E - Mail" className="bg-transparent outline-none w-full" />
            </div>
            <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
              <img src={assets.authLockIcon} alt="" className="w-6 h-6" />
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="bg-transparent outline-none w-full" />
            </div>
            {/* <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
              <img src={assets.authLockIcon} alt="" className="w-6 h-6" />
              <input type="text" placeholder="Confirm your password" className="bg-transparent outline-none w-full" />
            </div> */}


            <div className='flex items-center gap-2'>
              <input type="checkbox" className='w-4 h-4 accent-primary' />
              <p>Agree with Terms & Conditions</p>
            </div>

            <button type='submit' className="bg-primary text-white w-full py-4 rounded text-lg font-medium hover:opacity-90 transition cursor-pointer">Sign Up</button>
          </form>

          <p className="text-center text-base mt-6">Already have an account?<Link to="/login" className="font-semibold cursor-pointer ml-1">
            Sign In
          </Link></p>
        </div>

      </div>
    </div>
  )
}

export default Register
