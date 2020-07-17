import React, { useRef, useEffect, useState } from 'react';
import '../styles/App.css';

function SelectCategoryBtn(props) {
  const [category, setCategory] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);

  const categoryRef = useRef(null);
  const handleSubmit = evt => {
    evt.preventDefault();

    setCategory(categoryRef.current.value);
  };

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategoriesArray(data);
        setCategory(data[0]);
      });
    return () => {};
  }, []);

  useEffect(() => {
    fetch(`/api/expenses/${category}`)
      .then(res => res.json())
      .then(data => {
        props.setDataByMonthsCategory(data);
      });
    return () => {};
  }, [category]);

  return (
    <form className="content__form--category" onSubmit={handleSubmit}>
      <select className="form__select" name={'category'} ref={categoryRef}>
        {categoriesArray.map(obj => (
          <option className="form__option" value={obj} key={obj}>
            {obj}
          </option>
        ))}
      </select>
      <input className="form__button" type="submit" value="Submit" />
    </form>
  );
}

export default SelectCategoryBtn;
