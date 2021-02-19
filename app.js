const getMCM = (numbers) => {
  // se factoriza cada numero y se lo guarda en un array
  let facArr = [];
  numbers.forEach((element) => {
    facArr.push(factor(element));
  });

  let index = 0;
  let result = 1;
  while (index < facArr[0].length) {
    let matches = 0;
    let min = facArr[0][index];

    // se busca a coincidencias de el valor minimo de
    // una de las factorizaciones respecto de las otras
    facArr.forEach((arr) => {
      arr.includes(min) ? matches++ : false;
    });

    // si todas las array contienen al factor se sale del while-loop
    // y se asigna el valor del factor a la variable result
    if (matches === facArr.length) {
      result = facArr[0][index];
      break;
      //    Si no se encuentra, se pasa al sigiente indice/factor (index++)
    } else index++;
  }
  return result;
};

// funcion recursiva donde se van alojando los valores de los factores detro de un array
// la funcion devuelve un array de ints cuando el factor es igual al numero, caso contrario
// se llama a si misma pasando el (valor inicial / el factor) y (su propio array) como parametros
const factor = (number, values = []) => {
  let counter = 2;
  while (number % counter !== 0) {
    counter++;
  }
  values.push(counter);
  return counter == number ? values : factor(number / counter, values);
};
