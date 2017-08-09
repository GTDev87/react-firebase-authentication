export const objToValues = (obj) => {
  const arr =  [];
  for(let key in obj) {
    if (key) {
      const value = obj[key];
      obj[key].key = key;
      arr.push(value)
    }
  }
  return arr;
}

export const chunkifyArray = (arr, chunkSize) => {
  const groups = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
}