
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function Thich() {
    // const { id } = useParams();
    // const [showyeuthich, setHomestay] = useState(null);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     axios.get(`http://localhost:3000/yeuthich`)
    //         .then(response => {
    //             setHomestay(response.data);
    //         })
    //         .catch(err => {
    //             setError("Lỗi khi tải dữ liệu homestay");
    //         });
    // }, [id]);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        // Lấy danh sách yêu thích từ localStorage khi component được mount
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        // console.log(storedFavorites)
        // console.log('storedFavorites')
    }, []);
    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(homestay => homestay.id_homestay !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    // const removeAllFavorites = () => {
    //     const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tất cả yêu thích không?");
    //     if (confirmDelete) {
    //         setFavorites([]); // Cập nhật trạng thái favorites thành mảng rỗng
    //         localStorage.removeItem('favorites'); // Xóa khỏi localStorage
    //     }
    // };

    // console.log('storedFavorites')
    

    return (
<div className="danhs1">
        <section className="bread-crumb">
            <div className="min_warp2">
                <ul className="breadcrumb" >
                    <li className="breadcrumb_list">
                        <Link to={''} href="index.html">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="breadcrumb_list">
                        <span className="mr_lr"><i className="fa-solid fa-chevron-right"></i></span>
                        <Link to={''} itemType="http://schema.org/Thing" itemProp="item" href="product.html">
                        Sản phẩm
                        </Link>
                    </li>
                    <li className="breadcrumb_list">
                        <span className="mr_lr"><i className="fa-solid fa-chevron-right"></i></span>
                        <Link to={''} itemType="http://schema.org/Thing" itemProp="item" href="toyen.html">
                            <span itemProp="name">Tổ yến</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
        <div className="product_main">
            <div className="min_warp2">
                <div className="product_title">
                    <h1>Danh sách yêu thích</h1>
                    <div className="title_separator">
                        <div className="separator_center"></div>
                    </div>
                </div>
                <div className="product_view">
                    <div className="product_view_content">
                        <ul className="product_cate">
                            {/* <li className="product_cate_item active-2">
                                <a href="">Mặc định</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Tên A-Z</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Tên Z-A</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Giá thấp đến cao</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Giá cao xuống thấp</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Khuyến mãi</a>
                            </li> */}
                            {/* <li className="product_cate_item"  onClick={removeAllFavorites}>
                                <span to="#">Xóa tất cả yêu thích</span>
                            </li> */}
                        </ul>
                    </div>
                    {favorites.length > 0 ? (
                    <ul id="content1" className=" tab_pro_list flex" >
                            {favorites.map((homestay) => (
                        <li className="tab_pro_item" key={homestay.id_homestay}>
                            <Link to={''}>
                                <figure>
                                    <img src="../image/chitiet1.png" alt=""/>
                                    <img src="../image/chitiet3.png" alt=""/>
                                </figure>
                                <div className="button_sale">
                                    <h3>{homestay.ten_homestay}</h3>
                                    <div className="sale_price">
                                        <div className="new_price">{homestay.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                    </div>
                                    <div className="product_button">
                                        <button name="#" className="btn_sale">
                                           <Link> <span>Đặt Homestay</span>     </Link>        
                                        </button>
                                        <button name="#" className="btn_sale" onClick={() => removeFromFavorites(homestay.id_homestay)}>
                                            <span>xóa</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </li>
                      
                        
                            ))}
                    </ul>
                       ) : (
                        <h4 className='no_product'>Chưa có Homstay yêu thích nào</h4>
                    )}
                </div>
                <div className="paginate">
                    <div className="PageNum">
                        <a className="nofollow active-3" href="#">1</a>
                        <a className="nofollow" href="#">2</a>
                        <a className="nofollow" href="#">3</a>
                        <a className="nofollow" href="#">4</a>
                        <a className="nofollow" href="#"> » </a>
                        <a className="nofollow" href="#"> › </a>                
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        </div>
</div>
    );
    
}

export default Thich;