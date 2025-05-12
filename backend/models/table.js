const pool = require('./db');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        mobile VARCHAR(20) UNIQUE NOT NULL,
        otp VARCHAR(10),
        created_at TIMESTAMP DEFAULT NOW(),
         is_premium BOOLEAN DEFAULT FALSE
      );
      
      CREATE TABLE IF NOT EXISTS shops (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        shop_name VARCHAR(255) NOT NULL,
        shop_link VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        profile_image TEXT,
        theme VARCHAR(255),
        plan_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        shop_id INT REFERENCES shops(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        shop_id INT REFERENCES shops(id) ON DELETE CASCADE,
        buyer_name VARCHAR(255),
        buyer_mobile VARCHAR(20),
        buyer_address TEXT, 
        buyer_note TEXT,
        order_items JSONB, -- list of products and quantity
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
