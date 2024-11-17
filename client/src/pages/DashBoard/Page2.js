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
                                <td>SĐT</td>
                                <td>Tầng</td>
                                <td>Số căn hộ</td>
                                <td>Loại số</td>
                                <td>Chi tiết</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Star Refrigerator</td>
                                <td>0235487329</td>
                                <td>8</td>
                                <td>808</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>

                            <tr>
                                <td>Dell Laptop</td>
                                <td>0397257929</td>
                                <td>9</td>
                                <td>902</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>0923682042</td>
                                <td>5</td>
                                <td>502</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>0293529723</td>
                                <td>3</td>
                                <td>305</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>

                            <tr>
                                <td>Star Refrigerator</td>
                                <td>0782657820</td>
                                <td>6</td>
                                <td>607</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>

                            <tr>
                                <td>Dell Laptop</td>
                                <td>0972689253</td>
                                <td>3</td>
                                <td>308</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>

                            <tr>
                                <td>Apple Watch</td>
                                <td>0887927512</td>
                                <td>6</td>
                                <td>605</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>

                            <tr>
                                <td>Addidas Shoes</td>
                                <td>0296378952</td>
                                <td>4</td>
                                <td>405</td>
                                <td>Thường trú</td>
                                <td><span class="status">Mở rộng</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  )
}

export default Page2