'use client'
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(props) {
  const router = useRouter();
  const params = useParams();

  const handleLogintemp = (e) => {
    e.preventDefault();
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const nickname = e.target.nickname.value;
    const password = e.target.password.value;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, password })
    }
    try {
      const resp = await fetch(`http://127.0.0.1:3000/api/login`, options);
      if (!resp.ok) {
        throw new Error("Bad response", {
          cause: { resp }
        });
      }
      router.push("/home")

    } catch (e) {
      alert("로그인 실패하였습니다. 정보를 확인하세요");
      router.refresh();
    }
  }
  return (
    <>
      <div className="loginbody">
        <div className="loginImage"><a href="/home"><img src="/login/whiteHeartLogo.png" alt="#" /></a></div>
        <div className="loginImage"><img src="/login/profileLogo.png" alt="#" /></div>
        <form className="loginForm" onSubmit={handleLogin}>
          <input className="loginIdPassword" type="text" name="nickname" placeholder="아이디" autoComplete='off' />
          <input className="loginIdPassword" type="password" name="password" placeholder="비밀번호" autoComplete='off' />
          <button className="loginBtn" type="submit">로그인</button>
        </form>

        <div>
          <button className="loginBottomBtn">아이디찾기</button>
          <button className="loginBottomBtn">비밀번호 찾기</button>
          <button className="loginBottomBtn" onClick={(e) => {
            e.preventDefault();
            router.push("/join")
          }}>회원가입</button>
        </div>
      </div>
      <style jsx>{`
        .loginbody {
          background-color: #C998DC;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          
        }
        
        .loginImage {
          margin-bottom: 40px;
        }
        
        .loginIdPassword {
          width: 243px; 
          height: 35px; 
          background: white; 
          border-radius: 5px;
          margin-top: 3px;
          text-align: center;
          border-style: none;
        
        }
        
        .loginBtn {
          display: flex;
          width: 243px; 
          height: 35px; 
          background: #A742CF; 
          border-radius: 5px;
          margin-top: 3px;
          color: white;
          justify-content: center;
          align-items: center;
          border-style: none; 
        }
        
        .loginForm {
          width: 243px; 
        }
        .loginBottomBtn {
          background-color: #C998DC;
          color: white;
          font-size: 14px;
          border-style: none;
          padding: 0.5rem;
        }
      `}</style>
    </>
  )
}