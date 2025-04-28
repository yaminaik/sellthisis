const pool = require('../models/db');

const createOrUpdateShop = async(req , res)=>{
    const { sellerId, shop_name, shop_link, description, profile_image } = req.body;

  if (!sellerId || !shop_name || !shop_link) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const existingLink = await pool.query('SELECT * FROM sellers WHERE shop_link = $1 AND id != $2', [shop_link, sellerId]);
    if (existingLink.rows.length > 0) {
      return res.status(400).json({ message: 'Shop link already taken. Try another one.' });
    }

    const result = await pool.query(
      `UPDATE sellers
       SET shop_name = $1, shop_link = $2, description = $3, profile_image = $4
       WHERE id = $5
       RETURNING *`,
      [shop_name, shop_link, description, profile_image, sellerId]
    );

    res.status(200).json({ message: 'Shop updated successfully.', seller: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating shop.' });
  }
};

module.exports = { createOrUpdateShop };