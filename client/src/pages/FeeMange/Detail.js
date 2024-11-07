import "./style.css"

function Detail(){
  return (
    <>
      <div class="details__fee">
                <div class="recentCt">
                    <div class="cardHeader">
                        <h2>Chi tiết các khoản phí cho Hộ gia đình: Nguyễn Văn A</h2>
                        <a href="page1_fee.html" class="btn">Quay lại</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>Loại phí</td>
                                <td>Số tiền</td>
                                <td>Ngày thu</td>
                                <td>Trạng thái</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Phí dịch vụ</td>
                                <td>500,000 VNĐ</td>
                                <td>01/11/2024</td>
                                <td><span class="status-paid">Đã thanh toán</span></td>
                            </tr>
                            <tr>
                                <td>Phí quản lý</td>
                                <td>200,000 VNĐ</td>
                                <td>01/11/2024</td>
                                <td><span class="status-paid">Đã thanh toán</span></td>
                            </tr>
                            <tr>
                                <td>Phí gửi xe máy</td>
                                <td>70,000 VNĐ</td>
                                <td>01/11/2024</td>
                                <td><span class="status-unpaid">Chưa thanh toán</span></td>
                            </tr>
                            <tr>
                                <td>Phí gửi ô tô</td>
                                <td>1,200,000 VNĐ</td>
                                <td>01/11/2024</td>
                                <td><span class="status-paid">Đã thanh toán</span></td>
                            </tr>
                            <tr>
                                <td>Tiền điện</td>
                                <td>300,000 VNĐ</td>
                                <td>01/11/2024</td>
                                <td><span class="status-unpaid">Chưa thanh toán</span></td>
                            </tr>
                            <tr>
                                <td>Tiền nước</td>
                                <td>150,000 VNĐ</td>
                                <td>01/11/2024</td>
                                <td><span class="status-unpaid">Chưa thanh toán</span></td>
                            </tr>
                            <tr>
                                <td>Internet</td>
                                <td>200,000 VNĐ</td>
                                <td>01/11/2024</td>
                                <td><span class="status-paid">Đã thanh toán</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </>
  )
}
export default Detail