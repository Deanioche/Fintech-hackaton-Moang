'use client'

import AccountCalendar from "@/Containers/account/AccountCalendar"
import AccountDetail from "@/Containers/account/AccountDetail";
import useAccountContext from "@/Context/account/store"
import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";

export default function Account(props) {
  const { date, setDate,
    datingCostList, setDatingCostList,
    datingCostObject, setDatingCostObject,
    transactions, setTransactions } = useAccountContext();
  const [totalCost, setTotalCost] = useState(0);
  const [todayCost, setTodayCost] = useState(0);
  const [todayList, setTodayList] = useState([]);
  // 데이트를 기준으로 거래내역을 가져오고
  // 거래내역 중 +출금과 -입급 을 계산해서
  // 하루지출과 이번달 총 지출을 계산한다.
  const handleApi = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    try {
      const resp = await fetch(`http://127.0.0.1:3000/api/account`, options);
      if (!resp.ok) {
        throw new Error("Bad response", {
          cause: { resp }
        })
      }
      const results = await resp.json();
      setTransactions(results);

      const transaction = results;
      let totalCost = 0;
      let todayCost = 0;
      const todayList = [];
      for (let i = 0; i < transaction.length; i++) {
        const trans = transaction[i];
        totalCost += trans.cost;
        if (new Date(trans.date).getDate() === new Date(date).getDate()) {
          todayCost += trans.cost;
          todayList.push(trans);
        }
      }
      setTotalCost(totalCost)
      setTodayCost(todayCost)
      setTodayList(todayList)

    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    handleApi()
  }, [date])


  return (
    <div className="AccountMogBody">
      <AccountCalendar />
      <div className="AccountCostPayDiv">
        <div className="AccountCostTotal">
          <p className="AccountCostDescription">하루 지출</p>
          <h1>{todayCost}</h1>
        </div>
        <div className="AccountCostDetail">
          <p className="AccountCostDescription">이번달 총지출</p>
          <h2>{totalCost}</h2>
          <p className="AccountCostDescription">하루 적정지출</p>
          <h2>30000</h2>
        </div>
      </div>
      <div>
        <div className="AccountMogImgDiv">
          <img src="/account/mog1.png" alt="" />
          <div className="AccountMogImgDecriptionCircle">
            <div className="AccountMogImgDecription">오늘의 데이트 비용을 기록하세요</div>
          </div>
        </div>
      </div>
      <div className="AccountMogDetailDivDescription">
        <p>상세내역</p>
        <p>편집</p>
      </div>
      <hr />
      <div className="AccountMogDetailDiv">
        <div className="AccountMogContentDiv">

          <AccountDetail results={todayList} />

          {!todayList && <div className="AccountMogNotContent"><br />
            <h2>공유된 내역이 없습니다.</h2>
          </div>
          }
        </div>
        <div>
          <button className="AccountDateCostShareBtn">
            <Link style={{ textDecorationLine: 'none', color: 'white' }} href="/account/share">데이트비용 공유</Link></button>
        </div>
      </div>
      <style jsx>{`
    .AccountMogBody {
    }
    .AccountHorizontalScrollDiv {
      display: flex;
      max-width: 420px;
      color: black;
       /* 넘쳐나는 내용 무조건 숨김 */
       overflow-x:hidden;
       overflow: overlay;
    }
    
    .AccountHorizontalScrollDivContent {
      display: flex;
    }
    
    .AccountDayContent {
      width: 60px
    }
    
    .AccountDayMonth {
      font-size:14px;
      color: #ABA9A9;
      margin-bottom: 0;
    }
    
    .AccountDayDay {
      font-size:24px;
      margin-top: 0;
    
    }
    
    
    .AccountCostPayDiv {
      display: flex;
      justify-content: space-between;
      margin: 1rem;
    }
    
    .AccountCostTotal {
      color : #C998DC;
    }
    
    .NumOfAccountCostTotal {
      margin-left: 15px;
    }
    
    .AccountCostDescription {
      color: #ABA9A9;
    }
    
    .AccountMogImgDiv {
      display: flex;
      justify-content: space-between;
    }
    
    .AccountMogImgDecriptionCircle {
      border-radius: 8px;
      border: solid 1px;
      border-color: #ABA9A9;
      font-size:14px;
      font-weight: bolder;
      text-align: center;
      line-height: 60px;
      width: 100%;
      margin-top: 1rem;
      margin-bottom: 1rem;
      margin-left: 1rem;
      margin-right: 1rem;
    
    }
    
    .AccountMogDetailDivDescription {
      display: flex;
      justify-content: space-between;
      font-size:14px;
      font-weight: bolder;
      max-height: 30px;
      border: 0;
      background-color: transparent;
    }
    
    .AccountMogDetailDiv {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .AccountMogContentDiv {
      min-height: 200px;
      max-height: 300px;
      width: 100%;
      overflow: overlay;
    }
    
    
    .AccountMogNotContent {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ABA9A9;
    }
    .AccountDateCostShareBtn {
      background-color: #C998DC;
      color: white;
      border-color: white;
      border-radius: 50px;
      font-size: 20px;
      font-weight: bold;
      padding: 20px;
    }`}</style>
    </div>


  )
}
