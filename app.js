const getMCM = (numbers) => {
  // se factoriza cada numero y se lo guarda en un array
  let facArr = [];
  numbers.forEach((element) => {
    facArr.push(factor(element));
  });

  let occurArr = [];
  facArr.forEach((element) => {
    occurArr.push(occurency(element));
  });

  let factorOcc = [];
  for (let i = 0; i < occurArr.length; i++) {
    for (let j = 0; j < occurArr[i][0].length; j++) {
      const fac = occurArr[i][0][j];
      const ocu = occurArr[i][1][j];

      if (factorOcc.find((x) => x.fac == fac) == undefined) {
        const obj = { fac: fac, occ: ocu };
        factorOcc.push(obj);
      }

      if (factorOcc.find((x) => x.fac == fac).occ < ocu) {
        const indexToPop = factorOcc.indexOf(
          factorOcc.find((x) => x.fac == fac)
        );
        factorOcc.splice(indexToPop, 1);
        const newObj = { fac: fac, occ: ocu };
        factorOcc.push(newObj);
      }
    }
  }

  factorOcc.sort((a, b) => (a.fac > b.fac ? 1 : b.fac > a.fac ? -1 : 0));

  console.log(factorOcc);

  let result = 1;

  factorOcc.forEach((element) => {
    result *= Math.pow(element.fac, element.occ);
  });

  // let index = 0;
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

const occurency = (arr) => {
  var a = [],
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
