// PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Nếu không đăng nhập thì chuyển hướng về trang "/" (trang chủ) và thay thế (replace) địa chỉ URL
    return <Navigate to="/" replace />;
  }

  // Nếu đã đăng nhập thành công thì hiển thị nội dung của trang được bảo vệ
  return <>{element}</>;
};

export default PrivateRoute;
