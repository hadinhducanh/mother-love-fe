import { useAuth } from '@/context/auth/AuthContext';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


export const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, fullName, email, phone, password, gender, confirmPassword } = formData;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await register(username, fullName, email, phone, password, gender);
            alert('Registration successful');
            navigate('/');
        } catch (error:any) {
            alert('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="col-lg-6 col-12 mb-40 ml-auto">
            <div className="login-register-form-wrap">
                <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-15">
                            <input type="text" name="username" placeholder="User Name" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 col-12 mb-15">
                            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 col-12 mb-15">
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 col-12 mb-15">
                            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 col-12 mb-15">
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 col-12 mb-15">
                            <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 col-12 mb-15">
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 col-12">
                            <input type="submit" value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
