import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { createShop, resetShopStatus, getMyShops } from '../redux/slices/shopSlice';
import { useNavigate } from 'react-router-dom';

const CreateShopPage: React.FC = () => {
  const { seller } = useSelector((state: RootState) => state.auth);
  const { loading, success, error } = useSelector((state: RootState) => state.shop);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!seller) {
      navigate('/login');
    }
  }, [seller, navigate]);

  useEffect(() => {
    if (success) {
      dispatch(resetShopStatus());
      dispatch(getMyShops());
      navigate('/dashboard');
    }
  }, [success, dispatch, navigate]);

  const handleSubmit = async () => {
    if (!shopName.trim()) {
      alert('Please enter a shop name.');
      return;
    }

    await dispatch(createShop({
      shop_name: shopName,
      description,
      profile_image: null
    }));
  };

  if (!seller) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 space-y-8">
        <div className="text-center">
          <span className="inline-block bg-sis-purple/10 text-sis-purple font-semibold text-xs px-4 py-1 rounded-full mb-4">
            Step 1: Create Your Shop
          </span>
          <h1 className="text-4xl font-bold text-sis-dark mb-2">Let's Set Up Your Shop</h1>
          <p className="text-sis-dark/70 text-base">
            Start by telling us a little about what you're selling.
          </p>
        </div>

        <div className="space-y-5">
          {/* Shop Name */}
          <div>
            <label htmlFor="shopName" className="block text-sis-dark mb-1 font-semibold">
              Shop Name <span className="text-sis-pink">*</span>
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

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sis-dark mb-1 font-semibold">
              Description <span className="text-sis-pink">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input h-28"
              placeholder="Tell customers what makes your products special..."
            />
          </div>

          {/* Phone number (readonly) */}
          <div>
            <label className="block text-sis-dark mb-1 font-semibold">
              Contact (Phone or WhatsApp)
            </label>
            <input
              type="text"
              value={seller?.mobile}
              readOnly
              className="input bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Info box */}
        <div className="p-4 bg-sis-light rounded-xl text-center text-sis-dark text-sm">
          <span className="italic">
            "Your shop name is the first thing customers will see. Pick something memorable!"
          </span>
        </div>

        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}

        {/* Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-gradient-purple w-full sm:w-auto"
          >
            {loading ? 'Saving...' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateShopPage;
