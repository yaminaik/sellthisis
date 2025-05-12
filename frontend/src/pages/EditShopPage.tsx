import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getMyShops, updateShop } from '../redux/slices/shopSlice';
import { deleteProduct, getProductsForShop } from '../redux/slices/productSlice';

const EditShopPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const shopId = Number(id);
  const { shops } = useSelector((state: RootState) => state.shop);
  const { products, loading: productLoading } = useSelector((state: RootState) => state.product);

  const shop = shops.find((s) => s.id === shopId);

  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getMyShops());
  }, [dispatch]);

  useEffect(() => {
    if (shop) {
      setShopName(shop.shop_name);
      setDescription(shop.description || '');
      dispatch(getProductsForShop(shop.id));
    }
  }, [shop, dispatch]);

  const handleUpdate = async () => {
    await dispatch(updateShop({ shopId, data: { shop_name: shopName, description } }));
    navigate('/dashboard');
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(productId));
    }
  };

  if (!shop) return <p className="text-center p-10">Loading shop...</p>;

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8 space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sis-dark">✏️ Edit Your Shop</h1>
          <p className="text-sis-dark/70 mt-1">Update your details and manage your product list.</p>
        </div>

        {/* Shop Info Form */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-sis-dark font-semibold">Shop Name</span>
            <input
              type="text"
              className="input mt-1"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Enter your shop name"
            />
          </label>

          <label className="block">
            <span className="text-sis-dark font-semibold">Description</span>
            <textarea
              rows={3}
              className="input mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a short shop description"
            />
          </label>

          <button onClick={handleUpdate} className="btn btn-gradient-purple w-full text-lg">
            Save Changes
          </button>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-bold text-sis-dark mb-4">🗑️ Remove Products</h2>
          {productLoading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-sis-dark/70">No products to remove.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-sis-light rounded-xl border shadow-sm p-4 flex flex-col items-center"
                >
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${product.image_url}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/default-product.jpg';
                    }}
                  />
                  <h4 className="mt-3 text-sis-purple font-semibold">{product.name}</h4>
                  <p className="text-sis-dark text-sm mb-3">${product.price}</p>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn btn-gradient-teal w-full"
                  >
                    🗑️ Remove Product
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditShopPage;
