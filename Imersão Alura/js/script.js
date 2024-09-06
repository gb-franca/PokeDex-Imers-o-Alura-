const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const maxPokemon = 649; // Limite máximo de Pokémons (até o número 649)

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Submeter o formulário normalmente
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// Submeter com a tecla Enter
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  }
});

// Botão anterior (Prev)
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Não pode ser menor que 1
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// Botão próximo (Next)
buttonNext.addEventListener('click', () => {
  if (searchPokemon < maxPokemon) { // Não pode ultrapassar o limite de 649
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});

// Renderiza o primeiro Pokémon (inicialmente 1)
renderPokemon(searchPokemon);
