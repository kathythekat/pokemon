const  API_URL = 'http://numbersapi.com'

// let favNum = alert('What is your fav number?')

async function favNumFact(num) {
    const resp = await axios.get(`${API_URL}/${num}`)
    return resp.data 
}

async function appendNumFacts() {
        
    for (let i = 0; i < 4; i++) {
        let fact = await favNumFact(7)
        await $('.numFacts').append(`<li>${fact}</li>`)
    }
}

appendNumFacts()