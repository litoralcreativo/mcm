const getMCM = (numbers) => {
  // se factoriza cada numero y se lo guarda en un array
  let facArr = [];
  numbers.forEach((element) => {
    facArr.push(factor(element));
  });

  let ocur = [];
  facArr.forEach((element) => {
    ocur.push(occurrency(element));
  });

  let result = 1;
  let arrOfOcur = [];

  for (let i = 0; i < ocur.length; i++) {
    for (let j = 0; j < ocur[i][0].length; j++) {
      const item = ocur[i][0][j];
      const times = ocur[i][1][j];
      if (arrOfOcur.find((x) => x.fac == item) == undefined) {
        const obj = { fac: item, ocu: times };
        arrOfOcur.push(obj);
      }

      if (arrOfOcur.find((x) => x.fac == item).ocu < times) {
        const indexInArr = arrOfOcur.indexOf(
          arrOfOcur.find((x) => x.fac == item)
        );
        arrOfOcur.splice(indexInArr, 1);
        const newObj = { fac: item, ocu: times };
        arrOfOcur.push(newObj);
      }
    }
  }

  arrOfOcur.forEach((element) => {
    result *= Math.pow(element.fac, element.ocu);
  });

  console.log(arrOfOcur);

  // ocur.forEach((element) => {
  //   for (let i = 0; i < element[0].length; i++) {
  //     arrOfOcur.push(element[0][i] * element[1][i]);
  //   }
  // });

  // console.log(ocur);
  // console.log(arrOfOcur);

  // let index = 0;
  // let result = 1;
  // while (index < facArr[0].length) {
  //   let matches = 0;
  //   let min = facArr[0][index];

  //   // se busca a coincidencias de el valor minimo de
  //   // una de las factorizaciones respecto de las otras
  //   facArr.forEach((arr) => {
  //     arr.includes(min) ? matches++ : false;
  //   });

  //   // si todas las array contienen al factor se sale del while-loop
  //   // y se asigna el valor del factor a la variable result
  //   if (matches === facArr.length) {
  //     result = facArr[0][index];
  //     break;
  //     //    Si no se encuentra, se pasa al sigiente indice/factor (index++)
  //   } else index++;
  // }
  return result;
};

const occurrency = (arr) => {
  let a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
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
