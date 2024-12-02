import React from "react";
import { Link } from "react-router-dom";
function Slide_nhanvien() {
    return(
        <div>
 {/* <!-- Sidebar --> */}
        <div className="sidebar_admin_para">
            <div className="logo_admin_para">
                <Link to={'/nhanvien'}><h2><em>Paradiso</em></h2>
                </Link>
            </div>
           <li className="Navigation"> Navigation</li>
           <div className="navigation_admin_para">
                        <ul>
                            <li>
                                <Link to={'/nhanvien_chuaxacnhan'}>Đơn Hàng chưa xác nhận</Link>
                            </li>
                            <li><Link to={'/nhanvien_daxacnhan'}>Đơn hàng chưa thanh toán</Link></li>
                            <li><Link to={'/nhanvien_dathanhtoan'}>Đơn hàng đã thanh toán</Link></li>
                            
                            
                        </ul>
                    </div>
        </div>        
    </div>
    )
}
export default Slide_nhanvien;