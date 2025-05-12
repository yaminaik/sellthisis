const pool = require('../models/db');


const path = require('path');
const fs = require('fs');

const addProduct = async (req, res) => {
  const userId = req.user.id;
  const { shopId } = req.params;
  const { name, price, description = '' } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Product name and price are required.' });
  }

  try {
    const shopResult = await pool.query(
      'SELECT * FROM shops WHERE id = $1 AND user_id = $2',
      [shopId, userId]
    );

    if (shopResult.rows.length === 0) {
      return res.status(404).json({ message: 'Shop not found or not authorized.' });
    }

    let image_url = null;

    if (req.file) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const filepath = path.join(__dirname, '..', 'uploads', filename);

      // Save file to disk
      fs.writeFileSync(filepath, req.file.buffer);

      image_url = `/uploads/${filename}`; // Save just the URL
    }

    const result = await pool.query(
      `INSERT INTO products (shop_id, name, description, price, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [shopId, name, description, price, image_url]
    );

    res.status(201).json({ message: 'Product added successfully.', product: result.rows[0] });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Server error adding product.' });
  }
};



// Get all products for a shop
const getProductsForShop = async (req, res) => {
  const { shopId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE shop_id = $1 ORDER BY created_at DESC',
      [shopId]
    );
    res.status(200).json({ products: result.rows });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error fetching products.' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    // Check that the product belongs to one of the user's shops
    const productResult = await pool.query(
      `SELECT p.*
       FROM products p
       JOIN shops s ON p.shop_id = s.id
       WHERE p.id = $1 AND s.user_id = $2`,
      [productId, userId]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or not authorized.' });
    }

    await pool.query('DELETE FROM products WHERE id = $1', [productId]);
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error deleting product.' });
  }
};

module.exports = {
  addProduct,
  getProductsForShop,
  deleteProduct
};
