import { Link } from "react-router-dom"

function Page2(){
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
                                <td>Tầng</td>
                                <td>Số căn hộ</td>
                                <td>Chi tiết</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  )
}

export default Page2