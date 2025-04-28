const pool = require('../models/db');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async(req , res) =>{
    const {mobile } = req.body;

    if (!mobile){
        return res.status(400).json({message: 'Mobile Number is Required!'});
    }

    const otp = generateOTP();
    try {
        const result = await pool.query(
            'INSERT INTO sellers (mobile,otp) VALUES ($1,$2) ON CONFLICT (mobile) DO UPDATE SET otp = EXCLUDED.otp',
            [mobile,otp]
        );
        console.log(`OTP for ${mobile}: ${otp}`);
        res.status(200).json({message:'OTP sent successfully.'});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error sending OTP.' });
    }
};

const verifyOTP = async(req,res) =>{
    const {mobile,otp}= req.body;
    if (!mobile || !otp) {
        return res.status(400).json({ message: 'Mobile and OTP are required.' });
    }

    try{
        const result = await pool.query(
            'SELECT * FROM sellers WHERE mobile = $1 AND otp = $2',
            [mobile, otp]
          );
          
        if(result.rows.length === 0){
            return res.status(400).json({messgae: 'Invalid OTP.'});
        }

        await pool.query('UPDATE sellers SET otp = NULL WHERE mobile = $1', [mobile]);
        const user = result.rows[0];
            res.status(200).json({
            message: 'Login successful!',
            seller: {
                id: user.id,
                mobile: user.mobile,
                shop_name: user.shop_name,
                shop_link: user.shop_link,
                description: user.description,
                profile_image: user.profile_image,
                is_premium: user.is_premium,
            }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error verifying OTP.' });
    }
};

module.exports = { sendOTP, verifyOTP };