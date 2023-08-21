'use client'
import { useGlobalContext, getEmptyContent } from '@/app/Context/store';
import { handleDday } from '../../Utils/calendar-utils';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Styles from './NewContent.module.css'
import MockStyles from './Components/Mock.module.css'
import { useRouter } from 'next/navigation';
import MockDate from './Components/MockDate';
import InputDate from './Components/InputDate';

const categories = ['activity', 'foodCategory', 'foodSelection'];

export default function NewContent({ params: { date } }) {
  const { daysElapsed, calendarContents, setCalendarContents } = useGlobalContext();

  const router = useRouter();
  const emptyContent = getEmptyContent(date);

  const [mockOpened, setMockOpened] = useState(false);
  const [category, setCategory] = useState('activity');
  const [content, setContent] = useState(emptyContent);
  const [selectedActs, setSelectedActs] = useState([]);
  const [cost, setCost] = useState(0);

  const year = new Date(date).getFullYear();
  if (year < 2000 || year > 3000)
    notFound();

  useEffect(() => {

    setCost(selectedActs.reduce((acc, cur) => acc + cur.cost, 0));
  }, [content, cost, selectedActs, category]);

  const getDateDiff = (date1 = new Date(), date2 = new Date()) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    const elapsed = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    return elapsed;
  }

  const handleSaveBtn = () => {
    if (mockOpened) {
      setMockOpened(false);
      return;
    }
    if (content.keyword === '') {
      alert('키워드를 입력해주세요');
      return;
    }

    fetch(`http://127.0.0.1:3000/api/calendar/add`, {
      method: 'POST',
      body: JSON.stringify(content)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setContent(emptyContent);
        router.push('/calendar');
      });
  }

  return (
    <div className={Styles.background}>
      <div className={Styles.dateKeywordInputWrapper}>
        <div className={Styles.dateInfo}>
          <div className={Styles.dateSelected}>{new Date(date).getDate()}</div>
          <div className={Styles.d_day}>{handleDday(date)}</div>
        </div>
        <div className={Styles.keywordInputWrapper}>
          <input
            type='text'
            className={Styles.keywordInput}
            onChange={(e) => setContent({ ...content, keyword: e.target.value })}
            value={content.keyword}
            placeholder='데이트 키워드'
          />
          <div className={Styles.daysElapsed}>{getDateDiff(daysElapsed, new Date())}</div>
        </div>
      </div>

      {
        mockOpened ? (
          <MockDate data={[mockOpened, setMockOpened, content, setContent, category, setCategory, selectedActs, setSelectedActs, cost, setCost]} />
        ) : (
          <InputDate data={[getDateDiff, mockOpened, setMockOpened, content, setContent]} />
        )
      }
      <button
        className={`${Styles.addButton} ${mockOpened ? MockStyles.mockAddButton : ''}`}
        onClick={handleSaveBtn}
      >+</button>
      <img
        src='/assets/images/chevron-left.svg'
        alt='back'
        onClick={() => setCategory(categories[categories.indexOf(category) - 1])}
        className={`${MockStyles.backButton} `}
        style={{ display: mockOpened && categories.indexOf(category) > 0 ? 'block' : 'none' }}
      />
    </div>
  )
}