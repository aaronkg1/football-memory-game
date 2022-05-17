export const shuffle = (oldArray) => {
  const arraylength = oldArray.length;
  const arrayCopy = [...oldArray];

  let newArray = [];
  for (let i = 0; i < arraylength; i++) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    newArray = [...newArray, arrayCopy.splice(randomIndex, 1)[0]];
  }
  return newArray;
};
