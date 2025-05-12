import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getProductsForShop } from '../redux/slices/productSlice';
import { addProduct } from '../redux/slices/productSlice';

interface ProductForm {
  name: string;
  price: string;
  image: File | null;
}

const AddProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shopLink } = useParams<{ shopLink: string }>();
  const navigate = useNavigate();

  const shop = useSelector((state: RootState) =>
    state.shop.shops.find((s) => s.shop_link === shopLink)
  );
  const shopId = shop?.id;

  const { products: existingProducts, loading } = useSelector((state: RootState) => state.product);
  const [products, setProducts] = useState<ProductForm[]>([]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const maxAllowedProducts = 4;
  const existingCount = existingProducts.length;
  const availableSlots = maxAllowedProducts - existingCount;

  useEffect(() => {
    if (shopId) {
      dispatch(getProductsForShop(shopId));
    }
  }, [shopId, dispatch]);

  const handleInputChange = (index: number, field: keyof ProductForm, value: any) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleAddAnotherProduct = () => {
    if (products.length >= availableSlots) {
      setShowPremiumPopup(true);
      return;
    }
    setProducts([...products, { name: '', price: '', image: null }]);
  };

  const handleDeleteProduct = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };


  const handleSubmit = async () => {
    if (products.length === 0) {
      alert('Please add at least 1 new product.');
      return;
    }
  
    for (let i = 0; i < products.length; i++) {
      const { name, price, image } = products[i];
      if (!name.trim() || !price.trim() || !image) {
        alert(`Please fill out all fields for Product ${i + 1}`);
        return;
      }
    }
  
    try {
      for (const product of products) {
        await dispatch(
          addProduct({
            shopId: shopId!,
            data: {
              name: product.name,
              price: product.price,
              image: product.image!,
            }
          })
        ).unwrap();
      }
  
      alert('Products added to database!');
      setProducts([]);
      dispatch(getProductsForShop(shopId!));
    } catch (err) {
      console.error(err);
      alert('Failed to add products. Check console.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-sis-dark">Loading your shop...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6">
      <div className="w-full max-w-3xl space-y-10">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-sis-dark mb-2">Add Your Products</h1>
          {availableSlots > 0 ? (
            <p className="text-sis-dark/70">
              You already have {existingCount} {existingCount === 1 ? 'product' : 'products'}.
              You can add {availableSlots} more.
            </p>
          ) : (
            <p className="text-sis-dark/70 font-semibold">
              You already have the maximum 4 products. Upgrade to add more!
            </p>
          )}
        </div>

        {/* Products Form */}
        <div className="space-y-12">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl shadow p-6 space-y-6 relative">
              <button
                onClick={() => handleDeleteProduct(index)}
                className="absolute top-3 right-3 text-sis-pink text-sm font-semibold"
              >
                ✖️ Remove
              </button>

              <h2 className="text-xl font-bold text-sis-purple mb-4">
                Product {existingCount + index + 1}
              </h2>

              {/* Name */}
              <div>
                <label className="block text-sis-dark mb-1 font-semibold">Product Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="input"
                  placeholder="Handmade Scarf"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sis-dark mb-1 font-semibold">Price ($)</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                  className="input"
                  placeholder="25.00"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sis-dark mb-1 font-semibold">Product Image</label>
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-sis-purple/50 bg-sis-light rounded-xl p-6 cursor-pointer"
                  onClick={() => document.getElementById(`fileInput-${index}`)?.click()}
                >
                  <span className="text-sis-dark/70 font-medium">📷 Upload Image</span>
                  <input
                    id={`fileInput-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleInputChange(index, 'image', e.target.files?.[0] || null)}
                  />
                </div>
                {product.image && (
                  <>
                    <p className="text-sis-dark/70 text-sm mt-2">{product.image.name}</p>
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="Preview"
                      className="mt-2 rounded-lg max-h-40 object-cover border"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Product */}
        {availableSlots > 0 && products.length < availableSlots && (
          <div className="flex justify-center">
            <button
              onClick={handleAddAnotherProduct}
              className="btn btn-gradient-blue flex items-center gap-2"
            >
              ➕ Add Another Product
            </button>
          </div>
        )}

        {/* Premium Popup */}
        {showPremiumPopup && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4 w-80">
              <h2 className="text-xl font-bold text-sis-purple text-center">Upgrade to Premium</h2>
              <p className="text-sis-dark text-center text-sm">
                Free users can add up to 4 products. Upgrade to add unlimited products!
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <button className="btn btn-gradient-purple">Upgrade Now</button>
                <button
                  onClick={() => setShowPremiumPopup(false)}
                  className="btn bg-gray-200 text-sis-dark"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            onClick={handleSubmit}
            className="btn btn-gradient-purple"
          >
           Done 
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductPage;
