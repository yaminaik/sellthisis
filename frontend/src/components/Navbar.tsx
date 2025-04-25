import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full bg-sis-light shadow-sm sticky top-0 z-50">
      <div className="max-container flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-1 leading-tight">
          <span className="text-sis-purple">Sell</span>
          <span className="text-sis-pink">This</span>
          <span className="text-sis-coral">, Sis</span>
        </Link>

        {/* CTA Button */}
        <Link
          to="/create"
          className="btn btn-gradient-purple"
        >
          Create My Shop
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
