const pool = require('../models/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: 'Mobile Number is Required!' });
  }

  const otp = generateOTP();

  try {
    await pool.query(
      'INSERT INTO users (mobile, otp) VALUES ($1, $2) ON CONFLICT (mobile) DO UPDATE SET otp = EXCLUDED.otp',
      [mobile, otp]
    );

    console.log(`OTP for ${mobile}: ${otp}`);
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error sending OTP.' });
  }
};

const verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: 'Mobile and OTP are required.' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE mobile = $1 AND otp = $2',
      [mobile, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    const user = result.rows[0];

    // Clear OTP after verification
    await pool.query('UPDATE users SET otp = NULL WHERE mobile = $1', [mobile]);

    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store in httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: 'Login successful!',
      seller: {
        id: user.id,
        mobile: user.mobile,
        is_premium: user.is_premium || false
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error verifying OTP.' });
  }
};

// Optional: check current user
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT id, mobile, is_premium FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching user.' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out.' });
};

module.exports = { sendOTP, verifyOTP, getCurrentUser, logout };


