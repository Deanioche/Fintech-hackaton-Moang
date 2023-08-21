"use client"
import React, { useEffect, useState } from 'react';
import BankNameData from '@/../../Bankname.json';
import { useGlobalContext } from '@/app/Context/store';

const Account = () => {
  const userAccount = {
    ac1: '110-464-123456',
    ac2: '3333-12-3456789',
    ac3: '454123-45-67',
    ac4: '373-12-3456-79',
    ac5: '112-2569-8459-58',
  };

  const customButton = {
    backgroundColor: '#C998DC',
    width: '250px',
    padding: '12px 24px',
    borderRadius: '20px',
    marginTop: '5px',
    border: 'none',
    color: 'white'
  };

  const button1 = {
    backgroundColor: '#C998DC',
    marginLeft: '10px',
    borderRadius: '6px',
    border: 'none',
    color: 'white',
    padding: '2px',
    width: '65px',
    height: '30px',
    marginLeft: '50px'
  };

  const button2 = {
    backgroundColor: '#C998DC',
    marginLeft: '20px',
    borderRadius: '6px',
    border: 'none',
    color: 'white',
    padding: '2px',
    width: '70px',
    height: '30px',
    marginLeft: '50px'
  };

  const button3 = {
    backgroundColor: '#C998DC',
    marginLeft: '10px',
    borderRadius: '6px',
    border: 'none',
    color: 'white',
    padding: '2px',
    width: '65px',
    height: '30px',
    marginLeft: '40px'
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',

    zIndex: 1000,
    minWidth: '300px',
    width: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
  };

  const modalButtonStyle = {
    backgroundColor: '#C998DC',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    padding: '8px 20px',
    cursor: 'pointer',
  };

  const [banks, setBanks] = useState([]);
  const handleApi = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    try {
      const resp = await fetch(`/api/bank`, options);
      if (!resp.ok) {
        throw new Error("Bad response", {
          cause: { resp }
        })
      }
      const results = await resp.json();
      setBanks(results)
      setBankNameData(results)

    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    handleApi()
    
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);
  // 그냥 은행데이터 있다고 가정하고 가져오기.
  // List
  const [bankNameData, setBankNameData] = useState([])
  const { selectedBankName, setSelectedBankName} = useGlobalContext()
  const [connetBankName, setConnetBankName] = useState(false)
  // 사용 X
  const [selectBankOption, setSelectBankOpiton] = useState({})

  const selectBank = (idx) => {

    // 기존 bank에서 빠지고 select로 가는거야.
    // 1. 하나 가져와서 -> 2. bank네임에서 빼고 -> 3. selected에 넣는다.
    const selectedbank = bankNameData.filter(item => item.id === idx)[0]
    setSelectedBankName(selectedbank)

    const updatebank = banks.filter(item => item.id !== idx)
    setBankNameData(prev => [...updatebank])
    setIsModalOpen(true)
  }

  const handleSelectSubmit = (event) => {
    event.preventDefault();
    setSelectBankOpiton(event.target.value)
  };

  const handleConnectBankName = () => {
    setConnetBankName(true)
  }



  return (
    <div  >
      <h1 style={{ backgroundColor: 'rgba(203, 161, 220, 0.57)', padding: '10px', color: 'white' }}>계좌 연결</h1>
      <h3 style={{ color: '#C998DC', padding: '9px' }}>연결 계좌</h3>

      <div style={{ display: 'flex', alignItems: 'center' }}>

        {/*
        <label htmlFor="accountSelect" style={{ marginRight: '10px' }}>계좌 선택</label>
         <select id="accountSelect" value={selectBankOption} onChange={handleSelectSubmit}>
          <option value="">계좌 선택</option>
          {selectedBankName.map((bank, index) => (
            <option key={index} value={bank.accountNum}>{bank.name}</option>
          ))}
        </select> */}
      </div>

      {(Object.keys(selectedBankName).length !== 0) && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`/${selectedBankName.src}`} alt="" style={{ width: '20px', height: '22px', marginLeft: '10px' }} />
          <p style={{ marginLeft: '10px', padding: '7px' }}>{selectedBankName.name}<br /> {selectedBankName.accountNum}</p>
          <button type='submit' style={button1}> 상세보기 </button>
        </div>
      </div>}

      <div >
        <h3 style={{ color: '#C998DC', padding: '9px' }}> 연결 추가</h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {connetBankName && bankNameData.map((bank, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <img src={`/${bank.src}`} alt="" style={{ width: '20px', height: '17px', marginLeft: '10px' }} />
              <p style={{ marginLeft: '10px', padding: '7px' }}>{bank.name} <br /> {bank.accountNum}</p>
              <button type='submit' style={button2} onClick={() => selectBank(bank.id)}> 선택하기 </button>
            </div>
          ))}

        </div>
      </div>
      <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button style={customButton} onClick={handleConnectBankName}> ➕ 계좌 연결 </button>
      </div>
      {isModalOpen && (
        <div style={modalStyle}>
          <h3>새로운 계좌가 연결되었습니다 !</h3>
          <img src='/mog.png' alt='' style={{ maxWidth: '100%' }} />
          <p style={{ color: '#C998DC', marginBottom: '8px' }}>이제 돈을 많이 '모앙'주세요 !</p>
          <button style={modalButtonStyle} onClick={() =>
            setIsModalOpen(false)
          }>닫기</button>
        </div>
      )}
    </div>
  );
};

export default Account;
