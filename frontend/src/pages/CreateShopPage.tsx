import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { createOrUpdateShop, resetShopStatus } from '../redux/slices/shopSlice';
import { useNavigate } from 'react-router-dom';

const CreateShopPage: React.FC = () => {
  const { seller } = useSelector((state: RootState) => state.auth);
  const { loading, error, success } = useSelector((state: RootState) => state.shop);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!seller) {
      navigate('/login');
    }
  }, [seller, navigate]);

  // 🛠️ Watch for success
  useEffect(() => {
    if (success) {
      dispatch(resetShopStatus());
      navigate('/dashboard'); // 🚀 Move to dashboard only after shop saved successfully
    }
  }, [success, dispatch, navigate]);

  const handleSubmit = async () => {
    if (!shopName.trim()) return;

    await dispatch(createOrUpdateShop({
      sellerId: seller!.id,
      shop: {
        shop_name: shopName,
        shop_link: shopName.toLowerCase().replace(/\s+/g, '-'),
        description,
        profile_image: null,
      }
    }));
    // ⛔ DO NOT navigate manually here, navigate only from success watcher
  };

  if (!seller) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sis-light p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-sis-dark">Create Your Shop</h1>
        <p className="text-sis-dark mb-6">Let's start with some basic information about your shop.</p>

        <div className="mb-4">
          <label htmlFor="shopName" className="block text-sis-dark mb-1 font-semibold">
            Shop Name
          </label>
          <input
            id="shopName"
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="input"
            placeholder="My Amazing Crafts"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sis-dark mb-1 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input h-24"
            placeholder="Tell customers what makes your products special..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sis-dark mb-1 font-semibold">
            Contact Information
          </label>
          <input
            type="text"
            value={seller?.mobile}
            readOnly
            className="input bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="p-4 bg-purple-100 rounded-xl text-center text-sis-dark text-sm mb-6">
          "Your shop name is the first thing customers will see. Choose something memorable that reflects what you sell!"
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-gradient-purple"
          >
            {loading ? 'Saving...' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateShopPage;
