const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
const pokemonLimit = '?limit=1118'
// part1 
async function getAllPokemon() {
  const response = await axios.get(`${BASE_URL}/${pokemonLimit}`)

  return response.data.results 
}

//part2
async function get3RandomPokemon() {
  const response = await axios.get(`${BASE_URL}/${pokemonLimit}`)
  let allPokemon = response.data.results
  
  let pokemonCaught = []
  for (let i = 0; i < 3; i++) {
    //handle possible repeat. while-loop?
    let pokemon = allPokemon[Math.floor(Math.random() * allPokemon.length)]
    
    pokemonCaught.push(pokemon)

  }
  return pokemonCaught
}


//part 3
async function getPokemonSpecies() {
  const response = await axios.get(`${BASE_URL}/${pokemonLimit}`)
  let allPokemon = response.data.results

  /* Promise-all to request each pokemon simultaneously */  

  for (let i = 0; i < 3; i++) {
    // get random pokemon name
    let pokemon = allPokemon[Math.floor(Math.random() * allPokemon.length)].name

    // get pokemons data response
    const pokemonResponse = await axios.get(`${BASE_URL}/${pokemon}`)
    
    //get url to get pokemons species data
    let pokemonSpeciesURL = pokemonResponse.data.species.url
    
    const speciesResponse = await axios.get(pokemonSpeciesURL)

    let textEntries = speciesResponse.data.flavor_text_entries 

    for (let text of textEntries) {
      if (text.language.name === 'en') {
        console.log(pokemon, text.flavor_text)
        break;
      }
    }
  }
}

//part4 
async function collectPokemonCards() {
  const response = await axios.get(`${BASE_URL}/${pokemonLimit}`)
  let allPokemon = response.data.results

  
  for (let i = 0; i < 3; i++) {
    let pokemon = {}
    
    // get random pokemon name and assign to object
    pokemon.name = allPokemon[Math.floor(Math.random() * allPokemon.length)].name
    
    
    // get pokemons data response
    const pokemonResponse = await axios.get(`${BASE_URL}/${pokemon.name}`)
    pokemon.sprite = pokemonResponse.data.sprites.front_default
    // get sprite url
    
    
    //get url to get pokemons species data
    let pokemonSpeciesURL = pokemonResponse.data.species.url
    const speciesResponse = await axios.get(pokemonSpeciesURL)
    
    let textEntries = speciesResponse.data.flavor_text_entries 
    
    for (let text of textEntries) {
      if (text.language.name === 'en') {
        pokemon.text = text.flavor_text
        break;
      }
    }
    generateAppendPokemonCard(pokemon)
  }
}

function generateAppendPokemonCard({name, sprite, text}) {
  let $pokemonCard = $('<div class="pokemon-card"></div>')

  $pokemonCard.append(`<h3>${name}</h3>`)  
  $pokemonCard.append(`<img src="${sprite}">`)  
  $pokemonCard.append(`<p>${text}</p>`)  

  $('.container').append($pokemonCard)
}

$('.generate-pokemon').on('click', collectPokemonCards)
