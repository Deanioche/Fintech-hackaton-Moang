'use client'
import { useEffect, useState } from 'react'
import Calendar from "react-calendar";
import Styles from './Calendar.module.css'
import "./MoangCalendar.css";
import CalendarContent from './Components/CalendarContent';
import { useRouter } from 'next/navigation';
import { formatDate, handleDday, week } from './Utils/calendar-utils';
import { useGlobalContext } from '../Context/store';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

export default function CalendarPage() {
  const router = useRouter();
  const { setNavIdx } = useGlobalContext();

  const [calendarContents, setCalendarContents] = useState([]);

  const [today, setToday] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(today);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/calendar`)
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].startDate = new Date(data[i].startDate);
          data[i].endDate = new Date(data[i].endDate);
        }
        setCalendarContents(data);
      });
  }, []);

  useEffect(() => {
    setNavIdx(1);
    setDetail(calendarContents.find(x => {
      const detailImg = document.querySelector(`.${Styles.detailImage}`);
      if (detailImg) {
        detailImg.style.backgroundImage = `url(${x.image.base64})`;
      }
      return (new Date(x.startDate).toDateString() === dateSelected.toDateString());
    }));
  }, [today, dateSelected, calendarContents, detail])

  const handleTileContent = ({ date, view }) => {
    if (view !== 'month')
      return null;

    const content = calendarContents.find(x => {
      return formatDate(x.startDate) === formatDate(date);
    });
    if (!content)
      return null;
    return (
      <CalendarContent
        cost={content.cost}
        keyword={content.keyword}
        date={date}
      />
    );
  }

  const getShortDate = (date) => {
    return `${date.getMonth() + 1}.${date.getDate()} ${week[date.getDay()]}`;
  }

  const getDetailPeriod = (startDate, endDate) => {
    if (startDate.toDateString() === endDate.toDateString())
      return getShortDate(startDate);
    return `${getShortDate(startDate)} - ${getShortDate(endDate)}`;
  }

  return (
    <div className={Styles.calendarWrapper}>
      <Calendar
        tileContent={handleTileContent}
        next2Label={<SearchIcon />}
        prev2Label={<SettingsIcon />}
        formatMonthYear={(locale, date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        formatMonth={(locale, date) => `${date.getMonth() + 1}월`}
        formatShortWeekday={(locale, date) => week[date.getDay()]}
        onClickDay={setDateSelected}
        className={Styles.calendar}
        value={dateSelected}
        locale='en-US'
      />

      <div className={Styles.details}>
        <div className={Styles.dateInfo}>
          <div className={Styles.dateSelected}>{new Date(dateSelected).getDate()}</div>
          <div className={Styles.d_day}>{handleDday(dateSelected)}</div>
        </div>
        <button
          className={Styles.addButton}
          onClick={() => router.push(`/calendar/new/${formatDate(dateSelected)}`)}>+
        </button>

        {detail &&
          (
            <div className={Styles.detailContent}>
              <div className={Styles.detailTitle}>{detail.keyword}</div>
              <div className={Styles.detailDate}>
                {getDetailPeriod(detail.startDate, detail.endDate)}
              </div>
                <img width={'100%'} src={detail.image.base64} alt={detail.image.name} />
            </div>
          )
        }
      </div>
    </div>
  )
}