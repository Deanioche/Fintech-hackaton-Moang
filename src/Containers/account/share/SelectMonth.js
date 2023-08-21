import { useEffect, useState } from "react";
import SelectDay from "./SelectDay";

const SelectMonth = ({ results }) => {

  const [listByDate, setListByDate] = useState([]);

  useEffect(() => {
      for (let i = 1; i < 32; i++) {
        const perDate = results.filter(x => +(x.date.split("-")[2]) === i);
        if (perDate.length === 0)
          continue;
        // const totalCost = perDate.reduce((acc, cur) => acc + cur.cost, 0);
        listByDate.push({ date: `2023-08-${i < 10 ? `0${i}` : i}`, list: perDate });
      }
      setListByDate([...listByDate]);
    // });
  }, []);

  return (
    <>
      {listByDate && listByDate.map((item, index) => (
        <div key={`${item.date}-${index}`}>
          <div className="AccountBankDetailsBottomDay">
            {item.date}
          </div >
          <hr />
          <SelectDay key={`selectedDay-${item.date}`} item={item} />
        </div>
      ))}

      {!results &&
        <div className="AccountMogNotContent"><br />
          <h2>계정 연결이 필요합니다.</h2>
        </div>}
      <style jsx > {`
        .AccountBankDetailsBottomDay {
          color: #A9A9A9;
        }
        .AccountMogNotContent {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ABA9A9;
        }
      `}</style>
    </>
  )
}

export default SelectMonth;