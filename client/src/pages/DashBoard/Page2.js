import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData, fetchHouseholds } from "../../actions/page1";

function Page2(){
    const dispatch = useDispatch();
    const households = useSelector((state) => state.page1Reducer.households);
  
    useEffect(() => {
      dispatch(fetchHouseholds());
      dispatch(fetchDashboardData());
    }, [dispatch]);

    return (
    <>
        <div  className="details page2">
            <div className="recentCt page2">
                <div className="cardHeader">
                    <h2>Quản lí dân cư</h2>
                    <Link to="/register_resident" className="btn">Thêm hộ dân</Link>
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
                    { households.map(household => 
                        <tr>
                            <td> { household.head } </td>
                            <td> { household.contact } </td>
                            <td> { household.floors } </td>
                            <td> { household.numbers } </td>
                            <td> { household.status } </td>
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