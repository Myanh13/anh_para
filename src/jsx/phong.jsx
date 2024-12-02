import React, {useEffect, useState, useRef} from "react";
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa'; // Import biểu tượng lịch từ react-icons
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Nếu bạn sử dụng axios
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';


const Phong = () => {
  const [homestays, setHomestays] = useState([]);
  const [danhSachPhong, setDanhSachPhong] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date()); // Mặc định là ngày hôm nay
  const [checkOutDate, setCheckOutDate] = useState(new Date()); // Ngày trả phòng
  const [isCheckInOpen, setIsCheckInOpen] = useState(false); // Trạng thái mở cho ngày nhận phòng
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false); // Trạng thái mở cho ngày trả phòng
  const [roomsAvailable, setRoomsAvailable] = useState([]); // State để lưu danh sách phòng trống
  const [showRooms, setShowRooms] = useState(false); // Trạng thái hiển thị danh sách phòng
  const listRef = useRef(null); // Tạo ref cho danh sách phòng
  const [homestay, setHomestay] = useState([]);  // Danh sách homestay từ API
  const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
  
  const [homestaysPerPage] = useState(6);  // Số lượng homestay hiển thị trên mỗi trang
  const [danhSachLoaiPhong, setDanhSachLoaiPhong] = useState([]); // Lưu danh sách loại phòng
  const [loaiPhongHienThi, setLoaiPhongHienThi] = useState('');
  const [selectedLoaiId, setSelectedLoaiId] = useState(null); // Mặc định là null hoặc id loại đã chọn

  const [images, setImages] = useState([]);
  const fetchHomestayImages = async () => {
    try {
      const response = await fetch('https://datn-7xip.onrender.com/dshinhanh');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data); // Log dữ liệu nhận được
      setImages(data); // Đặt dữ liệu vào state
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  useEffect(() => {
    fetchHomestayImages();
  }, []);

  
// Gọi API để lấy danh sách phòng
useEffect(() => {
  fetch('https://datn-7xip.onrender.com/homestay') // Thay thế URL này bằng API thực tế của bạn
    .then(response => response.json())
    .then(data => setDanhSachPhong(data))
    .catch(error => console.error('Error fetching rooms:', error));
}, []);

// Gọi API để lấy danh sách loại phòng
useEffect(() => {
  fetch('https://datn-7xip.onrender.com/loaihomestay') // URL API để lấy danh sách loại homestay
    .then(response => response.json())
    .then(data => setDanhSachLoaiPhong(data))
    .catch(error => console.error('Error fetching room types:', error));
}, []);

  // Hàm thay đổi loại phòng khi người dùng chọn từ dropdown
  const handleChangeLoaiPhong = (event) => {
    const value = event.target.value;
    setSelectedLoaiId(value === 'all' ? null : value); // Nếu chọn 'all', gán selectedLoaiId là null
    setLoaiPhongHienThi(value); // Cập nhật loại phòng hiện thi
  };

  useEffect(() => {
    // Fetch dữ liệu sản phẩm từ API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://datn-7xip.onrender.com/homestay');  // Thay URL với API của bạn
        setHomestay(response.data);  // Lưu sản phẩm vào state
      } catch (error) {
        console.error('Lỗi khi fetch sản phẩm:', error);
      }
    };

    fetchProducts();
  }, []);

   // Tính toán chỉ số của sản phẩm bắt đầu và kết thúc trên trang hiện tại
    const indexOfLastHomestay = currentPage * homestaysPerPage;
    const indexOfFirstHomestay = indexOfLastHomestay - homestaysPerPage;
    const currentHomestays = homestays.slice(indexOfFirstHomestay, indexOfLastHomestay); 
   // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Hàm lấy phòng còn trống
    const handleCheckAvailableRooms = async () => {
    try {
        const response = await axios.get('https://datn-7xip.onrender.com/dshinhanh');
        const availableRooms = response.data.filter((room) => {
        const isAvailable = room.TrangThai === 'Còn phòng';
        const isMatchingLoai = selectedLoaiId ? room.id_Loai === Number(selectedLoaiId) : true; // Nếu selectedLoaiId không có, cho phép tất cả loại
        return isAvailable && isMatchingLoai;
      });
  
      // Sử dụng Set để lưu trữ các id_homestay đã hiển thị
    const displayedIds = new Set();
    const uniqueAvailableRooms = availableRooms.filter((room) => {
      if (!displayedIds.has(room.id_homestay)) {
        displayedIds.add(room.id_homestay);
        return true; // Giữ lại phòng này
      }
      return false; // Bỏ qua phòng đã hiển thị
    });
  
      console.log('Unique Available Rooms:', uniqueAvailableRooms); // Kiểm tra danh sách phòng có còn trống không 
      // Lưu lại các phòng còn trống vào state
      setRoomsAvailable(uniqueAvailableRooms);
      setShowRooms(true); // Hiển thị danh sách phòng
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phòng:', error);
    }
  };
  
   // Hàm để ẩn danh sách phòng khi click ra ngoài
   const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowRooms(false); // Ẩn danh sách phòng
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện click trên toàn bộ tài liệu
    document.addEventListener('mousedown', handleClickOutside);
  
    // Cleanup để gỡ bỏ sự kiện khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  // Dùng useEffect để gọi API khi component được render
  useEffect(() => {
    fetch('https://datn-7xip.onrender.com/homestay')  // Gọi API từ backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setHomestays(data))  // Lưu dữ liệu vào state
        .catch(error => console.error('Error fetching data:', error));
}, []);

  return (
    <main className="wrapperMain_content">
      <section className="layout-collections-all">
        <div className="wrapper-mainCollection">
          <div className="banner phong">
            <div className="wap_name_dt_rr">
              <div className="min_warp2">
                <div className="name_menu_date_restaurant" data-aos="fade-up"  data-aos-duration="3000">
                  <p className="name_menu">Khám phá dịch vụ & tiện nghi </p>
                  <h1 className="restaurant">Phòng</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="section-search">
            <div className="min_warp3">
              <div class="form_booking">
                      <div class="checkin_homstay t-datepicker">
                        <div className="date_check_in search_item" onClick={() => setIsCheckInOpen(!isCheckInOpen)}>
                          <div className="seach_icons">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24px" viewBox="0 0 24 24" fill="none"><path d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path><path d="M16.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path><path d="M7.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"></path><path d="M3.75 8.25H20.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path></svg>
                            <div className="calendar-icon" />

                            </div>
                            <div className="search-form">
                                <label htmlFor="">Ngày nhận phòng</label>
                                <div className="t-dates t-date-check-in">
                                    <span className="t-day-check-in">
                                        {checkInDate.getDate().toString().padStart(2, '0')}/
                                    </span>
                                    <span className="t-month-check-in">
                                        {(checkInDate.getMonth() + 1).toString().padStart(2, '0')}/
                                    </span>
                                    <span className="t-year-check-in">{checkInDate.getFullYear()}</span>
                                </div>
                                {/* Sử dụng DatePicker để chọn ngày */}
                                {isCheckInOpen && (
                                <div className="date-picker-container">
                                <DatePicker
                                selected={checkInDate} // Ngày hiện tại
                                onChange={(date) => {
                                    console.log('Ngày đã chọn:', date); // Thêm dòng này để debug
                                    setCheckInDate(date);
                                    setIsCheckInOpen(false);
                                }}
                                dateFormat="dd/MM/yyyy"
                                className="t-input-check-in"
                                todayButton="Hôm nay"
                                onClickOutside={() => setIsCheckInOpen(false)} // Đóng khi click ra ngoài
                                inline // Hiển thị lịch luôn
                                minDate={new Date()} // Vô hiệu hóa các ngày đã qua
                                />
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="date_check_out search_item" onClick={() => setIsCheckOutOpen(!isCheckInOpen)}>
                            <div className="seach_icons">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24px" viewBox="0 0 24 24" fill="none"><path d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path><path d="M16.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path><path d="M7.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"></path><path d="M3.75 8.25H20.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path></svg>
                            </div>
                            <div className="search-form">
                                <label htmlFor="">Ngày trả phòng</label>
                                <div className="t-dates t-date-check-out">
                                    <span className="t-day-check-out">
                                    {checkOutDate.getDate().toString().padStart(2, '0')}/
                                    </span>
                                    <span className="t-month-check-out">
                                    {(checkOutDate.getMonth() + 1).toString().padStart(2, '0')}/
                                    </span>
                                    <span className="t-year-check-out">{checkOutDate.getFullYear()}</span>
                                </div>
                                {/* DatePicker cho ngày trả phòng */}
                                {isCheckOutOpen && (
                                <div className="date-picker-container">
                                    <DatePicker
                                        selected={checkOutDate}
                                        onChange={(date) => {
                                        console.log('Ngày trả phòng đã chọn:', date);
                                        setCheckOutDate(date);
                                        setIsCheckOutOpen(false);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        className="t-input-check-out"
                                        todayButton="Hôm nay"
                                        onClickOutside={() => setIsCheckOutOpen(false)}
                                        inline
                                        minDate={checkInDate} // Vô hiệu hóa các ngày trước ngày nhận phòng
                                    />
                                </div>
                                )}
                            </div>
                        </div>
                      </div>
                        <div class="number_people search_item">
                            <div class="seach_icons">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M288 350.1l0 1.9-32 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L447.3 128.1c-12.3-1-25 3-34.8 11.7c-35.4 31.6-65.6 67.7-87.3 102.8C304.3 276.5 288 314.9 288 350.1zM480 512c-88.4 0-160-71.6-160-160c0-76.7 62.5-144.7 107.2-179.4c5-3.9 10.9-5.8 16.8-5.8c7.9-.1 16 3.1 22 9.2l46 46 11.3-11.3c11.7-11.7 30.6-12.7 42.3-1C624.5 268 640 320.2 640 352c0 88.4-71.6 160-160 160zm64-111.8c0-36.5-37-73-54.8-88.4c-5.4-4.7-13.1-4.7-18.5 0C453 327.1 416 363.6 416 400.2c0 35.3 28.7 64 64 64s64-28.7 64-64z"/></svg>
                            </div>
                            <div className="search-form">
                              <div className="group-dropdown-qty">
                                <label className="homestay_type" htmlFor="homestay-type">Loại homestay</label>
                                <select value={loaiPhongHienThi} onChange={handleChangeLoaiPhong}>
                                  <option value="all">Tất cả các loại phòng</option>
                                  {danhSachLoaiPhong.map(loai => (
                                    <option key={loai.id_Loai} value={loai.id_Loai}>
                                      {loai.Ten_Loai}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                        </div>
                        <div className="btn-more text-center search_btn">
                            <button type="button" className="ocean-button book_room" onClick={handleCheckAvailableRooms}>
                              Đặt phòng
                            </button>
                          {showRooms && (
                          <div ref={listRef} className="available-rooms">
                            <h3>Các phòng còn trống tại <strong>PARADISO</strong></h3>
                            {roomsAvailable.length === 0 ? (
                              <p>Không có phòng còn trống.</p>
                            ) : (
                              <ul className="show_sp">
                                {roomsAvailable.map((room) => (
                                  <li key={room.id}>
                                    <Link to={''}>
                                        <div className="show_img">
                                            {images.length > 0 ? (
                                              images.map((image, index) => {
                                                if(room.id_homestay == image.id_hinh) {
                                                  return (
                                                    <div  key={index} className="add_img">
                                                      <div class="homestay-sale">Sale 20%</div>
                                                      <img className="img-loop" src={image.url_hinh} alt={room.ten_homestay || 'Hình ảnh homestay'} />
                                                      <button class="favorite-button-sp"><i class="fa-solid fa-heart"></i></button>
                                                    </div>
                                                  )
                                                }
                                              }))
                                              :
                                              (
                                              <p> Không có hình để hiển thị</p>
                                              )}
                                        </div>
                                        <div className="homestay-info">
                                                <h3 class="homestay-name">{room.ten_homestay}</h3>
                                                <p class="homestay-price">Giá: {room.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} /đêm</p>
                                                <p class="homestay-rating">{'⭐'.repeat(Math.floor(room.danh_gia))} (4.5/5)</p>
                                              <div className="room-status">
                                                {room.TrangThai === 'Còn phòng' ? (
                                                  <span style={{ color: 'green' }}>Còn phòng</span>
                                                ) : (
                                                  <span style={{ color: 'red' }}>Đã đặt</span>
                                                )}
                                              </div>
                                        </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                        </div>
                    </div>
            </div>
          </div>
          <section className="section-collection-about-1">
            <div className="min_warp2">
              <div className="heading-title text-center row1">
                <p className="more1">Chào mừng bạn đến với Paradiso</p>
                <h2 className="more2">
                  Tận hưởng quang cảnh biển xanh từ những ngôi nhà với thiết kế
                  hiện đại
                </h2>
                <p className="heading-desc">
                  Paradiso cung cấp nhiều lựa chọn chỗ nghỉ cho các nhóm với mọi
                  quy mô. Cho dù bạn quan tâm đến chỗ nghỉ tại khu nghỉ dưỡng
                  dành cho doanh nghiệp hay gia đình, phòng lãng mạn cho hai
                  người hay nơi nghỉ dưỡng khép kín trong cabin, chúng tôi đều
                  có chỗ nghỉ hoàn hảo dành cho bạn. Đội ngũ của chúng tôi tận
                  tâm cung cấp dịch vụ và chỗ nghỉ ngoạn mục như quang cảnh.
                </p>
                <div className="list-btn">
                  <div className="btn-little">
                    <a href="#" className="btn-ldp">
                      <span>Nhà gỗ &amp;Nhà nghỉ</span>
                    </a>
                  </div>
                  <div className="btn-little">
                    <a href="#" className="btn-ldp">
                      <span>Phòng &amp;Phòng Suite</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-collection-col section-collection-col-1">
            <div className="col-banner" style={{"--bg-col-all": "url(//theme.hstatic.net/200000909393/1001269498/14/collection_col_1_banner.jpg?v=2537)"}}>
              <div className="container breadcrumb-content text-center">
                <p className="breadcrumb-more1">
                  Chào mừng bạn đến với Paradiso
                </p>
                <h2>Khám phá Nhà gỗ &amp;Nhà nghỉ</h2>
                <p className="breadcrumb-more2">
                  Mang đến cho du khách bầu không khí lịch sự với những tiện
                  nghi hiện đại.
                </p>
              </div>
            </div>
            <div className="min_warp2">
              <div className="btn_slide">
                          {/* <div className="owl-nav">
                              <button type="button" role="presentation" className="owl-prev" aria-label="prev slide">
                                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" className=""><g transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,511.9994964599609,511.99959468841564)"><g><g><path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701C391.333,275.032,391.333,236.967,367.954,213.588z"></path></g></g></g></svg>
                              </button>
                              <button type="button" role="presentation" className="owl-next" aria-label="next slide">
                                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" className=""><g><g><g><path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701C391.333,275.032,391.333,236.967,367.954,213.588z"></path></g></g></g></svg>
                              </button>
                          </div> */}
              </div>
              <div className="row1">
                <ul className="homestay_li2" data-aos="fade-up" data-aos-duration="2000">
                  {Array.isArray(currentHomestays) && currentHomestays.map((homestay) => (
                    <li key={homestay.id_homestay}>
                      <Link to={"/homestay/" + homestay.id_homestay}>
                        <div className="img_homstay">
                          <div className="pro-price">
                            <span className="price">
                              {homestay.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                            <span>/ Đêm</span>
                          </div>
                          <div className="product--image img-slide">
                            {images.length > 0 ? (
                              images.map((image, index) => {
                                if (homestay.id_homestay === image.id_hinh) {
                                  return (
                                    <div key={index} className="lazy-img">
                                      <img
                                        className="img-loop"
                                        src={image.url_hinh}
                                        alt={homestay.ten_homestay || 'Hình ảnh homestay'}
                                      />
                                    </div>
                                  );
                                }
                                return null;
                              })
                            ) : (
                              <p>Không có hình để hiển thị</p>
                            )}
                          </div>
                        </div>
                        <div className="des_hst">
                          <div className="proloop-detail">
                            <h3><Link to="#">{homestay.ten_homestay}</Link></h3>
                            <div className="pro-tag">
                              <div className="tag-item tag-area">
                                <span>150</span> <span className="tag-unit">m<sup>2</sup></span>
                              </div>
                              <div className="tag-item tag-guests">
                                <span>10</span> <span className="tag-unit">Guests</span>
                              </div>
                              <div className="tag-item tag-bed">
                                <span>5</span> <span className="tag-unit">Beds</span>
                              </div>
                              <div className="tag-item tag-bathroom">
                                <span>4</span> <span className="tag-unit">Bathroom</span>
                              </div>
                            </div>
                            <div className="pro-desc">
                              {homestay.mota}
                            </div>
                            <div className="pro-desc" style={{ color: "red" }}>
                              {homestay.TrangThai}
                            </div>
                            <div className="btn_ev">
                              <Link to={"/homestay/" + homestay.id_homestay}>
                                <span>Xem chi tiết
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                  </svg>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                  {/* Phân trang */}
                  <Pagination 
                    homestaysPerPage={homestaysPerPage} 
                    totalHomestays={homestay.length} 
                    paginate={paginate} 
                  />
              </div>
            </div>
            
            
          </section>
          <section className="section-collection-about-2"style={{"--bg-col-all":" url(//theme.hstatic.net/200000909393/1001269498/14/collection_about_2_banner.jpg?v=2537)"}}>
            <div className="container_homelist">
              <div className="heading-title text-center">
                <p className="more1">Chào mừng bạn đến với Maple Inn</p>
                <h2 className="more2">
                  Trải nghiệm lưu trú thoải mái và tiện nghi
                </h2>
                <p className="heading-desc" style={{color: '#fff'}}>
                  Để tạo sự thoải mái cho tất cả khách, tất cả các tiện nghi và
                  chỗ ở của chúng tôi đều không khói thuốc 100% – bất kể chất
                  liệu hay thiết bị. Tất cả các phòng đều có TV cáp, tủ lạnh
                  mini, máy pha cà phê, lò vi sóng và khăn trải giường và khăn
                  tắm miễn phí.
                </p>
                <div className="about-time">
                  <div>
                    <p className="time">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24px" viewBox="0 0 24 24"  >
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"></path>
                      </svg>
                      <span>Thời gian nhận phòng: 12:00 PM</span>
                    </p>
                  </div>
                  <div>
                    <p className="time">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24px" viewBox="0 0 24 24" >
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"></path>
                      </svg>
                      <span>Check-out Time: 10:00 AM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
{/* // <!-- form email --> */}
          <div className="email_newletter" data-aos="fade-up" data-aos-duration="1000" >
                    <div className="min_warp2">
                        <div className="row_email">
                            <div className="col-lg-6 col-12">
                                <div className="newsletter_title">
                                    <div className="heading-title">
                                        <p className="title3">Hãy kết nối cùng Paradiso</p>
                                        <h3 className="title4">Đăng ký nhận bản tin của chúng tôi để nhận tin tức, ưu đãi và khuyến mãi.</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <form acceptCharset="UTF-8" action="#" className="contact_form" method="post">
                                    <input name="form_type" type="hidden" value="customer"/>
                                    <input name="utf8" type="hidden" value="✓"/>
                                    <div className="form-group input-group">
                                        <input type="hidden" id="new_tags" name="#" value="Đăng kí nhận tin"/>     
                                        <input required="" type="email" name="#" className="form-control newsletter-input" id="newsletter-email" pattern="^(.)+@[A-Za-z0-9]([A-Za-z0-9.\-]*[A-Za-z0-9])?\.[A-Za-z]{1,13}$" placeholder="Nhập email của bạn" aria-label="Email Address"/>
                                        <div className="input_btn">
                                            <button type="submit" className="cta-submitform newsletter-btn">Đăng ký 
                                                <span className="icon-btn"><i className="fa fa-send-o"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="check-form">
                                        <input type="checkbox" id="new_check" required=""/>
                                        <span>Đã đọc &amp; Đồng ý <a href="#"> & Chính sách bảo mật</a></span>
                                    </div>
                                    <input id="eb66e25e0d524d97a7478759b2b7d91e" name="g-recaptcha-response" type="hidden"/>
                                </form>
                            </div>
                        </div>
                    </div>
          </div>
{/* /* <!-- form email --> */}
{/* <!-- footer-intagram --> */}
            <div className="footer-instagram" data-aos="fade-zoom-in" data-aos-easing="ease-in-out"data-aos-delay="400" data-aos-offset="0">
                  <div className="min_warp2">                     
                      <div className="row_col">
                                                     <>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={30}
                                    pagination={{
                                      clickable: true,
                                    }}
                                    autoplay={{
                                      delay: 3000, // Delay between slides in milliseconds
                                      disableOnInteraction: false, // Continue autoplay after user interaction
                                    }}
                                    breakpoints={{
                                        768: { // Trên 768px
                                          slidesPerView: 4, // Hiển thị 4 slides
                                          spaceBetween: 30,
                                        },
                                        480: { // Từ 480px đến 767px
                                          slidesPerView: 2, // Hiển thị 2 slides
                                          spaceBetween: 20,
                                        },
                                        0: { // Dưới 480px
                                          slidesPerView: 1, // Hiển thị 1 slide
                                          spaceBetween: 10,
                                        },
                                    }}
                                    modules={[ Autoplay]}
                                    className="mySwiper"
                                >
                                <SwiperSlide>
                                    <div className="box_intagram">
                                        <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_2.jpg?v=2537" alt="Instgram 2"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_3.jpg?v=2537" alt="Instgram 3"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_4.jpg?v=2537" alt="Instgram 4"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                        <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                        <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                                    </div>   
                                </SwiperSlide>
                              

                                </Swiper>
                            </>
                      </div>
                      <div className="btn-more text-center">
                          <a href="#"><button className="ocean-button" id="oceanButton"><i className="fa-brands fa-instagram"></i> Theo dõi trên Instagram</button></a>
                      </div>
                  </div>
            </div>
{/* <!-- footer-intagram --> */}
             
                    
        </div>
      </section>
    </main>
  );
};

const Pagination = ({ homestaysPerPage, totalHomestays, paginate }) => {
  const pageNumbers = [];

  // Tính tổng số trang
  for (let i = 1; i <= Math.ceil(totalHomestays / homestaysPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Phong;
