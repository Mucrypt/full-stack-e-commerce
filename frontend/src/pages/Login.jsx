import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common'; // Adjust the path if needed
import Context from '../context';
import { useTheme } from '../ThemeContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const { theme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.Login.url, {
        method: SummaryApi.Login.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const responseData = await dataResponse.json();
      if (responseData.success) {
        toast.success('Login successful');
        navigate('/');
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(responseData.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4 pt-10">
        <div
          className="p-8 w-full max-w-md mx-auto rounded shadow"
          style={{
            backgroundColor: `var(--color-background)`,
            color: `var(--color-text)`,
          }}
        >
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-5 flex-col gap-8" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div
                className="p-2 rounded"
                style={{
                  backgroundColor: `var(--color-border)`,
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full h-full outline-none"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid">
              <label>Password:</label>
              <div
                className="p-2 flex rounded"
                style={{
                  backgroundColor: `var(--color-border)`,
                }}
              >
                <input
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="bg-transparent w-full h-full outline-none"
                  required
                />
                <div className="cursor-pointer">
                  <span>
                    {showPassword ? (
                      <FaEye onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaEyeSlash onClick={() => setShowPassword(true)} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/ForgotPassword"
              className="block w-fit ml-auto hover:underline mt-2"
              style={{ color: `var(--color-primary)` }}
            >
              Forgot Password?
            </Link>

            <button
              className="w-full max-w-[150px] mx-auto block mt-4 px-6 py-2 rounded-full transition-all hover:scale-110"
              style={{
                backgroundColor: `var(--color-primary)`,
                color: `var(--color-background)`,
              }}
            >
              Login
            </button>
          </form>

          <p className="p-3">
            Don't have an account?{' '}
            <Link
              to="/Register"
              className="hover:underline"
              style={{
                color: `var(--color-primary)`,
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
