const pool = require('./db');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sellers (
        id SERIAL PRIMARY KEY,
        mobile VARCHAR(20) UNIQUE NOT NULL,
        otp VARCHAR(10),
        shop_name VARCHAR(255),
        shop_link VARCHAR(255) UNIQUE,
        description TEXT,
        profile_image TEXT,
        is_premium BOOLEAN DEFAULT FALSE,
        plan_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        seller_id INT REFERENCES sellers(id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        seller_id INT REFERENCES sellers(id),
        buyer_name VARCHAR(255),
        buyer_mobile VARCHAR(20),
        buyer_note TEXT,
        order_items JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Tables created successfully!');
    process.exit();
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  }
};

createTables();
