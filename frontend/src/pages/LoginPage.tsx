import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '../redux/slices/authSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'enterMobile' | 'enterOtp'>('enterMobile');

  const handleSendOtp = async () => {
    if (!mobile) return;
    try {
      await dispatch(sendOtp(mobile)).unwrap();
      setStep('enterOtp');
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    try {
      await dispatch(verifyOtp({ mobile, otp })).unwrap();
      navigate('/create');
    } catch (err) {
      console.error('Error verifying OTP:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg w-full py-6 px-4 sm:px-6 lg:px-8 max-w-md">

        <h1 className="text-3xl font-bold mb-2 text-center text-sis-dark">Welcome back</h1>
        <p className="text-center text-sis-dark mb-6">Enter your mobile number to login to your shop</p>

        {step === 'enterMobile' && (
          <>
            <label htmlFor="mobile" className="block text-sis-dark mb-1 font-medium">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              placeholder="e.g. +1234567890"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="input mb-4"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="btn btn-gradient-purple w-full"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'enterOtp' && (
          <>
            <label htmlFor="otp" className="block text-sis-dark mb-1 font-medium">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="btn btn-gradient-purple w-full"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
