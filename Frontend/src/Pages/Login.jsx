import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';

function Login({onLoginSuccess}) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = loginInfo;

  if (!email || !password) {
    return handleError('Email & password are required');
  }

  try {
    const url = 'http://localhost:8082/auth/login';

    const { data: result } = await axios.post(url, loginInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { success, message, jwtToken, name, error } = result;

    if (success) {
      handleSuccess(message);
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('loggedInUser', name);
      onLoginSuccess();
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } 
    else if (error) {
      const details = error?.details?.[0]?.message;
      handleError(details || error);
    } 
    else {
      handleError('Login failed. Please try again.');
    }

  } catch (err) {
    handleError('Incorrect email or Password');
  }
};

  const navigate = useNavigate();
  const goToSignup = () => {
    navigate('/signup');
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
          JobQuest
        </h1>
        <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
          Login
        </h2>

        <form className="max-w-md mx-auto p-6 bg-gray-50 rounded-md shadow-md space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-left text-gray-700 text-sm font-medium mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={loginInfo.email}
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
              id="password"
              type="password"
              name='password'
              onChange={handleChange}
              value={loginInfo.password}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-sm text-sm transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{' '}
          <span   onClick={goToSignup} className="text-blue-600 hover:underline font-semibold cursor-pointer">
            Signup
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login