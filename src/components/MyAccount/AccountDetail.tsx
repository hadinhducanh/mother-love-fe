import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { User } from '@/model/User';

export const AccountDetail = () => {
    const { getUserInfo, changePassword } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUser(userInfo);
            }
        };

        fetchUserInfo();
    }, [getUserInfo]);

    const handlePasswordChange = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newPwd !== confirmPwd) {
            setError('New password and confirm password do not match.');
            return;
        }

        try {
            await changePassword(currentPwd, newPwd);
            setSuccess('Password changed successfully.');
            setError('');
            setCurrentPwd('');
            setNewPwd('');
            setConfirmPwd('');
        } catch (error) {
            setError('Failed to change password. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="myaccount-content">
            <h3>Account Details</h3>

            {user && (
                <div className="account-details-form">
                    <form onSubmit={handlePasswordChange}>
                        <div className="row">
                            <div className="col-12 mb-30">
                                <p>Full Name: {user.fullName}</p>
                            </div>
                            <div className="col-12 mb-30">
                                <p>Phone: {user.phone}</p>
                            </div>
                            <div className="col-12 mb-30">
                                <p>Email: {user.email}</p>
                            </div>
                            <div className="col-12 mb-30">
                                <p>Points: {user.point}</p>
                            </div>
                            <div className="col-12 mb-30">
                                <img src={user.image} alt="User profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                            </div>

                            <div className="col-12 mb-30">
                                <h3>Password change</h3>
                            </div>

                            <div className="col-12 mb-30">
                                <input
                                    id="current-pwd"
                                    placeholder="Current Password"
                                    type="password"
                                    value={currentPwd}
                                    onChange={(e) => setCurrentPwd(e.target.value)}
                                />
                            </div>

                            <div className="col-lg-6 col-12 mb-30">
                                <input
                                    id="new-pwd"
                                    placeholder="New Password"
                                    type="password"
                                    value={newPwd}
                                    onChange={(e) => setNewPwd(e.target.value)}
                                />
                            </div>

                            <div className="col-lg-6 col-12 mb-30">
                                <input
                                    id="confirm-pwd"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={confirmPwd}
                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="col-12 mb-30">
                                    <p style={{ color: 'red' }}>{error}</p>
                                </div>
                            )}
                            {success && (
                                <div className="col-12 mb-30">
                                    <p style={{ color: 'green' }}>{success}</p>
                                </div>
                            )}

                            <div className="col-12">
                                <button className="btn btn-dark btn-round btn-lg">Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
