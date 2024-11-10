import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { useTheme } from '../ThemeContext';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access theme context

  useEffect(() => {
    if (user && user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="min-h-full w-full max-w-60 customShadow p-4" 
             style={{ backgroundColor: `var(--color-background)`, color: `var(--color-text)` }}>
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt={user?.name} />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
        </div>

        {/*** Navigation Links ***/}
        <nav className="grid p-4">
          <Link to={'all-users'} className="px-2 py-1 hover:bg-slate-100" 
                style={{ backgroundColor: `var(--color-background)`, color: `var(--color-text)` }}>
            All Users
          </Link>
          <Link to={'all-products'} className="px-2 py-1 hover:bg-slate-100" 
                style={{ backgroundColor: `var(--color-background)`, color: `var(--color-text)` }}>
            All Products
          </Link>
          <Link to={'books'} className="px-2 py-1 hover:bg-slate-100" 
                style={{ backgroundColor: `var(--color-background)`, color: `var(--color-text)` }}>
            All Books
          </Link>
        </nav>
      </aside>

      <main className="w-full h-full p-2" style={{ backgroundColor: `var(--color-background)`, color: `var(--color-text)` }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
