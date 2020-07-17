import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Footer from './Footer';
import SelectPeriodBtn from './SelectPeriodBtn';
import SelectCategoryBtn from './SelectCategoryBtn';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Board.css';

function Board() {
  const currentDate = new Date();
  const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const currentYear = currentDate.getFullYear().toString();
  const [dataByCategories, setDataByCategories] = useState([]);
  const [dataByMonthsTotal, setDataByMonthsTotal] = useState([]);
  const [dataByMonthsCategory, setDataByMonthsCategory] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const colors = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#f1c5c5',
    '#faf0af',
    '#e5edb7',
    '#654062',
    '#ff9c71',
    '#fbd46d',
    '#a6dcef',
    '#e36387',
    '#c7b198',
    '#596e79',
    '#bac964',
    '#438a5e',
    '#436f8a',
    '#5c2a9d',
    '#bc658d',
  ];

  useEffect(() => {
    fetch(`/api/expenses/${month}/${year}`)
      .then(res => res.json())
      .then(data => {
        setDataByCategories(data);
      });
    return () => {};
  }, [month, year]);

  useEffect(() => {
    fetch('/api/expenses')
      .then(res => res.json())
      .then(data => {
        setDataByMonthsTotal(data);
      });
    return () => {};
  }, []);

  return (
    <>
      <BrowserRouter>
        <header className="app__header">
          <Link className="header__link" to="/">
            One Month
          </Link>
          <Link className="header__link" to="/timeline">
            Timeline
          </Link>
          <div>
            <h1 className="header__title">
              Know Your Expenses <FontAwesomeIcon icon={faSearchDollar} />
            </h1>
          </div>
        </header>
        <section className="app__content">
          <Switch>
            <Route exact path="/">
              <section className="board">
                <SelectPeriodBtn month={month} year={year} setMonth={setMonth} setYear={setYear} />
                <div className="board__charts">
                  <div>
                    <h1 className="board__charts__header board__charts__header--right-padding">Expenses by month, %</h1>
                    <PieChart className="board__charts__pie-chart" data={dataByCategories} colors={colors} />
                  </div>
                  <div>
                    <h1 className="board__charts__header board__charts__header--padding-bottom">
                      Expenses by month, NOK
                    </h1>
                    <BarChart className="board__charts__bar-chart" data={dataByCategories} colors={colors} />
                  </div>
                </div>
              </section>
            </Route>
            <Route exact path="/timeline">
              <section className="board">
                <div className="board__charts">
                  <div>
                    <h1 className="board__charts__header board__charts__header--margin-bottom">Total expenses, NOK</h1>
                    <LineChart className="board__charts__line-chart" data={dataByMonthsTotal} />
                  </div>
                  <div>
                    <SelectCategoryBtn setDataByMonthsCategory={setDataByMonthsCategory} />
                    <h1 className="board__charts__header">Category expenses, NOK</h1>
                    <LineChart className="board__charts__line-chart" data={dataByMonthsCategory} />
                  </div>
                </div>
              </section>
            </Route>
          </Switch>
        </section>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default Board;
