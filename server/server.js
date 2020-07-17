const express = require('express');
const { getData, getCategories, updateData } = require('./mockDB');
const { parseCsvToJson } = require('./parse');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
      req.text += chunk;
    });
    req.on('end', next);
  } else {
    next();
  }
});

//Helper functions

const months = [
  { month: 'Jan', digit: '01' },
  { month: 'Feb', digit: '02' },
  { month: 'Mar', digit: '03' },
  { month: 'Apr', digit: '04' },
  { month: 'May', digit: '05' },
  { month: 'Jun', digit: '06' },
  { month: 'Jul', digit: '07' },
  { month: 'Aug', digit: '08' },
  { month: 'Sep', digit: '09' },
  { month: 'Oct', digit: '10' },
  { month: 'Nov', digit: '11' },
  { month: 'Dec', digit: '12' },
];

const parseMonth = monthDigit => {
  return months.find(obj => obj.digit === monthDigit).month;
};

const findKeyword = (recordDescription, object) => {
  const foundKeyword = object.keywords.find(keyword => {
    const globalRegex = RegExp(keyword, 'gi');
    return globalRegex.test(recordDescription);
  });
  return foundKeyword !== undefined;
};

const findCategory = recordDescription => {
  const foundCategory = getCategories().find(object => findKeyword(recordDescription, object));
  if (foundCategory !== undefined) return foundCategory.category;
  return 'other';
};

const addCategoriesToRecords = () => {
  const updatedRecords = getData().map(record => {
    record.category = findCategory(record.description);
    return record;
  });
  return updatedRecords;
};

const filterRecordsByDate = (month, year) => {
  return addCategoriesToRecords().filter(record => {
    return record.date.includes(`.${month}.${year}`);
  });
};

const searchCategory = (category, expensesGroups) => {
  return expensesGroups.find(group => group.category === category);
};

const parseTextToNumber = text => {
  const number = parseFloat(text.replace('.', ''));
  return isNaN(number) ? 0 : number;
};

const getExpensesForPeriod = (month, year) => {
  const filteredData = filterRecordsByDate(month, year);
  let expensesGroups = [];
  filteredData.forEach(record => {
    const group = searchCategory(record.category, expensesGroups);
    group !== undefined
      ? (group.amount = Math.round((group.amount + parseTextToNumber(record.credit)) * 100) / 100)
      : (expensesGroups = [
          ...expensesGroups,
          {
            category: record.category,
            amount: parseTextToNumber(record.credit),
          },
        ]);
  });

  return expensesGroups;
};

const extractDate = date => {
  const monthYear = /.(\d{2}).(\d{4})/;
  const result = date.match(monthYear);
  return { month: result[1], year: result[2] };
};

const searchDate = (month, year, expensesGroups) => {
  return expensesGroups.find(group => group.month === month && group.year === year);
};

const getExpensesForCategory = category => {
  let expensesGroups = [];
  addCategoriesToRecords().forEach(record => {
    if (category !== undefined && record.category !== category) {
      return;
    }
    const { month, year } = extractDate(record.date);
    const monthName = parseMonth(month);
    const group = searchDate(month, year, expensesGroups);
    if (group !== undefined) {
      group.amount = Math.round((group.amount + parseTextToNumber(record.credit)) * 100) / 100;
    } else {
      expensesGroups = [
        ...expensesGroups,
        {
          monthName,
          month,
          year,
          amount: parseTextToNumber(record.credit),
        },
      ];
    }
  });

  return expensesGroups;
};

const sortLabels = data => {
  data.sort((a, b) => {
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return 0;
  });
};

app.get('/api/expenses/:month/:year', (req, res) => {
  const month = req.params.month;
  const year = req.params.year;
  const data = getExpensesForPeriod(month, year);
  res.set('Accept', 'application/json');
  res.status(200).json(data);
});

app.get('/api/expenses', (req, res) => {
  const data = getExpensesForCategory();
  sortLabels(data);
  res.set('Accept', 'application/json');
  res.status(200).json(data);
});

app.get('/api/expenses/:category', (req, res) => {
  const category = req.params.category;
  const data = getExpensesForCategory(category);
  sortLabels(data);
  res.set('Accept', 'application/json');
  res.status(200).json(data);
});

app.get('/api/categories', (req, res) => {
  const data = getCategories().map(obj => obj.category);
  res.set('Accept', 'application/json');
  res.status(200).json(data);
});

app.post('/api/expenses', (req, res) => {
  const data = req.text;
  const json = parseCsvToJson(data);
  updateData(json);
  res.setHeader('location', '/api/expenses');
  res.set('Accept', 'text/plain');
  res.status(201).send();
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).send({
    message: error.message || 'Internal Server Error',
  });
});

module.exports.app = app;

if (!module.parent) {
  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });
}
