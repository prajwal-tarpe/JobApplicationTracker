import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const {name,value} = e.target;
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }
  const handleSignup = async (e) => {
  e.preventDefault();
  const { name, email, password } = signupInfo;

  if (!name || !email || !password) {
    return handleError('Name, email & password are required');
  }

  try {
    const url = 'http://localhost:8082/auth/signup';
    const { data: result } = await axios.post(url, signupInfo);

    const { success, message, error } = result;

    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else if (error) {
      const details = error?.details?.[0]?.message;
      console.log(error);
      handleError(details || error);
    } else {
      handleError('Signup failed. Please try again.');
    }

  } catch (err) {
    handleError(err.response?.data?.message || err.message);
  }
};


  const navigate = useNavigate()
  const goToLogin = () => {
    navigate('/login')
  }

  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
          JobQuest
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="max-w-md mx-auto p-6 bg-gray-50 rounded-md shadow-md space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-left text-gray-700 text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              onChange={handleChange}
              id="name"
              type="text"
              name="name"
              value={signupInfo.name}
              placeholder="Your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-left text-gray-700 text-sm font-medium mb-1"
            >
              Email Address
            </label>
            <input
              onChange={handleChange}
              name='email'
              value={signupInfo.email}
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-left text-gray-700 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              name='password'
              value={signupInfo.password}
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="Enter a strong password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-sm text-sm transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <span
            onClick={goToLogin}
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup