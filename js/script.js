function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}

const specificationsWeight = document.querySelector('#specifications-weight');

window.onload = function () {

  
  const poundsWeight = parseInt(specificationsWeight.textContent);
  console.log({ poundsWeight });
  const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
  console.log({ kgWeight });
  specificationsWeight.textContent = `${kgWeight}kg`;
}

