import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";



function Users() {
    const [ listSP, ganListSP] = useState([])
    const navigate = useNavigate() // Thư viện để điều hướng trang
    useEffect(() => {
        fetch('http://localhost:3000/admin/user')
       .then(res => res.json())
       .then(data => ganListSP(data))
    }, [])
    
    const xoaSP = (id) => {
        if (window.confirm('Xác nhận xóa ') === false) return;
        fetch(`http://localhost:3000/admin/loai/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                alert('Đã xóa thành công');
                 // Tải lại dữ liệu sau khi xóa
                navigate("/admin_loaihomestay/")
            })
            .catch(err => console.error('Lỗi khi xóa:', err));
    };        
        
    
    return(
        <div class="admin_table_pra_wrapper">
        <h2 class="admin_table_pra_title">Danh Sách User</h2>
        <table class="admin_table_pra">
            <thead>
                <tr>
                    <th class="admin_table_pra_id">ID</th>
                    <th class="admin_table_pra_name">Username</th>
                    <th class="admin_table_pra_name">Password</th>
                    <th class="admin_table_pra_description">Số điện thoại</th>
                    <th class="admin_table_pra_status">Email </th>
                    <th class="admin_table_pra_status">Role_id</th>
                    <th class="admin_table_pra_function">Chức Năng</th>
                </tr>
            </thead>
            <tbody>
                {listSP.map((sp, index) => (
                    <tr key={sp.id_Loai}>
                        <td class="admin_table_pra_id">{sp.id_user}</td>
                        <td class="admin_table_pra_name">{sp.ten_user}</td>
                        <td class="admin_table_pra_description">{sp.pass_user}</td>
                        <td class="admin_table_pra_description">{sp.sdt_user}</td>
                        <td class="admin_table_pra_description">{sp.email_user}</td>
                        <td class="admin_table_pra_description">{sp.role_id}</td>
                        <td class="tooltip_table_admin">
                            <button
                                class="btn_table_admin btn-danger_table_admin"
                                onClick={() => xoaSP(sp.id_user)}
                            >
                                Xóa
                                <span class="tooltiptext_table_admin">Xóa Loại Homestay</span>
                            </button>
                            &nbsp;
                            <a
                                href={`/admin_update_user/${sp.id_user}`}
                                class="btn_table_admin btn-primary_table_admin"
                            >
                                Sửa
                                <span class="tooltiptext_table_admin">Sửa thông tin Loại Homestay</span>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    )

}

// function PhanTrang({ listSP, pageSize }) {
//     const [fromIndex, setfromIndex] = useState(0);
//     const toIndex = fromIndex + pageSize
//     const spTrong1Trang = listSP.slice(fromIndex, toIndex)
//     const tongSotrang = Math.ceil(listSP.length / pageSize )
//     const chuyenTrang = (event) =>{
//         const newIndex = (event.selected * pageSize) % listSP.length
//         setfromIndex(newIndex)
//     }
//     return (
//         <div>
//             <HienSPTrongMotTrang spTrongTrang = {spTrong1Trang}/>
//             <ReactPaginate nextLabel=">" previousLabel="<" pageCount={tongSotrang}
//              pageRangeDisplayed={5} onPageChange={chuyenTrang} className="thanhphantrang" 
//             />
//         </div>
//     );
// }
// function HienSPTrongMotTrang({spTrongTrang}) {
//     const [listSP, ganListSP] = useState([])
//     const navigate = useNavigate()
//     useEffect(() => {
//         fetch('http://localhost:3000/admin/sp')
//        .then(res => res.json())
//        .then(data => ganListSP(data))
//     }, [])
//     const xoaSP = (id) =>{
//         if (window.confirm('Xác nhận xóa ')===false) return false;
//         fetch(`http://localhost:3000/admin/sp/${id}`, {method:"delete"})
//         .then(res => res.json())
//         .then(data => navigate(0))
            
        
//     }
//     return (
//         <div id="data"> 
//             {spTrongTrang.map( (sp, index)=>{return(
//                 <div className="sp" key={index}>
//                     <h5 className="sp" key={0}>
//                     <b>Tên SP</b> <b>Ngày</b> <b>Giá</b> <b><a href="/admin/spthem">Thêm</a></b> 
//                 </h5>
//                 {listSP.map( (sp, index) =>(
//                     <div className="sp" key={sp.id_sp}>
//                         <span>{sp.ten_sp}</span> <span>{sp.ngay}</span> <span>{sp.gia}  </span>
//                         <span>
//                             <a href="#/" className="btn btn-danger" onClick={() =>xoaSP(sp.id)}>Xóa</a> &nbsp;
//                             <Link to={"/admin/spsua/"+sp.id} className="btn btn-primary"> Sửa</Link>
//                         </span>
//                     </div>
//                 ))}
                   
                
//                 </div>
//             )}) //map
//         }
//         </div>
// )}

export default Users;