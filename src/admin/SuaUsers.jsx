import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const SuaUsers = () => {
    const { id } = useParams(); // Lấy id của loại homestay từ URL
    const [loading, setLoading] = useState(true);
    const [sp, setSp] = useState({
        ten_user: '',
        sdt_user: '',
        email_user: '',
        pass_user: '',
        role_id: ''
    });

    const navigate = useNavigate();

    // Lấy thông tin homestay từ API khi trang tải
    useEffect(() => {
        const fetchHomestay = async () => {
            console.log(`Fetching data for homestay with ID: ${id}`); // Debug
            try {
                const response = await fetch(`http://localhost:3000/admin/user/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Data fetched:', data); // Debug
                    setSp(data); // Cập nhật thông tin vào state
                } else {
                    console.error('Không tìm thấy user');
                }
            } catch (error) {
                console.error('Có lỗi xảy ra:', error);
            } finally {
                setLoading(false); // Đặt trạng thái tải dữ liệu là false
            }
        };
        fetchHomestay();
    }, [id]);

    const handleChange = (e) => {
        setSp({
            ...sp,
            [e.target.name]: e.target.value
        });
    };

    const submitDuLieu = () => {
        // Kiểm tra dữ liệu trước khi gửi
        console.log('Submitting data:', sp); // Debug
        if ( !sp.ten_user || !sp.sdt_user || !sp.email_user ) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const url = `http://localhost:3000/admin/user/${id}`;
        const opt = {
            method: 'PUT',
            body: JSON.stringify(sp),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                console.log('Update response:', data); // Debug
                alert('Cập nhật user thành công!');
                navigate('/admin_users'); // Điều hướng về trang danh sách
            })
            .catch(error => console.error('Có lỗi xảy ra:', error));
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className="container_admin_pra _add_form_pra">
        <h2>Cập nhật loại Homestay</h2>
        <form>
            <div className="form-group_admin_pra">
                <label htmlFor="idLoai">Id User</label>
                <input 
                    type="number" 
                    id="idUser" 
                    name="id_user" 
                    className="form-control"
                    value={sp.id_user || ''} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="tenLoai">Username</label>
                <input 
                    type="text" 
                    id="tenLoai" 
                    name="ten_user" 
                    className="form-control"
                    value={sp.ten_user || ''} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="moTaLoai">Password</label>
                <textarea 
                    type="text" 
                    id="moTaLoai" 
                    name="pass_user" 
                    className="form-control"
                    value={sp.pass_user || ''} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="moTaLoai">Gmail</label>
                <textarea 
                    type="text" 
                    id="moTaLoai" 
                    name="email_user" 
                    className="form-control"
                    value={sp.email_user || ''} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="moTaLoai">Role_id</label>
                <textarea 
                    type="number" 
                    id="moTaLoai" 
                    name="role_id"  
                    className="form-control"
                    value={sp.role_id || ''} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group_admin_pra">
                <button 
                    className="btn btn-warning" 
                    type="button" 
                    onClick={submitDuLieu}
                >
                    Cập nhật User
                </button>
                &nbsp;
                <a href="/admin_users" className="btn btn-info">
                    Danh sách Users
                </a>
            </div>
        </form>
    </div>
    
    );
};

export default SuaUsers;
