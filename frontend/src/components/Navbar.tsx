// src/components/Navbar.tsx

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const { seller } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full bg-sis-light shadow-sm sticky top-0 z-50">
      <div className="max-container flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-1 leading-tight">
          <span className="text-sis-purple">Sell</span>
          <span className="text-sis-pink">This</span>
          <span className="text-sis-coral">, Sis</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {seller ? (
            <>
              <Link to="/dashboard" className="btn btn-gradient-purple">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-gradient-blue"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-gradient-purple">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
