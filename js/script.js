const pokemon = 'ditto';

function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}

const specificationsWeight = document.querySelector('#specifications-weight');

window.onload = function () {

  fetchName();

  const poundsWeight = parseInt(specificationsWeight.textContent);
  console.log({ poundsWeight });
  const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
  console.log({ kgWeight });
  specificationsWeight.textContent = `${kgWeight}kg`;
}

async function fetchName() {
  // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  const h1 = document.querySelector('h1');
  h1.textContent = data.name;
  const span = document.createElement('span');
  // span.textContent = `#${data.game_indices[0].game_index}`;
  span.textContent = '#' + data.game_indices[0].game_index;
  h1.appendChild(span);
  // h1.innerHTML = `${data.name} <span>#${data.game_indices[0].game_index}</span>`;
}
