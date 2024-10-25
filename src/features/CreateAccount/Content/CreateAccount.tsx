import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../.css/CreateAccount.css';

const CreateAccount: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        username: userName,
        password: password,
        email: email,
      });

      if (response.status === 201) {
        setError('Tài khoản đã được tạo thành công. Vui lòng kiểm tra email của bạn để nhận mã kích hoạt.');
        setTimeout(() => {
          navigate('/activate'); // Chuyển qua trang kích hoạt tài khoản sau khi đăng ký thành công
        }, 2000); 
      } else {
        setError(response.data.message || 'Failed to create account.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create account.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !password || !email) {
      setError('All fields are required.');
      return;
    }
    handleRegister();
  };

  const handleCreateAccount = (): void => {
    setIsRegistering(true);
  };

  const handleActivateAccountClick = (): void => {
    navigate('/activate');
  };

  const handleBackToLoginClick = (): void => {
    navigate('/Login'); 
  };

 return (
  <div className="create-account-group">
    <h2>Create Account</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleCreateAccount} className="create-account-btn">
        Create Account
      </button>
    </form>
        <div className="button-group">
          <button onClick={handleActivateAccountClick} className="activate-account-btn">
            Activate Account
          </button>
          <button onClick={handleBackToLoginClick} className="back-to-login-btn">
            Back to Login
          </button>
        </div>
    </div>
  );
};

export default CreateAccount;
