import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common'; // Adjust the path if needed
import { toast } from 'react-toastify';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  });

  const navigate = useNavigate();

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const dataResponse = await fetch(SummaryApi.Register.url, {
        method: SummaryApi.Register.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await dataResponse.json();
  
      if (!dataResponse.ok) {
        // Check if the error is related to user existence
        if (dataResponse.status === 400 && responseData.message === 'User already exists') {
          toast.error('User already exists. Please login or use a different email.');
        } else {
          // Handle other types of errors
          toast.error('Registration failed');
        }
        return;
      }
  
      // If registration is successful
      if (responseData.success) {
        toast.success(responseData.message);
        navigate('/Login');
      }
  
    } catch (error) {
      
      toast.error('Failed to register. Please try again later.');
      console.error('Error:', error);
    }
  };
  

  return (
    <section id='login'>
      <div className='mx-auto container p-4 pt-10'>
        <div className='bg-white p-8 w-full max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic ? data.profilePic : loginIcons} alt='login icons' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-slate-200 pb-5 pt-2 text-center cursor-pointer absolute bottom-0 w-full bg-opacity-50'>
                  Upload Picture
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-5 flex-col gap-8' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  required
                  className='bg-transparent w-full h-full outline-none'
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  required
                  className='bg-transparent w-full h-full outline-none'
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  name='password'
                  required
                  value={data.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='bg-transparent w-full outline-none'
                />
                <div className='cursor-pointer'>
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

            <div>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  name='confirmPassword'
                  required
                  value={data.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm your password'
                  className='bg-transparent w-full outline-none'
                />
                <div className='cursor-pointer'>
                  <span>
                    {showConfirmPassword ? (
                      <FaEye onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                      <FaEyeSlash onClick={() => setShowConfirmPassword(true)} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-red-500 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>
              Register
            </button>
          </form>

          <p className='p-3'>
            Already have an account?{' '}
            <Link to='/Login' className='text-red-500 hover:underline hover:text-red-700'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
