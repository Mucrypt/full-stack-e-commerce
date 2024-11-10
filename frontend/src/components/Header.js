import React, { useState, useContext } from 'react';
import Logo from './Logo';
import { FaSearch, FaShoppingCart, FaSun, FaMoon } from 'react-icons/fa';
import { WiSunset } from 'react-icons/wi';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { useTheme } from '../ThemeContext';

function Header() {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const { theme, toggleTheme } = useTheme();
  const searchInput = useLocation();
  
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      navigate("/");
      dispatch(setUserDetails(null));
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="h-16 shadow-md z-40 fixed w-full" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        <div>
          <Link to="/">
            <Logo w={80} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm  rounded-full focus-within:shadow pl-2" style={{ borderColor: 'var(--color-border)' }}>
          <input onChange={handleSearch}
            value={search}
            className="w-full outline-none"
            type="text"
            placeholder="Search Product here...."
            style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
          />
          <div
            className="text-lg min-w-[50px] h-10 flex items-center justify-center rounded-r-full"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
          >
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay(prev => !prev)}
                style={{ color: 'var(--color-text)' }}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bottom-0 top-11 h-fit p-2 flex gap-4 shadow-lg rounded" style={{ backgroundColor: 'var(--color-background)' }}>
                <nav className="flex gap-4">
                  {user?.role === ROLE.ADMIN && (
                    <>
                      <Link
                        to="/admin-panel/all-products"
                        className="whitespace-nowrap hover:bg-slate-100 p-2 rounded"
                        onClick={() => setMenuDisplay(false)}
                        style={{ color: 'var(--color-text)' }}
                      >
                        Admin Panel
                      </Link>
                      <Link 
                        to="/order"  
                        className="whitespace-nowrap hover:bg-slate-100 p-2 rounded"
                        onClick={() => setMenuDisplay(false)}
                        style={{ color: 'var(--color-text)' }}
                      >
                        Orders Page
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to="/Cart" className="text-2xl relative" style={{ color: 'var(--color-text)' }}>
              <span><FaShoppingCart /></span>
              <div
                className="w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
              >
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-4">
            {user?._id && (
              <div
                onClick={toggleTheme}
                className="cursor-pointer text-2xl transition-colors"
                style={{ color: 'var(--color-text)' }}
              >
                {theme === 'light' ? <FaMoon /> : theme === 'dark' ? <FaSun /> : <WiSunset />}
              </div>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
