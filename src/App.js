import './App.css';
import './Admin.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';

// Import Layout
import Layout from './jsx/Layout';
import Layout_admin from './jsx/Layout_admin';
import Layout_Nhanvien from './jsx/Layout_Nhanvien';


// Import các trang

import Home from './jsx/Home';
import ChiTiet from './jsx/ChiTiet';
import Thich from './jsx/yeuthich';
import Thanhtoan from './jsx/thanhtoan';
import CamNang from './jsx/Camnang';
import Phong from './jsx/phong';
import Lienhe from './jsx/Lienhe';
import Gioithieu from './jsx/Gioithieu';
import ImageGallery from './jsx/ztest_post';
import Ud_Infor_User from './jsx/ud_info_user';
import Infor_User from './jsx/infor_user';
import Infor_User_Qmk from './jsx/infor_qmk';
import Infor_User_Qldh from './jsx/infor_qldh';
import Dichvu from './jsx/DichVu';
import ResetPasswordForm from './jsx/Quenmk';
import DK_DN from './jsx/dk_dn';
import DanhGia from './jsx/danhgia';
import NotFound from './jsx/notfoud';
import ScrollManager from './jsx/ScrollManager';
import Payment from './jsx/PAYMENT';
import Thanks from './jsx/Thank';
import AdminVoucherCreator from './jsx/AdminVoucherCreator';
import VoucherChecker from './jsx/VoucherChecker';
// admin
import Home_admin from './admin/home_admin';
import Dsht_admin from './admin/Dsht_admin';
import Header_admin from './admin/Header_admin';
import ThemHomestay from './admin/ThemHomestay';
import SuaHomestay from './admin/SuaHomestay';

import LoaiHomestay from './admin/LoaiHomestay';
import ThemLoai from './admin/themLoai';
import SuaLoai from './admin/SuaLoai';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Home_Nhanvien from './nhanvien/Home_NV';
import ChuaXacNhan from './nhanvien/Chuaxacnhan';
import DaXacNhan from './nhanvien/Daxacnhan';
import NhanVien_ThanhToan from './nhanvien/NVThanhToan';
import ThanhToan from './nhanvien/NVThanhToan';
import DaThanhToan from './nhanvien/DaThanhtoan';
import Users from './admin/Users';
import SuaUsers from './admin/SuaUsers';
import DonHang from './admin/DonHang';




function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter basename="/">
         <ScrollManager/>
      <div className="App">
        {/* Định nghĩa Routes */}
        <Routes>
          {/* Các trang hợp lệ sẽ sử dụng Layout với Header và Footer */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/phong" element={<Layout><Phong /></Layout>} />
          <Route path="/dichvu" element={<Layout><Dichvu /></Layout>} />
          <Route path="/cndulich" element={<Layout><CamNang /></Layout>} />
          <Route path="/lienhe" element={<Layout><Lienhe /></Layout>} />
          <Route path="/gioithieu" element={<Layout><Gioithieu /></Layout>} />
          <Route path="/infor_user" element={<Layout> <Infor_User /></Layout>} />
          <Route path="/ud_infor" element={<Layout> <Ud_Infor_User /></Layout>} />
          <Route path="/quen_mk" element={<Layout> <Infor_User_Qmk /></Layout>} />
          <Route path="/ql_dhang" element={<Layout><Infor_User_Qldh /></Layout>} />
          <Route path="/quen_pass" element={<Layout><ResetPasswordForm /></Layout>} />
          <Route path="/dk_dn" element={<Layout><DK_DN /></Layout>} />
          <Route path="/danhgia" element={<Layout><DanhGia /></Layout>} />
          {/* <Route path="/test" element={<Layout><ImageGallery /></Layout>} /> */}
          <Route path="/thich" element={<Layout><Thich /></Layout>} />
          <Route path="/homestay/:id" element={<Layout><ChiTiet /></Layout>} />
          <Route path="/thanhtoan" element={<Layout><Thanhtoan /></Layout>} />
          <Route path="/Payment" element={<Layout><Payment /></Layout>} />
          <Route path="/thanks" element={<Layout><Thanks /></Layout>} />
          <Route path="/adminvc" element={<Layout><AdminVoucherCreator /></Layout>} />
          {/* user */}
          <Route path="/adminvc" element={<Layout><VoucherChecker  /></Layout>} />
            {/* ADMIN */}
          <Route path="/admin" element={ <Layout_admin> <Home_admin /></Layout_admin>} />
          
          <Route path="/admin_danhsach" element={ <Layout_admin> <Dsht_admin /></Layout_admin>} />
          <Route path="/admin_add_homestay" element={ <Layout_admin> <ThemHomestay /></Layout_admin>} />
          <Route path="/admin_update_homestay/:id" element={ <Layout_admin> <SuaHomestay/></Layout_admin>} />
          <Route path="/admin_users" element={ <Layout_admin> <Users/> </Layout_admin>} />
          <Route path="/admin_update_user/:id" element={ <Layout_admin> <SuaUsers/> </Layout_admin>} />
          <Route path='/admin_loaihomestay/' exact element={<Layout_admin> <LoaiHomestay/></Layout_admin>} />
          <Route path='/admin_add_loai/' exact element={<Layout_admin> <ThemLoai/>  </Layout_admin>} />
          <Route path='/admin_update_loai/:id/' exact element={<Layout_admin> <SuaLoai/> </Layout_admin>} />
          <Route path='/admin_donhang' exact element={<Layout_admin> <DonHang/> </Layout_admin>} />
          
          {/* nhanvien */}
          <Route path='/nhanvien/' element={<Layout_Nhanvien> <Home_Nhanvien/> </Layout_Nhanvien>} />
          <Route path='/nhanvien_chuaxacnhan/'  element={<Layout_Nhanvien> <ChuaXacNhan/></Layout_Nhanvien>} />
          <Route path='/nhanvien_daxacnhan/'  element={<Layout_Nhanvien> <DaXacNhan/></Layout_Nhanvien>} />
          <Route path='/nhanvien_daxacnhan/:id/' element={<Layout_Nhanvien> <ThanhToan/></Layout_Nhanvien>} />
          <Route path='/nhanvien_dathanhtoan/' element={<Layout_Nhanvien> <DaThanhToan/></Layout_Nhanvien>} />
          {/* <Route path='/admin_add_loai/' exact element={<ThemLoai />} />
          <Route path='/admin_update_loai/:id' exact element={<SuaLoai />} /> */}









          {/* Trang NotFound không có Header và Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Routes>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
