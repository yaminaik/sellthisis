import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { seller } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (!seller) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sis-light p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-sis-dark">
          Welcome, {seller.shop_name || seller.mobile}!
        </h1>

        <p className="text-sis-dark mb-2">Your Shop Link:</p>
        <a
          href={`/shop/${seller.shop_link}`}
          target="_blank"
          className="text-sis-purple underline mb-6 block"
        >
          {window.location.origin}/shop/{seller.shop_link}
        </a>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/add-product')}
            className="btn btn-gradient-purple w-full"
          >
            ➕ Add Products
          </button>
          <button
            onClick={() => navigate('/view-orders')}
            className="btn btn-gradient-blue w-full"
          >
            📦 View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
