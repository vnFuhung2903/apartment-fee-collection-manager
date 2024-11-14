import "./stats.scss"
import profile from "./images/profile-1.jpg"
import { useState, useEffect } from 'react'

function Chart(){
  const [data, setData] = useState([
    {
      "id" : 1,
      "name": "Michael William",
      "total": 100,
      "payed": 100
    }, 
    {
      "id" : 2,
      "name": "Alexander Jones",
      "total": 123,
      "payed": 60
    },
    {
      "id" : 3,
      "name": "Ava Taylor",
      "total": 150,
      "payed": 43
    }
  ]);
  const [payFull, setPayFull] = useState(2);
  const [payment, setPayment] = useState(100);
  const [total, setTotal] = useState(300);
  const r = 30;

  // useEffect(() => {
  //   fetch("http://localhost:3002/customer_costs")
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data);
  //       setPayFull(data.reduce((payFull, item) => (
  //         payFull = (item.payed === item.total) ? payFull + 1 : payFull 
  //       ), 0));
  //       setPayment(data.reduce((sum, item) => (
  //         sum += item.payed 
  //       ), 0))
  //       setTotal(data.reduce((sum, item) => (
  //         sum += item.total
  //       ), 0))
  //     })
  // }, [])

  return (
    <>
    {/* Insights Part */}
      <div className="container__header">
        <main>
          <h2>Biểu đồ</h2>
          <div className="insights">
            <div div className="pay-full">
              <span className="material-symbols-sharp">trending_up</span>
              <div className="middle">
                <div className="left">
                  <h3>Số hộ đã nộp đủ</h3>
                  <h1>{payFull}/{data.length}</h1>
                </div>
                <div className="progress">
                    <svg>
                        <circle  r={r} cy="40" cx="40" strokeDasharray={2 * Math.PI * r} strokeDashoffset={2 * Math.PI * r * (1 - payFull/(data.length))} transform={`rotate(-90, 40, 40)`}></circle>
                    </svg>
                    <div className="number"><p>{Math.floor(payFull/(data.length) * 100)}%</p></div>
                </div>
               </div>
               <small>24h gần nhất</small>
            </div>
           
            <div className="payment">
              <span className="material-symbols-sharp">local_mall</span>
                <div className="middle">
                  <div className="left">
                    <h3>Tổng thu</h3>
                    <h1>${payment} / ${total}</h1>
                  </div>
                   <div className="progress">
                       <svg>
                       <circle  r={r} cy="40" cx="40" strokeDasharray={2 * Math.PI * r} strokeDashoffset={2 * Math.PI * r * (1 - payment/total)} transform={`rotate(-90, 40, 40)`}></circle>
                       </svg>
                       <div className="number"><p>{Math.floor(payment/total * 100)}%</p></div>
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
    <div className="right">

  <div className="recent_updates">
     <h2>Cập nhật gần đây</h2>
   <div className="updates">
      <div className="update">
         <div className="profile-photo">
            <img src={profile} alt=""/>
         </div>
        <div className="message">
           <p><b>Babar</b> Đã đóng $38 tiền nhà</p>
        </div>
      </div>
      <div className="update">
        <div className="profile-photo">
        <img src={profile} alt=""/>
        </div>
       <div className="message">
          <p><b>Ali</b> Đã đóng $39 phí thu xe </p>
       </div>
     </div>
     <div className="update">
      <div className="profile-photo">
         <img src={profile} alt=""/>
      </div>
     <div className="message">
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