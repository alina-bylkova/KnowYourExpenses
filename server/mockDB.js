let data = [
  {
    date: '29.07.2020',
    description: 'Varekj¯p Coop Mega Holmensgt. 7 Oslo Dato 29.07.kl. 20.45',
    credit: '349,46',
    debit: '',
  },
  {
    date: '30.07.2020',
    description: 'Varekj¯p Gr¯nlandtorg Fr Smalgangen 2 Oslo Dato 30.07.kl. 15.48',
    credit: '490,00',
    debit: '',
  },
  {
    date: '30.07.2020',
    description: 'Visa  100021  Espresso House App- No',
    credit: '100,00',
    debit: '',
  },
  {
    date: '31.07.2020',
    description: 'Visa  100121  Espresso House App- No',
    credit: '1000,00',
    debit: '',
  },
  {
    date: '01.07.2020',
    description: 'Giro  237 Utleiemegleren Lysaker AS Avtalegiro',
    credit: '15.000,00',
    debit: '',
  },
  {
    date: '01.07.2020',
    description: 'Varekj¯p Paradis Gelater Lille Strand Oslo Dato 01.06 kl. 17.58',
    credit: '98,00',
    debit: '',
  },
  {
    date: '01.07.2020',
    description: 'Visa  100221  Backstube Frogner',
    credit: '37,00',
    debit: '',
  },
  {
    date: '01.07.2020',
    description: 'Visa  100321  Backstube Frogner',
    credit: '18,00',
    debit: '',
  },
  {
    date: '02.07.2020',
    description: 'Varekj¯p Rema Vika Parkveien 64 Oslo Dato 02.06 kl. 19.07',
    credit: '96,76',
    debit: '',
  },
  {
    date: '19.07.2020',
    description: 'Varekj¯p Kiwi 373 Solli Solligata 1 Oslo Dato 19.06 kl. 21.21',
    credit: '118,79',
    debit: '',
  },
  {
    date: '20.07.2020',
    description: 'Visa  100121  Ruter AS',
    credit: '37,00',
    debit: '',
  },
  {
    date: '21.07.2020',
    description: 'Varekj¯p Joker Oslo Dato 21.06 kl. 15.35',
    credit: '58,80',
    debit: '',
  },
  {
    date: '22.07.2020',
    description: 'Giro  239 Fortum Tellier AS AvtalegiroElectricity Grid',
    credit: '589,28',
    debit: '',
  },
  {
    date: '24.07.2020',
    description: 'Visa  100021  Backstube Frogner',
    credit: '448,00',
    debit: '',
  },
];

const categories = [
  {
    category: 'groceries',
    keywords: ['kiwi', 'rema', 'joker', 'coop', 'gr¯nlandtorg', 'real frukt og g gr¯nland'],
  },
  {
    category: 'leisure',
    keywords: [
      'vinmonopolet',
      'espresso house',
      'paradis gelater',
      'backstube',
      "pepper'n",
      'gohan',
      'tatiana glazova',
      'diana faye-schj¯ll',
    ],
  },
  {
    category: 'rent',
    keywords: ['utleiemegleren'],
  },
  {
    category: 'transport',
    keywords: ['ruter', 'lim:ride cost'],
  },
  {
    category: 'internet',
    keywords: ['get avtalegiroget'],
  },
  {
    category: 'electricity',
    keywords: ['avtalegiroelectricity'],
  },
  {
    category: 'appliances',
    keywords: ['glassmag', 'proshop.no'],
  },
];

const getData = () => data;
const getCategories = () => categories;
const updateData = newData => {
  data = newData;
};

module.exports = { getData, getCategories, updateData };
