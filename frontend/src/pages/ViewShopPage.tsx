import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getShopByLink } from '../redux/slices/shopSlice';
import { getProductsForShop } from '../redux/slices/productSlice';
import { themeOptions } from '../constants/themeOptions';

const ViewShopPage: React.FC = () => {
  const { shopLink } = useParams<{ shopLink: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedShop: shop, loading: shopLoading, error: shopError } = useSelector(
    (state: RootState) => state.shop
  );
  const { products, loading: productLoading } = useSelector((state: RootState) => state.product);

  // Fetch shop and then its products
  useEffect(() => {
    if (shopLink) {
      dispatch(getShopByLink(shopLink))
        .unwrap()
        .then((shop) => {
          dispatch(getProductsForShop(shop.id));
        })
        .catch((err) => {
          console.error('Error loading shop:', err);
        });
    }
  }, [shopLink, dispatch]);

  if (shopLoading || productLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-sis-light text-sis-dark">Loading...</div>;
  }

  if (!shop || shopError) {
    return <div className="flex justify-center items-center min-h-screen bg-sis-light text-sis-dark">Shop not found.</div>;
  }

  // Get gradient from themeOptions config using the theme name stored in DB
  const selectedTheme = themeOptions.find((t) => t.name === shop.theme);
  const gradient = selectedTheme?.gradientVars || 'var(--classic-start), var(--classic-end)';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section with Theme Gradient */}
      <div
        className="w-full py-16 text-center text-white"
        style={{ background: `linear-gradient(to bottom right, ${gradient})` }}
      >
        <h1 className="text-4xl font-bold">{shop.shop_name}</h1>
        <p className="text-lg mt-2 opacity-90">{shop.description}</p>
        <p className="text-sm mt-1 opacity-80">📞 Contact: {shop.mobile || 'N/A'}</p>
    

      {/* Products */}
      <div className="max-w-5xl w-full mx-auto px-6 py-12 space-y-8">
        {products.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold text-sis-dark text-center">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                    onError={(e) => {
                      e.currentTarget.src = '/default-product.jpg';
                    }}
                  />
                  <h3 className="text-lg font-bold text-sis-purple mt-4">{product.name}</h3>
                  <p className="text-sis-dark">${product.price}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-sis-dark/70 text-lg">No products added yet!</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default ViewShopPage;
