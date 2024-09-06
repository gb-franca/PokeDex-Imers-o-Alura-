const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const pokemonDescription = document.querySelector('.description-text');
const pokemonTypes = document.querySelector('.pokemon-types');
const movesList = document.querySelector('.moves-list');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const maxPokemon = 649;

// Mapeamento de cores por tipo
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

// Função para buscar as informações do Pokémon
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// Função para buscar a descrição do Pokémon
const fetchPokemonDescription = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// Função para buscar os movimentos do Pokémon
const fetchPokemonMoves = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data.moves;
  }
}

// Função para renderizar o Pokémon e mostrar suas informações
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonDescription.innerHTML = '';
  pokemonTypes.innerHTML = '';
  movesList.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  
  if (data) {
    const descriptionData = await fetchPokemonDescription(pokemon);
    const movesData = await fetchPokemonMoves(pokemon);
    
    // Mostrar imagem e dados do Pokémon
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `#${data.id}`;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    
    // Exibir tipos do Pokémon com cores correspondentes
    data.types.forEach(typeInfo => {
      const typeElement = document.createElement('span');
      const typeName = typeInfo.type.name;
      typeElement.innerHTML = typeName;
      typeElement.style.backgroundColor = typeColors[typeName]; // Aplica a cor do tipo
      typeElement.classList.add('pokemon-type');
      pokemonTypes.appendChild(typeElement);
    });

    // Exibir a descrição (em inglês)
    const flavorText = descriptionData.flavor_text_entries.find(entry => entry.language.name === 'en');
    if (flavorText) {
      pokemonDescription.innerHTML = flavorText.flavor_text;
    } else {
      pokemonDescription.innerHTML = 'Description not available.';
    }

    // Exibir os quatro principais movimentos
    const topMoves = movesData.slice(0, 4); // Obtém os quatro primeiros movimentos
    topMoves.forEach(move => {
      const moveElement = document.createElement('li');
      moveElement.innerHTML = move.move.name;
      movesList.appendChild(moveElement);
    });
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonDescription.innerHTML = '';
    pokemonTypes.innerHTML = '';
    movesList.innerHTML = '';
  }
}

// Eventos para o formulário e os botões
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  }
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  if (searchPokemon < maxPokemon) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
