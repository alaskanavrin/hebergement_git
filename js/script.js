const pokemon = 'pikachu';


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

 
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  const reponse = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon);
  const dataa = await reponse.json();
  const idEvol = await fetch(dataa.evolution_chain.url);
  const dataaa = await idEvol.json();
  
  console.log(dataaa);

  recursive(dataaa.chain);

  const h1 = document.querySelector('h1');
  h1.textContent = data.name;
  const span = document.createElement('span');
  span.textContent = '#' + data.game_indices[0].game_index;
  h1.appendChild(span);

  const height = document.querySelector('#height');
  height.textContent = data.height;

  const weight = document.querySelector('#specifications-weight');
  weight.textContent = Math.round(poundsToKg(data.weight)) + 'kg';

  const categorie = document.querySelector('#categorie');
  categorie.textContent = dataa.genera[3].genus;

   const typesUrl = [];

  const type = data.types[0].type.name;

  for (const iterator of data.types) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add(iterator.type.name);
    btn.textContent = iterator.type.name;
    li.appendChild(btn);
    document.querySelector(".type-list").appendChild(li);
    faiblesse(iterator.type.name);
  }

  // for (const iteratorr of dataaa.chain) {
  //   const span = document.createElement ('span');
  //   const small = document.createElement ('small');
  //   const fire = document.createElement ('.fire');
  //   span.classList.add(iteratorr.species.name);
  //   span.textContent = iteratorr.species.name;
  // }

  const image = document.querySelector(".w-100");
  image.src = data.sprites.other["official-artwork"].front_shiny;

  const description = document.querySelector('p');
  description.textContent = dataa.flavor_text_entries[0].flavor_text;

  const ability = document.querySelector('#ability');
  ability.textContent = data.abilities[0].ability.name;

  const gender = dataa.gender_rate;

  if (gender < 0) {
    document.querySelector(".bi-gender-female").style.display = "none";
    document.querySelector(".bi-gender-male").style.display = "none";
  }
  else if (gender == 0) {
    document.querySelector(".bi-gender-female").style.display = "none";
    document.querySelector(".bi-gender-male").style.display = "inline";
  }
  else if (gender == 8) {
    document.querySelector(".bi-gender-female").style.display = "inline";
    document.querySelector(".bi-gender-male").style.display = "none";
  }
  else {
    document.querySelector(".bi-gender-female").style.display = "inline";
    document.querySelector(".bi-gender-male").style.display = "inline";
  }
  
  for (let i = 0; i < data.stats.length; i++) {

    const classnumber = Math.round((data.stats[i].base_stat*15)/141.5)
    const classname = data.stats[i].stat.name+ "-" + classnumber
    document.querySelector(".stats").classList.add(classname)

  }
}

async function faiblesse(hh) {
  const response = await fetch('https://pokeapi.co/api/v2/type/' + hh);
  const data = await response.json();

  for (const iterator of data.damage_relations.double_damage_from) {
    const ul = document.querySelectorAll('.type-list')[1];
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add(iterator.name);
    btn.textContent =  iterator.name;
    ul.appendChild(li);
    li.appendChild(btn);
  }
}

async function recursive(pokemons) {
  // const pokemone = pokemons.species.name;
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemons.species.name);
  const data = await response.json();
  //const responsee = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemons.specie)s.url;
  //const dataa = await responsee.json();

  const evolution = document.querySelector ('#evolution > div');
  const pokemon = document.createElement ('div');
  const span = document.createElement ('span');
  const small = document.createElement ('small');
 // const button = document.createElement ('button');
  const imagee = document.createElement ('img');
  pokemon.classList.add('pokemon');
  span.classList.add(pokemons.species.name);
  span.textContent = pokemons.species.name;
  imagee.src = data.sprites.other["official-artwork"].front_shiny;
  small.textContent = '#' + data.game_indices[0].game_index;
  //button.classList.add('button');
  //button.textContent= dataa.types[0].type.name;
  //fire.classList.add('fire');
  //fire.textContent = data.types.type.name;
  evolution.appendChild(pokemon);
  pokemon.appendChild(imagee);
  pokemon.appendChild(span);
  span.appendChild(small);
  //pokemon.appendChild(fire);

  if (pokemons.evolves_to.length > 0) {
    const div = document.createElement ('div');
    evolution.appendChild(div);
recursive(pokemons.evolves_to[0])
  }
}