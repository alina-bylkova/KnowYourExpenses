const parseCsvToJson = data => {
  const arrayOfData = data.split(/\r?\n/);
  let arrayOfObj = [];

  for (let i = 1; i < arrayOfData.length; i += 1) {
    const parsedArray = arrayOfData[i].split(';');
    const obj = {
      date: parsedArray[0].replace(/"/g, ''),
      description: parsedArray[1].replace(/"/g, ''),
      credit: parsedArray[3].replace(/"/g, ''),
      debit: parsedArray[4].replace(/"/g, ''),
    };
    arrayOfObj = [...arrayOfObj, obj];
  }
  return arrayOfObj;
};

module.exports = { parseCsvToJson };
