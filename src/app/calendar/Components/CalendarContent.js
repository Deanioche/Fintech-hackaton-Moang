import { useState } from "react";
import css from "styled-jsx/css"

const styles = css`
  .calendar-content {
    display: flex;
    flex-direction: column;
  }

  .cost {
    font-size: 14px;
    color: #F6ABE5;
  }

  .content {
    font-size: 14px;
  }

  .spText {
    color: #198cff !important;
  }

  .blackText {
    color: #000 !important;
  }
`;

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CalendarContent({ cost, keyword, date }) {
  const [totalCost, setCost] = useState(0);
  fetch(`127.0.0.1:3000/api/account`)
    .then(res => res.json())
    .then(data => {
      const perDate = data.filter(x => +(x.date.split("-")[2]) === new Date(date).getDate());
      const totalCost = perDate.reduce((acc, cur) => acc + cur.cost, 0);
      setCost(totalCost);
    });

  return (
    <div className="calendar-content">
      {totalCost !== 0 && <div className="cost">{addCommas(totalCost)}</div>}
      <div className={totalCost === 0 ? 'spText' : 'blackText'}>{keyword}</div>
      <style jsx>{styles}</style>
    </div>
  )
}