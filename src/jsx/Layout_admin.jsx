// Layout.js
import React from 'react';
import Header_admin from '../admin/Header_admin.jsx'
import Slide_admin from "../admin/Slide_admin"; // Đảm bảo đường dẫn đúng
import Nav_admin from "../admin/Nav_admin";




const Layout_admin = ({ children }) => {
  return (
    <div>
   <div className="admin_wap">
      <header className="head_admin">
        <Nav_admin />
        <div className="admin_main">{children}</div>
        <Slide_admin />
      </header>
    </div>

    </div>
  );
};

export default Layout_admin;
