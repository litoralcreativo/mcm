// mejor performance con números elevados
const mcm_var = (numbers) => {
  // se factoriza cada numero y se lo guarda en un array
  let facArr = [];
  numbers.forEach((element) => {
    facArr.push(factor(element));
  });

  // se busca el numero de ocurrencias para cada factorizacion
  let occurArr = [];
  facArr.forEach((element) => {
    occurArr.push(occurency(element));
  });

  // se agrupan las mayores ocurrencias de cada factorizacion en un array
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

  // paso opcional, donde se organizan de menor a mayor
  factorOcc.sort((a, b) => (a.fac > b.fac ? 1 : b.fac > a.fac ? -1 : 0));

  // valor por defecto
  let result = 1;

  // se multiplica por cada fator en su maximo exponente
  factorOcc.forEach((element) => {
    result *= Math.pow(element.fac, element.occ);
  });

  return result;
};
// mejor performance con números elevados
const mcd_var = (numbers) => {
  // se factoriza cada numero y se lo guarda en un array
  let facArr = [];
  numbers.forEach((element) => {
    facArr.push(factor(element));
  });
  // console.log(facArr);

  // se toma el numero de ocurrencias de cada factor para cada numero
  let occurArr = [];
  facArr.forEach((element) => {
    occurArr.push(occurency(element));
  });
  // console.log(occurArr);

  // se agrupan todos los factores y ocurrencias en un único array
  let factorOcc = [];
  for (let i = 0; i < occurArr.length; i++) {
    for (let j = 0; j < occurArr[i][0].length; j++) {
      const fac = occurArr[i][0][j];
      const ocu = occurArr[i][1][j];
      const obj = { fac: fac, occ: ocu };
      factorOcc.push(obj);
    }
  }
  factorOcc.sort((a, b) => (a.fac > b.fac ? 1 : b.fac > a.fac ? -1 : 0));
  // console.log(factorOcc);

  // se filtran los factores para obtener cuales son divisores comunes
  const commons = occurency_var(factorOcc, numbers.length);
  // console.log(commons);

  // se filtra el array que contiene todos los factores
  // y sus ocurrencias en función de los divisores comúnes
  let midRes = [];
  for (let i = 0; i < factorOcc.length; i++) {
    // solo si el valor es un divisor comun
    if (commons.includes(factorOcc[i].fac)) {
      const fac = factorOcc[i].fac;
      const ocu = factorOcc[i].occ;
      if (midRes.find((x) => x.fac == fac) == undefined) {
        const obj = { fac: fac, occ: ocu };
        midRes.push(obj);
      }
      // se coteja si el divisor iterado actual es menor al último añadido y se remplaza
      // para asi tomar solo los justos y necesarios..
      if (midRes.find((x) => x.fac == fac).occ > ocu) {
        const indexToPop = midRes.indexOf(midRes.find((x) => x.fac == fac));
        midRes.splice(indexToPop, 1);
        const newObj = { fac: fac, occ: ocu };
        midRes.push(newObj);
      }
    }
  }
  // paso opciona, ordenado de mayor a menor
  midRes.sort((a, b) => (a.fac > b.fac ? 1 : b.fac > a.fac ? -1 : 0));

  let result = 1;

  // se obtiene el resultado con los factores finales y sus ocurrencias
  midRes.forEach((element) => {
    result *= Math.pow(element.fac, element.occ);
  });
  return result;
};

const mcm = (numbers) => {
  const max = Math.max.apply(null, numbers);
  let fac = 1;
  let found = false;
  while (!found) {
    let match = 0;
    const mul = fac * max;
    numbers.forEach((element) => {
      if (mul % element == 0) match++;
    });
    match == numbers.length ? (found = true) : fac++;
  }
  return fac * max;
};

const mcd = (numbers) => {
  const min = Math.min.apply(null, numbers);
  let div = min;
  let found = false;
  while (!found) {
    let match = 0;
    numbers.forEach((element) => {
      if (element % div == 0) match++;
    });
    match == numbers.length ? (found = true) : div--;
    if (div == 1) break;
  }
  return div;
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

// funcion para determinar la ocurrencia dentro de un array
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

const occurency_var = (arrOfObj, nums) => {
  let arr = [];
  arrOfObj.forEach((element) => {
    arr.push(element.fac);
  });
  let ocurr = occurency(arr);
  let result = [];
  for (let i = 0; i < ocurr[1].length; i++) {
    if (ocurr[1][i] == nums) result.push(ocurr[0][i]);
  }
  return result;
};
