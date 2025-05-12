import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getMyShops, deleteShop } from '../redux/slices/shopSlice'; // ✨ Import deleteShop thunk
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { seller } = useSelector((state: RootState) => state.auth);
  const { shops, loading } = useSelector((state: RootState) => state.shop);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!seller) {
      navigate('/login');
    } else {
      dispatch(getMyShops());
    }
  }, [seller, dispatch, navigate]);

  const handleDeleteShop = async (shopId: number) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      await dispatch(deleteShop(shopId));
   
    }
  };

  if (!seller) return null;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen  p-6">
      <div className="w-full max-w-5xl space-y-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-sis-dark mb-2">
            Welcome, {seller.mobile}!
          </h1>
          <p className="text-sis-dark/70">
            Manage your shops and start adding your products.
          </p>
        </div>

        {/* Shops Section */}
        {loading && <p className="text-center text-sm text-sis-dark/70">Loading your shops...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-sis-purple">{shop.shop_name}</h2>
                <p className="text-sis-dark/80 text-sm">{shop.description}</p>
                <a
                  href={`/shop/${shop.shop_link}`}
                  target="_blank"
                  className="text-sis-pink underline text-sm break-all"
                >
                  {window.location.origin}/shop/{shop.shop_link}
                </a>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => navigate(`/shop/${shop.shop_link}/add-product`)}
                  className="btn btn-gradient-purple w-full"
                >
                  ➕ Add Products
                </button>
                <button
                  onClick={() => navigate(`/shop/${shop.shop_link}/preview`)}
                  className="btn btn-gradient-blue w-full"
                >
                  👀 Preview Shop
                </button>
                <button
                  onClick={() => navigate(`/edit-shop/${shop.id}`)}
                  className="btn btn-gradient-yellow w-full"
                >
                  ✏️ Edit Shop
                </button>
                <button
                  onClick={() => handleDeleteShop(shop.id)}
                  className="btn btn-gradient-teal w-full"
                  disabled={loading}
                >
                  🗑️ Delete Shop
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Shop Button */}
        {shops.length < 2 && (
          <div className="text-center pt-10">
            <button
              onClick={() => navigate('/create')}
              className="btn btn-gradient-pink"
            >
              ➕ Create Another Shop
            </button>
            <p className="text-xs text-sis-dark/60 mt-2">
              (Free users can create up to 2 shops)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
