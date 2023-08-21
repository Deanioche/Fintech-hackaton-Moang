'use client'
import useJoinContext from "@/Context/Join/store";
import { useRouter } from "next/navigation";

export default function JoinForm3() {

  const { user, setUser, formNum, setFormNum } = useJoinContext();
  const router = useRouter();

  const addJoinInfo3 = async (e) => {
    e.preventDefault();
    setUser({
      ...user,
      myCode: e.target.myCode.value,
      yourCode: e.target.yourCode.value,
    })
    console.log(user);
    await handleJoin();
  };

  const member = {
    nickname: user.nickname,
    password: user.password,
    monthCost: user.avgcostpermonth,
    monthDateCnt: user.avgnumpermonth,
    coupleStartDate: user.coupleStartDate
  };


  const handleJoin = async (e) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member),
    }
    try {
      const resp = await fetch(`127.0.0.1:3000/api/users`, options);
      if (!resp.ok) {
        throw new Error("Bad response", {
          cause: { resp }
        })
      }
      const members = await resp.json();
      setFormNum(1);
      alert("회원가입을 축하합니다.")
      router.push("/home")
    } catch (e) {
      setFormNum(3);
      alert("회원가입에 실패하였습니다. 정보를 확인하세요");
      router.refresh();
    }
  }
  return (
    <>
      <div className="joinConnectDiv">
        <form onSubmit={addJoinInfo3}>
          <div className="joinMyConnect">
            <label className="joinMyConnectLabel" htmlFor="myCode">내 커플연결 코드</label><br />
            <input className="joinMyConnectInput" type="text" id="myCode" name="myCode" defaultValue="12345678" /><br></br>
            <label className="joinMyConnectLabel2" htmlFor="myCode">24시간 내에 연결하지 못하면 초기화 됩니다.</label><br />
            <button className="joinMyConnectBtn">공유</button><br />
          </div>

          <div className="joinYourConnect">
            <label className="joinYourConnectLabel" htmlFor="yourCode">상대방 커플연결 코드</label><br />
            <input className="joinYourConnectInput" type="text" id="yourCode" name="yourCode" defaultValue=""
              placeholder="상대방 코드를 입력해주세요." autoComplete='off' />
            <br />
          </div>

          <div className="joinBtnDiv">
            <button className="joinBtn" type="submit">다음</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .joinConnectDiv {
          background-color : white;
          margin-top : 40%;
          margin-bottom : 30px;
        }
        
        .joinMyConnect {
          text-align: center;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        
        .joinMyConnectLabel {
          color : #C998DC;
          font-weight: bold;
          margin-bottom: 15px;
          font-size: large;
        }
        
        .joinMyConnectInput {
          border-radius: 5px;
          text-align: center;
          font-weight: bolder;
          font-size: larger;
          width: 70%;
          border-color: #C998DC;
          color: #909090;
        }
        
        .joinMyConnectBtn {
          background-color : #C998DC;
          border-radius: 5px;
          border-color: white;
          color: white;
          margin-top: 10px;  
          font-size: large;
        
        
        }
        
        .joinMyConnectLabel2 {
          font-size: small;
          color: #909090;
        
        }
        
        .joinYourConnect {
          text-align: center;
          margin-top: 35px;
          margin-bottom: 5px;
        }
        
        .joinYourConnectLabel {
          color : #C998DC;
          font-weight: bold;
          margin-bottom: 15px;
          font-size: large;
        
        
        }
        
        .joinYourConnectInput {
          border-radius: 5px;
          text-align: center;
          font-weight: bolder;
          font-size: larger;
          width: 70%;
          border-color: #C998DC;
          color: #909090;
          margin-bottom: 10rem;
        
        }
        /* bottom 공유 */
        .joinBtnDiv {
          text-align: center;
          width: 100%;
        }
        
        .joinBtn {
          background-color: #C998DC;
          color: white;
          border-color: white;
          border-radius: 5px;
          width: 70%;
          min-height: 35px;
          margin-top: 15px;
        }
      `}</style>
    </>
  )
}