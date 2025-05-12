const pool = require('../models/db');

// Helper to generate a clean shop link
const generateShopLink = (shop_name, mobile) => {
  const cleanName = shop_name.trim().toLowerCase().replace(/\s+/g, '-');
  return `${cleanName}-${mobile}`;
};

// Create a new Shop
const createShop = async (req, res) => {
  const { shop_name, description, profile_image } = req.body;
  const userId = req.user.id;
  const mobile = req.user.mobile;

  if (!shop_name) {
    return res.status(400).json({ message: 'Shop name is required.' });
  }

  try {
    const shopCountResult = await pool.query(
      'SELECT COUNT(*) FROM shops WHERE user_id = $1',
      [userId]
    );
    const shopCount = parseInt(shopCountResult.rows[0].count, 10);

    if (shopCount >= 2) {
      return res.status(403).json({ message: 'Free plan allows only 2 shops. Upgrade to premium for more.' });
    }

    const shop_link = generateShopLink(shop_name, mobile);

    const existing = await pool.query('SELECT * FROM shops WHERE shop_link = $1', [shop_link]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Shop link already taken. Choose a different shop name.' });
    }

    const result = await pool.query(
      `INSERT INTO shops (user_id, shop_name, shop_link, description, profile_image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, shop_name, shop_link, description, profile_image]
    );

    res.status(201).json({ message: 'Shop created successfully.', shop: result.rows[0] });
  } catch (err) {
    console.error('Error creating shop:', err);
    res.status(500).json({ message: 'Server error creating shop.' });
  }
};

// Get all shops for logged-in user
const getMyShops = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM shops WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.status(200).json({ shops: result.rows });
  } catch (err) {
    console.error('Error fetching shops:', err);
    res.status(500).json({ message: 'Server error fetching shops.' });
  }
};

// Update/Edit a Shop
const updateShop = async (req, res) => {
  const userId = req.user.id;
  const { shopId } = req.params;
  const { shop_name, description, profile_image } = req.body;

  if (!shop_name) {
    return res.status(400).json({ message: 'Shop name is required to update.' });
  }

  try {
    const shopResult = await pool.query(
      'SELECT * FROM shops WHERE id = $1 AND user_id = $2',
      [shopId, userId]
    );

    if (shopResult.rows.length === 0) {
      return res.status(404).json({ message: 'Shop not found or not authorized.' });
    }

    const mobile = req.user.mobile;
    const shop_link = generateShopLink(shop_name, mobile);

    const existing = await pool.query(
      'SELECT * FROM shops WHERE shop_link = $1 AND id != $2',
      [shop_link, shopId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Shop link conflict. Try a different shop name.' });
    }

    const result = await pool.query(
      `UPDATE shops
       SET shop_name = $1,
           shop_link = $2,
           description = $3,
           profile_image = $4
       WHERE id = $5
       RETURNING *`,
      [shop_name, shop_link, description, profile_image, shopId]
    );

    res.status(200).json({ message: 'Shop updated successfully.', shop: result.rows[0] });
  } catch (err) {
    console.error('Error updating shop:', err);
    res.status(500).json({ message: 'Server error updating shop.' });
  }
};

// Delete a Shop
const deleteShop = async (req, res) => {
  const userId = req.user.id;
  const { shopId } = req.params;

  try {
    const shopResult = await pool.query(
      'SELECT * FROM shops WHERE id = $1 AND user_id = $2',
      [shopId, userId]
    );

    if (shopResult.rows.length === 0) {
      return res.status(404).json({ message: 'Shop not found or not authorized.' });
    }

    await pool.query('DELETE FROM shops WHERE id = $1', [shopId]);
    res.status(200).json({ message: 'Shop deleted successfully.' });
  } catch (err) {
    console.error('Error deleting shop:', err);
    res.status(500).json({ message: 'Server error deleting shop.' });
  }
};

// Publish Shop (saves theme and up to 4 products)
const publishShop = async (req, res) => {
  const { shopLink } = req.params;
  const { products, theme } = req.body;

  try {
    const shopResult = await pool.query('SELECT * FROM shops WHERE shop_link = $1', [shopLink]);
    if (shopResult.rows.length === 0) {
      return res.status(404).json({ message: 'Shop not found.' });
    }

    const shop = shopResult.rows[0];

    await pool.query('UPDATE shops SET theme = $1 WHERE id = $2', [theme, shop.id]);
    await pool.query('DELETE FROM products WHERE shop_id = $1', [shop.id]);

    for (const product of products.slice(0, 4)) {
      await pool.query(
        'INSERT INTO products (shop_id, name, price, image_url) VALUES ($1, $2, $3, $4)',
        [shop.id, product.name, product.price, product.image]
      );
    }

    res.status(200).json({ message: 'Shop published successfully.' });
  } catch (err) {
    console.error('Error publishing shop:', err);
    res.status(500).json({ message: 'Server error publishing shop.' });
  }
};

// Get Shop by Shop Link
const getShopByLink = async (req, res) => {
  const { shopLink } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        shops.id,
        shops.shop_name,
        shops.shop_link,
        shops.description,
        shops.theme,
        shops.created_at,
        users.mobile
      FROM shops
      JOIN users ON users.id = shops.user_id
      WHERE shops.shop_link = $1
      `,
      [shopLink]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const shop = result.rows[0];

    res.json({ shop });
  } catch (err) {
    console.error('Error fetching shop by link:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createShop,
  getMyShops,
  updateShop,
  deleteShop,
  getShopByLink,
  publishShop,

};
