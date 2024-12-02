import React from "react";
import { Link } from "react-router-dom";
function Slide_admin() {
    return(
        <div>
 {/* <!-- Sidebar --> */}
        <div className="sidebar_admin_para">
            <div className="logo_admin_para">
                <Link to={'/admin'}><h2><em>Paradiso</em></h2>
                </Link>
            </div>
           <li className="Navigation"> Navigation</li>
            <div className="navigation_admin_para">
                <ul>
                    <li>
                        <Link to={''} className="menu-toggle_admin_para">Quản lý Homestay <span className="badge_admin_para">3</span></Link>
                        <ul className="sub-menu_admin_para">
                            <li><a href="#">Danh sách Homestay</a></li>
                            <li><a href="#">Thêm Homestay</a></li>
                        </ul>
                    </li>
                    <li><Link to={'/admin_danhsach'}>Danh sách Homestay</Link></li>
                    <li><Link to={'/admin_add_homestay'}>Thêm Homestay</Link></li>
                    <li><Link href="#">Quản lý loại Homestay</Link></li>

                    <li><Link to={'/admin_loaihomestay'}>Danh sách loại Homestay</Link></li>
                    <li><Link to={'/admin_add_loai'}>Thêm loại Homestay</Link></li>
                    <li><a href="#">Quản lý User <span className="badge_admin_para">8</span></a></li>

                    <li><Link to={'/admin_users'}>Danh sách user</Link></li>
                    <li><Link to={'/admin_donhang'}>Quản lí đơn hàng</Link></li>

                </ul>
            </div>
        </div>        
    </div>
    )
}
export default Slide_admin;