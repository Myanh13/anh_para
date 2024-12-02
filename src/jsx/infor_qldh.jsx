import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Infor_User_Qldh() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('auth'));

  // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
  useEffect(() => {
    console.log(storedUser);
    if (storedUser) {
      // Nếu có thông tin người dùng trong localStorage, set state user
      setUser(storedUser);

      // Gửi yêu cầu tới server để lấy thêm dữ liệu người dùng nếu cần
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user/${storedUser.id_user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user); // Cập nhật thông tin người dùng từ server
          } else {
            console.error('Lỗi khi lấy thông tin người dùng từ server');
          }
        } catch (error) {
          console.error('Có lỗi xảy ra khi kết nối tới server:', error);
        }
      };
      fetchUserData(); // Gọi hàm lấy dữ liệu người dùng từ server
    }
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    // Hiển thị thông báo xác nhận
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất không?');
    
    if (isConfirmed) {
      // Xóa thông tin người dùng khi đăng xuất
      localStorage.removeItem('auth');
      setUser(null); // Đặt lại state user về null
  
      // Điều hướng người dùng về trang đăng nhập hoặc trang chủ
      navigate('/');
      window.location.reload(); // Tải lại trang
    }
  };

  if (!user) {
    // Nếu không có người dùng, có thể hiển thị trang đăng nhập hoặc thông báo khác
    return <div>Chưa đăng nhập. Vui lòng đăng nhập lại.</div>;
  }

  return (
    <div className="main">
      <div className="danh">123</div>
      <div className="body_profile min_warp2">
        <div className="main_tk">
          <div className="thongtin">
            <div className="box_user">
                <div className="profile-container_infor_nguoidung">
                      <div className="profile-card_infor_nguoidung">
                          <div className="profile-avatar_infor_nguoidung">
                              <img src="../../image/user2.png" alt="Avatar"/>
                          </div>
                          <div className="profile-info_infor_nguoidung">
                              <h2>{user.id_user}. {user.ten_user}</h2>
                              <p><span className="icon_infor_nguoidung"><i class="fa-solid fa-phone"></i> </span> {user.sdt_user}</p>
                              <p><span className="icon_infor_nguoidung"><i class="fa-solid fa-envelope"></i></span>  {user.email_user}</p>
                          </div>
                      </div>
                </div>
            </div>
            <div className="box_link">
              <Link to={'/infor_user'} className="tab_item active">
                <i className="fa-light fa-circle-info"></i>
                Thông Tin Tài Khoản
              </Link>
              <Link to={'/ud_infor'} className="tab_item">
                <i className="fa-light fa-user"></i>
                Chỉnh Sửa Tài Khoản
              </Link>
              <Link to={'/quen_mk'} className="tab_item">
                <i className="fa-light fa-lock"></i>
                Đổi Mật Khẩu
              </Link>
              <Link to={'/ql_dhang'} className="tab_item">
                <i className="fa-light fa-clipboard-list"></i>
                Quản Lí Đơn Hàng
              </Link>
            </div>
            <div className="box_tieude">
              <h1>Đơn Hàng Của Bạn</h1>
            </div>
            <table className="table_cart">
              <thead>
                <tr>
                  <th>Thứ Tự</th>
                  <th>Thông Tin Đơn Hàng</th>
                  <th>Số Lượng</th>
                  <th>Tổng Tiền</th>
                  <th>Trạng Thái</th>
                  <th>Công Cụ</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- Replace with static data or leave empty --> */}
                <tr>
                  <td>1</td>
                  <td style={{ textAlign: 'left' }}>
                    Đơn Hàng <strong>ID</strong> - Ngày tháng<br />
                    <strong>Hình Thức Thanh Toán:</strong> Tiền Mặt
                  </td>
                  <td>Số Lượng</td>
                  <td className="price_tk">Tổng Tiền đ</td>
                  <td>Chờ</td>
                  <td><p className='icon' target="_blank"><i class="fa-solid fa-trash"></i></p></td>
                </tr>
                {/* <!-- Repeat rows as needed --> */}
              </tbody>
            </table>
          </div>
          <div className="tab">
            <h1 className="tab_title">Tài Khoản</h1>
            <div className="tab_list">
              <Link to={'/infor_user'} className="link active">
                <i className="fa-light fa-circle-info"></i>
                Thông Tin Tài Khoản
              </Link>
              <Link to={'/ud_infor'} className="link">
                <i className="fa-light fa-user"></i>
                Chỉnh Sửa Tài Khoản
              </Link>
              <Link to={'/quen_mk'} className="link">
                <i className="fa-light fa-lock"></i>
                Đổi Mật Khẩu
              </Link>
              <Link to={'/ql_dhang'} className="link">
                <i className="fa-light fa-clipboard-list"></i>
                Quản Lí Đơn Hàng
              </Link>
              <div onClick={handleLogout} className="tab_item logout_user">
                <i className="fa-sharp fa-regular fa-period"></i>
                Đăng Xuất
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Infor_User_Qldh;
