import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData, fetchHouseholds } from "../../actions";

function Page2(){
    const residents = [
        {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0987654321",
          cic: "123456789012",
          dob: "1979-05-12",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Chủ nhà",
          nationality: "Việt Nam",
          gender: "Nam",
          occupation: "Kỹ sư",
          hometown: "Hà Nội",
          ethnic: "Kinh",
          status: "Thường trú",
        },
        {
          id: "2",
          name: "Nguyễn Thị B",
          phone: "0981234567",
          cic: "123456789013",
          dob: "1981-03-25",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Vợ",
          nationality: "Việt Nam",
          gender: "Nữ",
          occupation: "Giáo viên",
          hometown: "Hải Phòng",
          ethnic: "Kinh",
          status: "Thường trú",
        },
        {
          id: "3",
          name: "Nguyễn Văn C",
          phone: "0976543210",
          cic: "123456789014",
          dob: "2004-07-10",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Con trai",
          nationality: "Việt Nam",
          gender: "Nam",
          occupation: "Sinh viên",
          hometown: "Hà Nội",
          ethnic: "Kinh",
          status: "Thường trú",
        },
        {
          id: "4",
          name: "Nguyễn Thị D",
          phone: "0976123456",
          cic: "123456789015",
          dob: "2006-01-15",
          floornumber: "2",
          apartmentNumber: "202",
          relationship: "Con gái",
          nationality: "Việt Nam",
          gender: "Nữ",
          occupation: "Học sinh",
          hometown: "Hà Nội",
          ethnic: "Kinh",
          status: "Thường trú",
        },
      ];

    return (
    <>
        <div  className="details page2">
            <div className="recentCt page2">
                <div className="cardHeader">
                    <h2>Quản lí dân cư</h2>
                    <Link to="/register_resident" className="btn">Đăng kí</Link>
                </div>

                <table>
                    <thead>
                        <tr>
                            <td>Tên chủ căn hộ</td>
                            <td>Liên hệ</td>
                            <td>Tầng</td>
                            <td>Số căn hộ</td>
                            <td>Trạng thái</td>
                            <td>Chi tiết</td>
                        </tr>
                    </thead>

                    <tbody>
                    { residents.map(resident => 
                        <tr id={resident.id}>
                            <td> { resident.name } </td>
                            <td> { resident.phone } </td>
                            <td> { resident.floornumber } </td>
                            <td> { resident.apartmentNumber } </td>
                            <td> { resident.status } </td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>
                    )}
                        {/* <tr>
                            <td>Star Refrigerator</td>
                            <td>8</td>
                            <td>808</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>

                        <tr>
                            <td>Dell Laptop</td>
                            <td>9</td>
                            <td>902</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>

                        <tr>
                            <td>Apple Watch</td>
                            <td>5</td>
                            <td>502</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>

                        <tr>
                            <td>Addidas Shoes</td>
                            <td>3</td>
                            <td>305</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>

                        <tr>
                            <td>Star Refrigerator</td>
                            <td>6</td>
                            <td>607</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>

                        <tr>
                            <td>Dell Laptop</td>
                            <td>3</td>
                            <td>308</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>

                        <tr>
                            <td>Apple Watch</td>
                            <td>6</td>
                            <td>605</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr>

                        <tr>
                            <td>Addidas Shoes</td>
                            <td>4</td>
                            <td>405</td>
                            <td><span className="status">Mở rộng</span></td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    )
}

export default Page2