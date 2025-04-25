import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-sis-light py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-sm text-sis-dark">
        <p className="mb-2">
          <Link to="/about" className="hover:underline text-sis-purple mx-2">
            About Us
          </Link>
          |
          <Link to="/contact" className="hover:underline text-sis-pink mx-2">
            Contact Us
          </Link>
        </p>
        <p className="text-xs text-sis-gray mt-2">
          © {new Date().getFullYear()} Sell This, Sis. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
