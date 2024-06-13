import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const Login: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            navigate('/');
        } catch (error: any) { // Explicitly type error as 'any' to resolve 'unknown' issue
            setError(error.message || 'Invalid username or password');
        }
    };

    return (
        <div className="col-lg-4 col-12 mb-40">
            <div className="login-register-form-wrap">
                <h3>Login</h3>
                <form className="mb-30" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 mb-15">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username or Email"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12 mb-15">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <input type="submit" value="Login" />
                        </div>
                    </div>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;