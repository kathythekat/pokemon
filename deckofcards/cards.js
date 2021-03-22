let BASE_URL = "https://deckofcardsapi.com/api/deck";

let deckId;

async function drawCard() {
  //show 2 card suits and values
  let deck = await axios.get(`${BASE_URL}/new/draw`);
  let deckId = deck.data.deck_id;
  
  let card1 = deck.data.cards[0]
  let response = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
  let card2 = response.data.cards[0];

  console.log(card1.suit, card1.value)

  console.log(card2.suit, card2.value)
}


async function setUp() {
  let cardBtn = document.getElementById('card-button');
  let response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
  deckId = response.data.deck_id;

  cardBtn.addEventListener('click', handleClick);

}

async function handleClick() {
  try {
    let response = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
    if (response.data.cards && response.data.cards[0] && response.data.cards[0].image) {
      let cardImageUrl = response.data.cards[0].image;
      showCard(cardImageUrl);
    } else {
      debugger;
    }
  } catch(e) {
    debugger;
      if (response.data.cards === 500) {
        alert('No more cards!')
      }
    }
}

function showCard(url) {
  $('#card-div').append(`<img class='card-img' src=${url}>`);
}


setUp()
