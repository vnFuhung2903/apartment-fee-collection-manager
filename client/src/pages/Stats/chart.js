import "./stats.scss"
import profile from "./images/profile-1.jpg"
import { useState, useEffect } from 'react'

function Chart(){
  const [data, setData] = useState([]);
  const [payFull, setPayFull] = useState(0);
  const [payment, setPayment] = useState(0);
  const [total, setTotal] = useState(0);
  const r = 30;

  useEffect(() => {
    fetch("http://localhost:3002/customer_costs")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setPayFull(data.reduce((payFull, item) => (
          payFull = (item.payed === item.total) ? payFull + 1 : payFull 
        ), 0));
        setPayment(data.reduce((sum, item) => (
          sum += item.payed 
        ), 0))
        setTotal(data.reduce((sum, item) => (
          sum += item.total
        ), 0))
      })
  }, [])

  return (
    <>
    {/* Insights Part */}
      <div class="container__header">
        <main>
          <h1>Biểu đồ</h1>
          <div class="insights">
            <div div class="pay-full">
              <span class="material-symbols-sharp">trending_up</span>
              <div class="middle">
                <div class="left">
                  <h3>Số hộ đã nộp đủ</h3>
                  <h1>{payFull}/{data.length}</h1>
                </div>
                <div class="progress">
                    <svg>
                        <circle  r={r} cy="40" cx="40" stroke-dasharray={2 * Math.PI * r} stroke-dashoffset={2 * Math.PI * r * (1 - payFull/(data.length))} transform={`rotate(-90, 40, 40)`}></circle>
                    </svg>
                    <div class="number"><p>{Math.floor(payFull/(data.length) * 100)}%</p></div>
                </div>
               </div>
               <small>24h gần nhất</small>
            </div>
           
            <div class="payment">
              <span class="material-symbols-sharp">local_mall</span>
                <div class="middle">
                  <div class="left">
                    <h3>Tổng thu</h3>
                    <h1>${payment} / ${total}</h1>
                  </div>
                   <div class="progress">
                       <svg>
                       <circle  r={r} cy="40" cx="40" stroke-dasharray={2 * Math.PI * r} stroke-dashoffset={2 * Math.PI * r * (1 - payment/total)} transform={`rotate(-90, 40, 40)`}></circle>
                       </svg>
                       <div class="number"><p>{Math.floor(payment/total * 100)}%</p></div>
                   </div>
 
                </div>
                <small>24h gần nhất</small>
             </div>
        
        </div>
      </main>
      {/* <!------------------
         end main Insights
        ------------------->

      <!----------------
        start right main 
      ----------------------> */}
    <div class="right">

  <div class="recent_updates">
     <h2>Cập nhật gần đây</h2>
   <div class="updates">
      <div class="update">
         <div class="profile-photo">
            <img src={profile} alt=""/>
         </div>
        <div class="message">
           <p><b>Babar</b> Đã đóng $38 tiền nhà</p>
        </div>
      </div>
      <div class="update">
        <div class="profile-photo">
        <img src={profile} alt=""/>
        </div>
       <div class="message">
          <p><b>Ali</b> Đã đóng $39 phí thu xe </p>
       </div>
     </div>
     <div class="update">
      <div class="profile-photo">
         <img src={profile} alt=""/>
      </div>
     <div class="message">
        <p><b>Ramzan</b> Đã đóng $40 phí thu xe</p>
     </div>
   </div>
  </div>
  </div>
</div>
   </div>
    </>
  )
}

export default Chart