import React, { useRef } from 'react';
import '../styles/SelectPeriodBtn.css';

function SelectBtn(props) {
  const months = [
    { month: 'January', digit: '01' },
    { month: 'February', digit: '02' },
    { month: 'March', digit: '03' },
    { month: 'April', digit: '04' },
    { month: 'May', digit: '05' },
    { month: 'June', digit: '06' },
    { month: 'July', digit: '07' },
    { month: 'August', digit: '08' },
    { month: 'September', digit: '09' },
    { month: 'October', digit: '10' },
    { month: 'November', digit: '11' },
    { month: 'December', digit: '12' },
  ];

  const years = ['2019', '2020'];

  const monthValue = useRef(props.month);
  const yearValue = useRef(props.year);

  const handleSubmit = evt => {
    evt.preventDefault();

    props.setMonth(monthValue.current.value);
    props.setYear(yearValue.current.value);
  };

  return (
    <form className="content__form" onSubmit={handleSubmit}>
      <select className="form__select" name={'month'} ref={monthValue} defaultValue={props.month}>
        {months.map(obj => (
          <option className="form__option" value={obj.digit} key={obj.digit}>
            {obj.month}
          </option>
        ))}
      </select>
      <select className="form__select" name={'year'} ref={yearValue} defaultValue={props.year}>
        {years.map(year => (
          <option className="form__option" value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      <input className="form__button" type="submit" value="Submit" />
    </form>
  );
}

export default SelectBtn;
