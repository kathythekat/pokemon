const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
const pokemonLimit = '?limit=1118';

let allPokemon;

async function getAllPokemon() {
  if (!allPokemon) {
    const allPokemonResponse = await axios.get(`${BASE_URL}/${pokemonLimit}`, {params: {limit: 1118}})
    allPokemon = allPokemonResponse.data.results;
  }
  return allPokemon;
}

async function getPokemonData() {
  $('#card-container').empty();

  const pokemon = await getAllPokemon()

  //get array of random pokemon names
  let pokemonNames = [];
  for (let i = 0; i < 3; i++) {
    let randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)].name
    pokemonNames.push(randomPokemon);
  }
  //get array of species
  const speciesArr = await Promise.all(pokemonNames.map(name => axios.get(`${BASE_URL}/${name}`)))

  //an array with data about species' flavor_text: (speciesData[i].data.flavor_text_entries)
  const speciesData = await Promise.all(speciesArr.map(species => axios.get(species.data.species.url)));
  
  //array with all flavor text entries of the 3 random pokemon species
  const flavorText = speciesData.map(species => species.data.flavor_text_entries);

  //array of english flavor text
  const flavorEntries = flavorText.map(text => {
    return text.filter(entry => entry.language.name === 'en');
  })
  
  pokemonNames.forEach((name, index) => {
    const pokemon = {
      name,
      fact: flavorEntries[index][index].flavor_text,
      image: speciesArr[index].data.sprites.front_default,
    };
    
    generatePokemonCard(pokemon);
  })

}

function generatePokemonCard({name, fact, image}) {
  let $pokemonCard = $(`
  <div class="card" style="width: 18rem;">
    <img src="${image}" class="pokemon-image">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${fact}</p>
    </div>
  </div>
  `)
  $('#card-container').append($pokemonCard)
}

$('.generate-pokemon').on('click', getPokemonData)
  


