import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { publishShop, getShopByLink } from '../redux/slices/shopSlice';
import { getProductsForShop } from '../redux/slices/productSlice';
import { themeOptions, ThemeName } from '../constants/themeOptions';
import { ThemeSelector } from '../components/ThemeSelector';

const PreviewPage: React.FC = () => {
  const { shopLink } = useParams<{ shopLink: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedShop: shop } = useSelector((state: RootState) => state.shop);
  const { products, loading } = useSelector((state: RootState) => state.product);

  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('classic');
  const [published, setPublished] = useState(false);

  const theme = themeOptions.find((t) => t.name === selectedTheme);

  // Fetch shop info by link
  useEffect(() => {
    if (shopLink) {
      dispatch(getShopByLink(shopLink));
    }
  }, [dispatch, shopLink]);

  // Load products after shop is loaded
  useEffect(() => {
    if (shop) {
      dispatch(getProductsForShop(shop.id));
    }
  }, [dispatch, shop]);

  // Apply shop theme if it exists
  useEffect(() => {
    if (shop?.theme) setSelectedTheme(shop.theme as ThemeName);
  }, [shop]);

  const handlePublish = async () => {
    const payload = {
      shopLink: shopLink!,
      products: products.slice(0, 4).map((p) => ({
        name: p.name,
        price: p.price.toString(),
        image: p.image_url,
      })),
      theme: selectedTheme,
    };

    try {
      await dispatch(publishShop(payload)).unwrap();
      setPublished(true);
    } catch (error) {
      console.error('❌ Error publishing shop:', error);
    }
  };

  if (loading || !shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-sis-dark">Loading preview...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-sis-dark mb-2">No Products Found</h1>
          <p className="text-sis-dark/70 mb-6">Please add at least one product to preview your shop.</p>
          <button onClick={() => navigate(-1)} className="btn btn-gradient-purple">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (published) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
        <h1 className="text-3xl font-bold text-sis-dark">🎉 Your Shop is Live!</h1>
        <a href={`/shop/${shopLink}`} target="_blank" className="btn btn-gradient-purple">
          View My Shop →
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-sis-dark">
      {/* Theme Selector */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Personalize Your Shop</h2>
        <ThemeSelector value={selectedTheme} onChange={setSelectedTheme} />
      </div>

      {/* Shop Info */}
      <div className="max-w-6xl mx-auto px-6 pb-20 space-y-10">
        <div
          className="rounded-xl p-6 shadow-md text-white"
          style={{
            background: `linear-gradient(to bottom right, ${theme?.gradientVars})`,
          }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold">{shop?.shop_name || 'My Shop'}</h1>
            <p className="text-lg opacity-90">{shop?.description || 'Handmade with love'}</p>
            <p className="text-sm mt-2">📞 Contact: {shop?.mobile || 'N/A'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white text-sis-dark border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/default-product.jpg';
                  }}
                />
                <div className="p-4">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-sis-dark/70 mt-1">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Button */}
        <div className="text-center pt-6">
          <button onClick={handlePublish} className="btn btn-gradient-pink text-lg">
            🚀 Publish My Shop
          </button>
          <p className="text-xs text-sis-dark/60 mt-2">
            This will save your products and apply the selected theme.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
